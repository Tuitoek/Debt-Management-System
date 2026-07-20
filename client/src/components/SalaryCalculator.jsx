import React from "react";


function SalaryCalculator() {

  return (
    <div
      className="w-100 h-auto
     rounded-lg bg-gradient-to-r from-blue-400 to-green-600 
     shadow-md p-10 m-10 flex justify-content-center flex-col"
    >
      <span>
        <h2 className="font-bold text-2xl">Salary Calculator</h2>
        <p className="font-light text-l">Based on Kenyan PAYE system</p>
      </span>

      <form className="flex flex-col p-4 gap-2" action="" method="post">
        <span>
          <label htmlFor="Gross Salary">Monthly Gross Salary (KES)</label>
          <input
            className="bg-white rounded-sm w-full h-10 text-m font-light"
            type="number"
            id="Gross Salary"
            name="Gross Salary"
            type="required"
            placeholder=" Enter your Gross Salary"
          />
        </span>

        <span>
          <label htmlFor="Other Allowance">Other Allowance (KES)</label>
          <input
            className="bg-white rounded-sm w-full h-10 text-m font-light"
            type="number"
            id="Other Allowance"
            name="Other Allowance"
            placeholder=" Enter your Other Allowance If any"
          />
        </span>
        <span>
          <input className="" type="checkbox" id="SHIF  " name="SHIF" />
          <label htmlFor="SHIF">Deduct SHIF</label>
        </span>
        <span>
          <input className="" type="checkbox" id="NSSF" name="NSSF" />
          <label htmlFor="NSSF">Deduct NSSF</label>
        </span>
        <span>
          <input className="" type="checkbox" id="Housing Levy" name="Housing Levy" />
          <label htmlFor="Housing Levy">Deduct Housing Levy</label>
        </span>

        <span>
          <button
            className=" w-full h-10 bg-blue-700 font-semibold py-2 px-4 rounded text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
