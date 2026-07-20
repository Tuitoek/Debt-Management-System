import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faMoneyBill,
  faPlusCircle,
  faHandHoldingMedical,
  faHandHoldingHeart,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

function SalaryCalculator({
  grossSalary,
  setGrossSalary,
  otherAllowances,
  setOtherAllowances,
  deductSHIF,
  setDeductSHIF,
  deductNSSF,
  setDeductNSSF,
  deductHousingLevy,
  setDeductHousingLevy,
  onCalculate,
}) {
  const handleSubmit = (e) => {
    e.preventDefault(); // stop the browser's native form submission
    onCalculate();
  };

  return (
    <div
      className="w-100 h-auto
     rounded-lg bg-gradient-to-r from-blue-400 to-green-600 
     shadow-md p-10 flex justify-content-center flex-col gap-1 m-3"
    >
      <span className="flex flex-row items-center gap-2 mb-5">
        <FontAwesomeIcon icon={faCalculator} className="mr-2 text-2xl" />
        <h2 className="font-bold text-2xl">Salary Calculator</h2>
      </span>
      <p className="font-light text-l">Based on Kenyan PAYE system</p>

      <form className="flex flex-col gap-4 pt-2" onSubmit={handleSubmit}>
        <span>
          <FontAwesomeIcon icon={faMoneyBill} className="mr-2" />
          <label htmlFor="Gross Salary">Monthly Gross Salary (KES)</label>
          <input
            className="bg-white rounded-sm w-full h-10 text-m font-light"
            type="number"
            id="Gross Salary"
            name="Gross Salary"
            required
            value={grossSalary}
            onChange={(e) => setGrossSalary(e.target.value)}
            placeholder=" Enter your Gross Salary"
          />
        </span>

        <span>
          <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
          <label htmlFor="Other Allowance">Other Allowance (KES)</label>
          <span className="flex flex-row items-center gap-2">
            <input
              className="bg-white rounded-sm w-full h-10 text-m font-light"
              type="number"
              id="Other Allowance"
              name="Other Allowance"
              value={otherAllowances}
              onChange={(e) => setOtherAllowances(e.target.value)}
              placeholder=" Enter your Other Allowance If any"
            />
          </span>
        </span>

        <span className="flex flex-row items-center gap-2">
          <input
            type="checkbox"
            id="SHIF"
            name="SHIF"
            checked={deductSHIF}
            onChange={(e) => setDeductSHIF(e.target.checked)}
          />
          <FontAwesomeIcon icon={faHandHoldingMedical} className="mr-2" />
          <label htmlFor="SHIF">Deduct SHIF</label>
        </span>

        <span className="flex flex-row items-center gap-2">
          <input
            type="checkbox"
            id="NSSF"
            name="NSSF"
            checked={deductNSSF}
            onChange={(e) => setDeductNSSF(e.target.checked)}
          />
          <FontAwesomeIcon icon={faHandHoldingHeart} className="mr-2" />
          <label htmlFor="NSSF">Deduct NSSF</label>
        </span>

        <span className="flex flex-row items-center gap-2">
          <input
            type="checkbox"
            id="Housing Levy"
            name="Housing Levy"
            checked={deductHousingLevy}
            onChange={(e) => setDeductHousingLevy(e.target.checked)}
          />
          <FontAwesomeIcon icon={faHouse} className="mr-2" />
          <label htmlFor="Housing Levy">Deduct Housing Levy</label>
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