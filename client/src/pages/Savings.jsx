import React, { useState, useEffect } from "react";

const Savings = () => {
  const { token } = useAuth();
  const [goals, setGoals] = useState([]);
  const [form, setForm] = useState({
    goal_name: "",
    target_amount: "",
    target_date: "",
  });
  const [error, setError] = useState("");
  const [contributionAmounts, setContributionAmounts] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const fetchGoals = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/savings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setGoals(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch goals error:", err);
      setGoals([]);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/savings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to add goal");
        return;
      }

      setForm({ goal_name: "", target_amount: "", target_date: "" });
      fetchGoals();
    } catch (err) {
      console.error("Add goal error:", err);
      setError("Something went wrong. Try again.");
    }
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/savings/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchGoals();
  };

  const handleContributionChange = (id, value) => {
    setContributionAmounts({ ...contributionAmounts, [id]: value });
  };

  const addContribution = async (id) => {
    const amount = Number(contributionAmounts[id]);
    if (!amount || amount <= 0) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/savings/${id}/contribute`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount }),
        },
      );

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Failed to add contribution");
        return;
      }

      setContributionAmounts({ ...contributionAmounts, [id]: "" });
      fetchGoals();
    } catch (err) {
      console.error("Add contribution error:", err);
    }
  };

  const startEdit = (goal) => {
    setEditingId(goal.id);
    setEditForm({
      goal_name: goal.goal_name,
      target_amount: goal.target_amount,
      target_date: goal.target_date ? goal.target_date.split("T")[0] : "",
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
      const res = await fetch(`http://localhost:5000/api/savings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Failed to update goal");
        return;
      }

      setEditingId(null);
      fetchGoals();
    } catch (err) {
      console.error("Update goal error:", err);
    }
  };
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Savings Goals</h2>

      {/* Add new goal */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 border border-gray-200 rounded-md p-4 shadow-md"
      >
        <h3 className="font-semibold mb-1">New Goal</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          name="goal_name"
          placeholder="Goal name (e.g. Emergency Fund)"
          value={form.goal_name}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
          required
        />
        <input
          name="target_amount"
          type="number"
          placeholder="Target amount (KES)"
          value={form.target_amount}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
          required
        />
        <input
          name="target_date"
          type="date"
          value={form.target_date}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="p-2 bg-blue-900 text-white rounded font-bold"
        >
          Create Goal
        </button>
      </form>

      {/* Goals list */}
      <div className="flex flex-col gap-4">
        {goals.map((goal) => {
          const saved = Number(goal.saved_amount) || 0;
          const target = Number(goal.target_amount);
          const percent =
            target > 0 ? Math.min((saved / target) * 100, 100) : 0;

          return editingId === goal.id ? (
            <div
              key={goal.id}
              className="flex flex-col gap-2 p-4 border border-blue-400 rounded-md"
            >
              <input
                name="goal_name"
                value={editForm.goal_name}
                onChange={handleEditChange}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                name="target_amount"
                type="number"
                value={editForm.target_amount}
                onChange={handleEditChange}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                name="target_date"
                type="date"
                value={editForm.target_date}
                onChange={handleEditChange}
                className="p-2 border border-gray-300 rounded"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => saveEdit(goal.id)}
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
            <div
              key={goal.id}
              className="p-4 border border-gray-200 rounded-md shadow-md"
            >
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-bold text-lg">{goal.goal_name}</h3>
                <span className="flex gap-3 text-sm">
                  <button
                    onClick={() => startEdit(goal)}
                    className="text-green-700 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(goal.id)}
                    className="text-red-700 font-semibold"
                  >
                    Delete
                  </button>
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-2">
                KES {saved.toLocaleString()} of {target.toLocaleString()}
                {goal.target_date &&
                  ` — by ${new Date(goal.target_date).toLocaleDateString()}`}
              </p>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                <div
                  className="bg-green-600 h-3 rounded-full"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>

              {/* Add contribution */}
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Add contribution (KES)"
                  value={contributionAmounts[goal.id] || ""}
                  onChange={(e) =>
                    handleContributionChange(goal.id, e.target.value)
                  }
                  className="p-2 border border-gray-300 rounded flex-1"
                />
                <button
                  onClick={() => addContribution(goal.id)}
                  className="px-3 py-1 bg-green-700 text-white rounded text-sm"
                >
                  Add
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Savings;
