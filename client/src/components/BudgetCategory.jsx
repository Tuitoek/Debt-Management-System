import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";


// Suggested subcategories per category type - shown as quick-add buttons
const suggestedSubcategories = {
  Needs: [
    "Rent",
    "Groceries",
    "Utilities",
    "Transport",
    "Insurance",
    "Healthcare",
    "Debt Payments",
  ],
  Wants: [
    "Entertainment",
    "Dining Out",
    "Shopping",
    "Subscription Services",
    "Travel",
    "Hobbies",
  ],
  Savings: [
    "Emergency Fund",
    "Retirement",
    "Investments",
    "Education",
    "Big Purchases",
  ],
};

const BudgetCategory = ({ budget, onBudgetChanged }) => {
  const { token } = useAuth();
  const [subcategories, setSubcategories] = useState([]);
  const [error, setError] = useState("");
  const [customName, setCustomName] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const fetchSubcategories = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/subcategories/${budget.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      if (Array.isArray(data)) setSubcategories(data);
    } catch (err) {
      console.error("Fetch subcategories error:", err);
    }
  };

  useEffect(() => {
    fetchSubcategories();
  }, [budget]);

  const totalAllocated = subcategories.reduce(
    (sum, s) => sum + Number(s.amount),
    0,
  );
  const remaining = Number(budget.monthly_limit) - totalAllocated;

  const addSubcategory = async (name, amount) => {
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/subcategories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ budgetId: budget.id, name, amount }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to add subcategory");
        return;
      }
      fetchSubcategories();
      if (onBudgetsChanged) onBudgetsChanged();
    } catch (err) {
      console.error("Add subcategory error:", err);
      setError("Something went wrong.");
    }
  };

  // Quick-add a suggestion: defaults to whatever's left in the budget, split reasonably
  const addSuggestion = (name) => {
    if (remaining <= 0) {
      setError("No room left in this category's budget.");
      return;
    }
    addSubcategory(name, Math.min(remaining, 1)); // start small; user edits the real amount after
  };

  const addCustom = (e) => {
    e.preventDefault();
    if (!customName || !customAmount) return;
    addSubcategory(customName, Number(customAmount));
    setCustomName("");
    setCustomAmount("");
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/subcategories/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchSubcategories();
    if (onBudgetsChanged) onBudgetsChanged();
  };

  const startEdit = (sub) => {
    setEditingId(sub.id);
    setEditForm({ name: sub.name, amount: sub.amount });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEdit = async (id) => {
    setError("");
    try {
      const res = await fetch(`http://localhost:5000/api/subcategories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to update subcategory");
        return;
      }
      setEditingId(null);
      fetchSubcategories();
    } catch (err) {
      console.error("Update subcategory error:", err);
    }
  };

  // Which suggestions haven't been added yet, based on the category's base label
  const baseLabel = Object.keys(SUGGESTIONS).find((key) =>
    budget.category.toLowerCase().includes(key.toLowerCase()),
  );
  const suggestionList = baseLabel ? SUGGESTIONS[baseLabel] : [];
  const existingNames = subcategories.map((s) => s.name.toLowerCase());
  const availableSuggestions = suggestionList.filter(
    (s) => !existingNames.includes(s.toLowerCase()),
  );

  return (
    <div className=" flex flex-wrap border border-gray-200 rounded-md p-4 shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg">{budget.category}</h3>
        <span className="text-sm">
          KES {totalAllocated.toLocaleString()} /{" "}
          {Number(budget.monthly_limit).toLocaleString()} (
          {remaining >= 0 ? `${remaining.toLocaleString()} left` : "over limit"}
          )
        </span>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Suggested quick-add buttons */}
      {availableSuggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {availableSuggestions.map((s) => (
            <button
              key={s}
              onClick={() => addSuggestion(s)}
              className="px-3 py-1 text-sm bg-blue-100 border border-blue-300 rounded"
            >
              + {s}
            </button>
          ))}
        </div>
      )}

      {/* Existing subcategories */}
      <div className="flex flex-col gap-2 mb-3">
        {subcategories.map((sub) =>
          editingId === sub.id ? (
            <div key={sub.id} className="flex gap-2 items-center">
              <input
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                className="p-1 border border-gray-300 rounded flex-1"
              />
              <input
                name="amount"
                type="number"
                value={editForm.amount}
                onChange={handleEditChange}
                className="p-1 border border-gray-300 rounded w-24"
              />
              <button
                onClick={() => saveEdit(sub.id)}
                className="text-green-700 font-semibold"
              >
                Save
              </button>
              <button
                onClick={cancelEdit}
                className="text-gray-500 font-semibold"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div
              key={sub.id}
              className="flex justify-between items-center p-2 bg-gray-50 rounded"
            >
              <span>
                {sub.name} — KES {Number(sub.amount).toLocaleString()}
              </span>
              <span className="flex gap-3">
                <button
                  onClick={() => startEdit(sub)}
                  className="text-green-700 text-sm font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(sub.id)}
                  className="text-red-700 text-sm font-semibold"
                >
                  Delete
                </button>
              </span>
            </div>
          ),
        )}
      </div>

      {/* Custom subcategory form */}
      <form onSubmit={addCustom} className="flex flex-wrap justify-content space-around gap-2">
        <input
          placeholder="Custom subcategory"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          className="p-1 border border-gray-300 w-auto rounded flex-1"
        />
        <input
          type="number"
          placeholder="Amount"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          className="p-1 border border-gray-300 rounded w-auto"
        />
        <button
          type="submit"
          className="px-3 py-1 bg-blue-900 text-white rounded text-sm"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default BudgetCategory;
