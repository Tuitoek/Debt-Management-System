import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const SUGGESTIONS = {
  Needs: ["Rent", "Groceries", "Utilities", "Transport", "Insurance"],
  Wants: ["Entertainment", "Dining Out", "Shopping", "Subscriptions"],
  Savings: ["Emergency Fund", "Investments", "Retirement", "Goals"],
};

function BudgetCategoryCard({ budget, onBudgetsChanged }) {
  const { token } = useAuth();
  const [subcategories, setSubcategories] = useState([]);
  const [error, setError] = useState("");
  const [customName, setCustomName] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Expense-related state
  const [expandedSubId, setExpandedSubId] = useState(null);
  const [expensesBySub, setExpensesBySub] = useState({});
  const [expenseForm, setExpenseForm] = useState({ description: "", amount: "", expense_date: "" });
  const [expenseError, setExpenseError] = useState("");

  const fetchSubcategories = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/subcategories/${budget.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) setSubcategories(data);
    } catch (err) {
      console.error("Fetch subcategories error:", err);
    }
  };

  useEffect(() => {
    fetchSubcategories();
  }, [budget.id]);

  const totalAllocated = subcategories.reduce((sum, s) => sum + Number(s.amount), 0);
  const remaining = Number(budget.monthly_limit) - totalAllocated;

  const addSubcategory = async (name, amount) => {
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/subcategories", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
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

  const addSuggestion = (name) => {
    if (remaining <= 0) {
      setError("No room left in this category's budget.");
      return;
    }
    addSubcategory(name, Math.min(remaining, 1));
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
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
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

  // --- Expense logic ---

  const fetchExpenses = async (subId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/expenses/${subId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setExpensesBySub((prev) => ({ ...prev, [subId]: data }));
      }
    } catch (err) {
      console.error("Fetch expenses error:", err);
    }
  };

  const toggleExpand = (subId) => {
    if (expandedSubId === subId) {
      setExpandedSubId(null);
    } else {
      setExpandedSubId(subId);
      setExpenseError("");
      if (!expensesBySub[subId]) fetchExpenses(subId);
    }
  };

  const spentFor = (subId) => {
    const list = expensesBySub[subId] || [];
    return list.reduce((sum, e) => sum + Number(e.amount), 0);
  };

  const handleExpenseChange = (e) => {
    setExpenseForm({ ...expenseForm, [e.target.name]: e.target.value });
  };

  const addExpense = async (e, subId) => {
    e.preventDefault();
    setExpenseError("");
    try {
      const res = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ subcategory_id: subId, ...expenseForm }),
      });
      const data = await res.json();
      if (!res.ok) {
        setExpenseError(data.message || "Failed to add expense");
        return;
      }
      setExpenseForm({ description: "", amount: "", expense_date: "" });
      fetchExpenses(subId);
    } catch (err) {
      console.error("Add expense error:", err);
      setExpenseError("Something went wrong.");
    }
  };

  const deleteExpense = async (expenseId, subId) => {
    await fetch(`http://localhost:5000/api/expenses/${expenseId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchExpenses(subId);
  };

  // --- Suggestions ---

  const baseLabel = Object.keys(SUGGESTIONS).find((key) =>
    budget.category.toLowerCase().includes(key.toLowerCase())
  );
  const suggestionList = baseLabel ? SUGGESTIONS[baseLabel] : [];
  const existingNames = subcategories.map((s) => s.name.toLowerCase());
  const availableSuggestions = suggestionList.filter((s) => !existingNames.includes(s.toLowerCase()));

  return (
    <div className="border border-gray-200 rounded-md p-4 shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg">{budget.category}</h3>
        <span className="text-sm">
          KES {totalAllocated.toLocaleString()} / {Number(budget.monthly_limit).toLocaleString()}
          {" "}({remaining >= 0 ? `${remaining.toLocaleString()} left` : "over limit"})
        </span>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

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
              <button onClick={() => saveEdit(sub.id)} className="text-green-700 font-semibold">
                Save
              </button>
              <button onClick={cancelEdit} className="text-gray-500 font-semibold">
                Cancel
              </button>
            </div>
          ) : (
            <div key={sub.id} className="flex flex-col bg-gray-50 rounded">
              <div className="flex justify-between items-center p-2">
                <button
                  onClick={() => toggleExpand(sub.id)}
                  className="text-left flex-1 font-medium"
                >
                  {expandedSubId === sub.id ? "▾" : "▸"} {sub.name} — Budgeted: KES{" "}
                  {Number(sub.amount).toLocaleString()}
                  {expensesBySub[sub.id] && (
                    <span className="ml-2 text-sm text-gray-600">
                      | Spent: KES {spentFor(sub.id).toLocaleString()} | Left: KES{" "}
                      {(Number(sub.amount) - spentFor(sub.id)).toLocaleString()}
                    </span>
                  )}
                </button>
                <span className="flex gap-3 ml-2">
                  <button onClick={() => startEdit(sub)} className="text-green-700 text-sm font-semibold">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(sub.id)} className="text-red-700 text-sm font-semibold">
                    Delete
                  </button>
                </span>
              </div>

              {/* Expanded expense section */}
              {expandedSubId === sub.id && (
                <div className="pl-4 pr-2 pb-3 flex flex-col gap-2">
                  {expenseError && <p style={{ color: "red" }}>{expenseError}</p>}

                  {(expensesBySub[sub.id] || []).map((exp) => (
                    <div
                      key={exp.id}
                      className="flex justify-between items-center text-sm p-1 border-b border-gray-200"
                    >
                      <span>
                        {exp.description || "Expense"} — KES {Number(exp.amount).toLocaleString()} (
                        {new Date(exp.expense_date).toLocaleDateString()})
                      </span>
                      <button
                        onClick={() => deleteExpense(exp.id, sub.id)}
                        className="text-red-600 font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  ))}

                  <form onSubmit={(e) => addExpense(e, sub.id)} className="flex gap-2 mt-1">
                    <input
                      name="description"
                      placeholder="Description"
                      value={expenseForm.description}
                      onChange={handleExpenseChange}
                      className="p-1 border border-gray-300 rounded flex-1 text-sm"
                    />
                    <input
                      name="amount"
                      type="number"
                      placeholder="KES"
                      value={expenseForm.amount}
                      onChange={handleExpenseChange}
                      className="p-1 border border-gray-300 rounded w-20 text-sm"
                      required
                    />
                    <input
                      name="expense_date"
                      type="date"
                      value={expenseForm.expense_date}
                      onChange={handleExpenseChange}
                      className="p-1 border border-gray-300 rounded text-sm"
                    />
                    <button type="submit" className="px-2 py-1 bg-blue-900 text-white rounded text-sm">
                      Add
                    </button>
                  </form>
                </div>
              )}
            </div>
          )
        )}
      </div>

      <form onSubmit={addCustom} className="flex gap-2">
        <input
          placeholder="Custom subcategory"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          className="p-1 border border-gray-300 rounded flex-1"
        />
        <input
          type="number"
          placeholder="Amount"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          className="p-1 border border-gray-300 rounded w-24"
        />
        <button type="submit" className="px-3 py-1 bg-blue-900 text-white rounded text-sm">
          Add
        </button>
      </form>
    </div>
  );
}

export default BudgetCategoryCard;