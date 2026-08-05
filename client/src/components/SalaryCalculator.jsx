import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faMoneyBill,
  faPlusCircle,
  faHandHoldingMedical,
  faHandHoldingHeart,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

function SalaryCalculator({ onCalculate }) {
  // 1. Initialized with boolean true instead of string "true"
  const [formData, setFormData] = useState({
    grossSalary: "",
    otherAllowances: "",  
    deductSHIF: true,
    deductHousingLevy: true,
    deductNSSF: true,
  });

  // 2. Generic change handler for inputs & checkboxes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/calculate-net-salary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Call the onCalculate prop function to send data back to App.jsx
      if (onCalculate) {
        onCalculate(data);
      }
    } catch (err) {
      console.error("Failed to connect to backend:", err);
    }
  };

  return (
    <div className="w-100 h-auto rounded-lg bg-gradient-to-r from-blue-400 to-green-600 shadow-md p-10 flex justify-content-center flex-col gap-1 m-3">
      <span className="flex flex-row items-center gap-2 mb-5">
        <FontAwesomeIcon icon={faCalculator} className="mr-2 text-2xl" />
        <h2 className="font-bold text-2xl">Salary Calculator</h2>
      </span>
      <p className="font-light text-l">Based on Kenyan PAYE system</p>

      <form className="flex flex-col gap-4 pt-2" onSubmit={handleSubmit}>
        <span>
          <FontAwesomeIcon icon={faMoneyBill} className="mr-2" />
          <label htmlFor="grossSalary">Monthly Gross Salary (KES)</label>
          <input
            className="bg-white rounded-sm w-full h-10 text-m font-light px-2"
            type="number"
            id="grossSalary"
            name="grossSalary" /* Match state key */
            required
            value={formData.grossSalary}
            onChange={handleChange} /* Fixed handler */
            placeholder=" Enter your Gross Salary"
          />
        </span>

        <span>
          <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
          <label htmlFor="otherAllowances">Other Allowance (KES)</label>
          <span className="flex flex-row items-center gap-2">
            <input
              className="bg-white rounded-sm w-full h-10 text-m font-light px-2"
              type="number"
              id="otherAllowances"
              name="otherAllowances" /* Match state key */
              value={formData.otherAllowances}
              onChange={handleChange} /* Fixed handler */
              placeholder=" Enter your Other Allowance If any"
            />
          </span>
        </span>

        <span className="flex flex-row items-center gap-2">
          <input
            type="checkbox"
            id="deductSHIF"
            name="deductSHIF" /* Match state key */
            checked={formData.deductSHIF}
            onChange={handleChange} /* Fixed handler */
          />
          <FontAwesomeIcon icon={faHandHoldingMedical} className="mr-2" />
          <label htmlFor="deductSHIF">Deduct SHIF</label>
        </span>

        <span className="flex flex-row items-center gap-2">
          <input
            type="checkbox"
            id="deductNSSF"
            name="deductNSSF" /* Match state key */
            checked={formData.deductNSSF}
            onChange={handleChange} /* Fixed handler */
          />
          <FontAwesomeIcon icon={faHandHoldingHeart} className="mr-2" />
          <label htmlFor="deductNSSF">Deduct NSSF</label>
        </span>

        <span className="flex flex-row items-center gap-2">
          <input
            type="checkbox"
            id="deductHousingLevy"
            name="deductHousingLevy" /* Match state key */
            checked={formData.deductHousingLevy}
            onChange={handleChange} /* Fixed handler */
          />
          <FontAwesomeIcon icon={faHouse} className="mr-2" />
          <label htmlFor="deductHousingLevy">Deduct Housing Levy</label>
        </span>

        <span>
          <button
            className="w-full h-10 bg-blue-700 font-semibold py-2 px-4 rounded text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            type="submit"
          >
            Calculate Net Salary
          </button>
        </span>
      </form>
    </div>
  );
}

export default SalaryCalculator;