import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import BudgetCategoryCard from "../components/BudgetCategoryCard";

const RULES = {
  Minimalist: [
    { label: "Needs", percent: 50 },
    { label: "Wants", percent: 30 },
    { label: "Savings", percent: 20 },
  ],
  Spender: [
    { label: "Needs", percent: 50 },
    { label: "Wants", percent: 40 },
    { label: "Savings", percent: 10 },
  ],
  "Tight Budget": [
    { label: "Needs", percent: 60 },
    { label: "Wants", percent: 20 },
    { label: "Savings", percent: 20 },
  ],
  Saver: [
    { label: "Needs", percent: 40 },
    { label: "Wants", percent: 20 },
    { label: "Savings", percent: 30 },
  ],
};

const Budget = () => {
  const { token } = useAuth();
  const [totalIncome, setTotalIncome] = useState(0);
  const [selectedRule, setSelectedRule] = useState("Minimalist");
  const [budgets, setBudgets] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [error, setError] = useState("");
  const [customCategory, setCustomCategory] = useState({
    category: "",
    monthly_limit: "",
  });

  const fetchIncomeTotal = async () => {
    try {
      const res = await fetch("/api/income", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        const total = data.reduce(
          (sum, entry) => sum + Number(entry.amount),
          0,
        );
        setTotalIncome(total);
      }
    } catch (err) {
      console.error("Fetch income total error:", err);
    }
  };

  const fetchBudgets = async () => {
    try {
      const res = await fetch("/api/budget", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setBudgets(data);
      }
    } catch (err) {
      console.error("Fetch budgets error:", err);
    }
  };

  useEffect(() => {
    fetchIncomeTotal();
    fetchBudgets();
  }, []);

  const handleCustomChange = (e) => {
    setCustomCategory({ ...customCategory, [e.target.name]: e.target.value });
  };

  const addCustomeCategory = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(customCategory),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to add category");
        return;
      }

      setCustomCategory({ category: "", monthly_limit: "" });
      fetchBudgets();
    } catch (error) {
      console.error("Add custom category error:", error);
      setError("Something went wrong adding the category.");
    }
  };

  const applyRule = async () => {
    setError("");
    const split = RULES[selectedRule];

    try {
      // 1. Clear out any previously applied rule's categories first
      await fetch("/api/budget/rule-categories", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      // 2. Create the new rule's categories, tagged with rule_name
      for (const item of split) {
        const monthly_limit = (totalIncome * item.percent) / 100;
        await fetch("/api/budget", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            category: item.label,
            monthly_limit,
            rule_name: selectedRule,
          }),
        });
      }
      fetchBudgets();
    } catch (err) {
      console.error("Apply rule error:", err);
      setError("Something went wrong applying the rule.");
    }
  };

  const handleDelete = async (id) => {
    await fetch(`/api/budget/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchBudgets();
  };

  const startEdit = (budget) => {
    setEditingId(budget.id);
    setEditForm({
      category: budget.category,
      monthly_limit: budget.monthly_limit,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEdit = async (id) => {
    try {
      const res = await fetch(`/api/budget/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Failed to update budget");
        return;
      }
      setEditingId(null);
      fetchBudgets();
    } catch (err) {
      console.error("Update budget error:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Budget Planner</h2>

      <p className="text-lg">
        Your total recorded income:{" "}
        <strong>KES {totalIncome.toLocaleString()}</strong>
      </p>

      {/* Rule picker */}
      <div className="border border-gray-200 rounded-md p-4 shadow-md">
        <h3 className="font-semibold mb-2">Choose a budgeting rule</h3>
        <div className="flex flex-wrap gap-3 mb-4">
          {Object.keys(RULES).map((rule) => (
            <button
              key={rule}
              onClick={() => setSelectedRule(rule)}
              className={`px-4 py-2 rounded border ${
                selectedRule === rule
                  ? "bg-blue-900 text-white"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              {rule}
            </button>
          ))}
        </div>

        {/* Live preview of the split */}
        <div className="flex flex-col gap-1 mb-4 p-5 text-gray-700 font-semibold">
          {RULES[selectedRule].map((item) => (
            <p key={item.label}>
              {item.label} ({item.percent}%): KES{" "}
              {((totalIncome * item.percent) / 100).toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </p>
          ))}
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          onClick={() => {
            if (
              window.confirm(
                "Applying a new rule will delete your previous rule's categories, subcategories, and expenses (custom categories will be kept). Continue?",
              )
            ) {
              applyRule();
            }
          }}
          className="w-full p-2 bg-green-700 text-white rounded font-bold"
        >
          Apply This Rule
        </button>
      </div>

      {/* Budget categories, each with its own subcategories nested inside */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Your Budget Categories</h3>
        {budgets.map((budget) =>
          editingId === budget.id ? (
            <div
              key={budget.id}
              className="flex flex-col gap-2 p-3 border border-blue-400 rounded-md"
            >
              <input
                name="category"
                value={editForm.category}
                onChange={handleEditChange}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                name="monthly_limit"
                type="number"
                value={editForm.monthly_limit}
                onChange={handleEditChange}
                className="p-2 border border-gray-300 rounded"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => saveEdit(budget.id)}
                  className="flex-1 bg-green-600 text-white p-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="flex-1 bg-gray-400 text-white p-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div key={budget.id} className="flex flex-col gap-2">
              <div className="flex justify-end gap-3 text-sm">
                <button
                  onClick={() => startEdit(budget)}
                  className="text-green-700 font-semibold"
                >
                  Edit Category
                </button>
                <button
                  onClick={() => handleDelete(budget.id)}
                  className="text-red-700 font-semibold"
                >
                  Delete Category
                </button>
              </div>
              <BudgetCategoryCard
                budget={budget}
                onBudgetsChanged={fetchBudgets}
              />
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default Budget;
