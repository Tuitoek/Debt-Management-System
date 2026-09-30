import React,{ useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";


const Income = () => {
  const { token } = useAuth();
  const [incomeList, setIncomeList] = useState([]);
  const [form, setForm] = useState({
    source: "",
    amount: "",
    date_received: "",
  });
  const [error, setError] = useState(" ");

  // Fetch Income when page loads
  const fetchIncome = async () => {
    try {
      const res = await fetch("/api/income", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
     if (Array.isArray(data)) {
      setIncomeList(data);
    } else {
      console.error('Unexpected income response:', data);
      setIncomeList([]);   // fallback so .map() never crashes
    }
    } catch (error) {
      console.error("Fetch income error:", error);
    }
  };
  // Use Effect to manage fetched income
  useEffect(() => {
    fetchIncome();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/income", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      // If response is not okay, Show Error
      if (!res.ok) {
        setError(data.message || "Failed to add income");
        return;
      }

      // Clear Form to null values
      setForm({
        source: "",
        amount: "",
        date_received: "",
      });
      // Refresh list to show new entry
      fetchIncome();
    } catch (error) {
      console.error("Add income error:", err);
      setError("Something went wrong. Try again.");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/income/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchIncome(); // refresh the list
    } catch (err) {
      console.error("Delete income error:", err);
    }
  };
  return ( <div className="max-w-lg mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold mb-4">Income Recorder</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 border border-gray-200 rounded-md p-4 shadow-md mb-6">
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <input
          name="source"
          placeholder="Income Source (e.g. Salary, Freelance)"
          value={form.source}
          onChange={handleChange}
          className="p-2 border border-gray-100 rounded-sm"
          required
        />
        <input
          name="amount"
          type="number"
          placeholder="Amount (KES)"
          value={form.amount}
          onChange={handleChange}
          className="p-2 border border-gray-100 rounded-sm"
          required
        />
        <input
          name="date_received"
          type="date"
          value={form.date_received}
          onChange={handleChange}
          className="p-2 border border-gray-100 rounded-sm"
        />

        <button type="submit" className="p-2 bg-blue-900 text-white rounded font-bold">
          Add Income
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Your Income Streams</h3>
      <ul className="flex flex-col gap-2">
        {incomeList.map((entry) => (
          <li key={entry.id} className="flex justify-between items-center p-3 border border-gray-100 rounded-sm">
            <span>
              <strong>{entry.source}</strong> — KES {entry.amount}
              <br />
              <small>{new Date(entry.date_received).toLocaleDateString()}</small>
            </span>
            <button
              onClick={() => handleDelete(entry.id)}
              className="text-red-700 font-semibold"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>);
};

export default Income;
