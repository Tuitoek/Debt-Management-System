import React from "react";

function NetSalary() {
  return (
    <div className="w-150 h-auto
     rounded-lg bg-gray-200 
     shadow-md p-10 m-10 flex justify-content-center 
     flex-col gap-5"
    >
      <h2 className="font-bold text-2xl">Net Salary</h2>
      <p className="font-light text-l">
        Your Net Salary will be displayed here
      </p>
      <p className="font-medium text-lg w-full h-full bg-gradient-to-r from-blue-400 to-green-600 
     shadow-md  p-2 rounded-lg">Gross Salary: <span className="font-light">KES</span> </p>
      <p className="font-medium text-lg w-full h-full bg-gradient-to-r from-blue-400 to-green-600 
     shadow-md p-2 rounded-lg">NSSF Deduction: <span className="font-light">KES</span> </p>
      <p className="font-medium text-lg w-full h-full bg-gradient-to-r from-blue-400 to-green-600 
     shadow-md p-2 rounded-lg">SHIF Deduction: <span className="font-light">KES</span> </p>
      <p className="font-medium text-lg w-full h-full bg-gradient-to-r from-blue-400 to-green-600 
     shadow-md p-2 rounded-lg">Housing Levy Deduction: <span className="font-light">KES</span> </p>
      <p className="font-medium text-lg w-full h-full bg-gradient-to-r from-blue-400 to-green-600 
     shadow-md p-2 rounded-lg">PAYE Deduction: <span className="font-light">KES</span> </p>
      <p className="font-bold text-xl w-full h-full bg-gradient-to-r from-blue-400 to-green-600 
     shadow-md p-2 rounded-lg">Total Deductions: <span className="font-light">KES</span> </p>
      <p className="font-bold text-xl w-full h-full bg-gradient-to-r from-blue-400 to-green-600 
     shadow-md p-2 rounded-lg">Net Salary: <span className="font-light">KES</span> </p>
    </div>
  );
}

export default NetSalary;
