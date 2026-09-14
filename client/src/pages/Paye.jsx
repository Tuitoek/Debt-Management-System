import React from "react";
import { useState } from "react";
import SalaryCalculator from "../components/SalaryCalculator";
import NetSalary from "../components/NetSalary";

const Paye = () => {
  const [payeResult, setPayeResult] = useState(null);

  const handleCalculate = (data) => {
    setPayeResult(data);
  };
  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      <SalaryCalculator onCalculate={handleCalculate} />
      <NetSalary result={payeResult} />
    </div>
  );
};

export default Paye;
