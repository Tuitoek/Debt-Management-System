import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function Expenses() {
  const { token } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [form, setForm] = useState({ subcategory_id: "", description: "", amount: "", expense_date: "" });
  const [error, setError] = useState("");

  const fetchAllExpenses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setExpenses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch all expenses error:", err);
      setExpenses([]);
    }
  };

  const fetchAllSubcategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/subcategories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSubcategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch subcategories error:", err);
      setSubcategories([]);
    }
  };

  useEffect(() => {
    fetchAllExpenses();
    fetchAllSubcategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to add expense");
        return;
      }

      setForm({ subcategory_id: "", description: "", amount: "", expense_date: "" });
      fetchAllExpenses();
    } catch (err) {
      console.error("Add expense error:", err);
      setError("Something went wrong. Try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAllExpenses();
    } catch (err) {
      console.error("Delete expense error:", err);
    }
  };

  const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Expense Tracker</h2>

      <p className="text-lg">
        Total spent (all categories): <strong>KES {totalSpent.toLocaleString()}</strong>
      </p>

      {/* Add expense form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 border border-gray-200 rounded-md p-4 shadow-md"
      >
        <h3 className="font-semibold mb-1">Log a New Expense</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <select
          name="subcategory_id"
          value={form.subcategory_id}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Select a subcategory</option>
          {subcategories.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.budget_category} → {sub.name} (budgeted KES {Number(sub.amount).toLocaleString()})
            </option>
          ))}
        </select>

        <input
          name="description"
          placeholder="What was this for?"
          value={form.description}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          name="amount"
          type="number"
          placeholder="Amount (KES)"
          value={form.amount}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
          required
        />
        <input
          name="expense_date"
          type="date"
          value={form.expense_date}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />

        <button type="submit" className="p-2 bg-blue-900 text-white rounded font-bold">
          Add Expense
        </button>
      </form>

      {/* Expense list */}
      {expenses.length === 0 ? (
        <p className="text-gray-500">No expenses recorded yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {expenses.map((exp) => (
            <div
              key={exp.id}
              className="flex justify-between items-center p-3 border border-gray-200 rounded-md"
            >
              <span>
                <strong>{exp.description || "Expense"}</strong> — KES{" "}
                {Number(exp.amount).toLocaleString()}
                <br />
                <small className="text-gray-600">
                  {exp.budget_category} → {exp.subcategory_name} |{" "}
                  {new Date(exp.expense_date).toLocaleDateString()}
                </small>
              </span>
              <button onClick={() => handleDelete(exp.id)} className="text-red-700 font-semibold">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Expenses;