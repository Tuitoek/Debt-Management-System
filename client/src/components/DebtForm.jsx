import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const DebtForm = ({ onDebtAdded }) => {
  const { token } = useAuth();
  const [debtform, setDebtform] = useState({
    name: "",
    total_amount: "",
    installment_amount: "",
    interest_rate: "",
    due_date: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setDebtform({ ...debtform, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/debts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(debtform),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to add debt");
        return;
      }

      setDebtform({
        name: "",
        total_amount: "",
        installment_amount: "",
        interest_rate: "",
        due_date: "",
      });

      if (onDebtAdded) onDebtAdded();
    } catch (error) {
      console.error("Add debt error:", error);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="m-4 p-5 w-auto h-auto border border-gray-300 rounded shadow-md bg-white">
      <form className="flex flex-col gap-5 p-4" onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <h3 className="text-lg font-bold">Add New Debt</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter debt name"
          className="p-2 border border-gray-300 rounded"
          value={debtform.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="total_amount"
          placeholder="Enter total amount"
          className="p-2 border border-gray-300 rounded"
          value={debtform.total_amount}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="installment_amount"
          placeholder="Enter installment amount"
          className="p-2 border border-gray-300 rounded"
          value={debtform.installment_amount}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          step="0.01"
          name="interest_rate"
          placeholder="Enter interest rate (%)"
          className="p-2 border border-gray-300 rounded"
          value={debtform.interest_rate}
          onChange={handleChange}
        />
        <input
          type="date"
          name="due_date"
          className="p-2 border border-gray-300 rounded"
          value={debtform.due_date}
          onChange={handleChange}
          required
        />
        <button type="submit" className="bg-blue-800 text-white p-2 rounded">
          Add Debt
        </button>
      </form>
    </div>
  );
};

export default DebtForm;