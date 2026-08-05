import { useState, useEffect } from "react";
import LandingHero from "./components/LandingHero";
import SalaryCalculator from "./components/SalaryCalculator";
import Navbar from "./components/Navbar";
import NetSalary from "./components/NetSalary";
import Debtlist from "./components/Debtlist";
import "./App.css";

function App() {
  const [netSalary, setNetSalary] = useState(null);
  const [grossSalary, setGrossSalary] = useState("");
  const [otherAllowances, setOtherAllowances] = useState("");
  const [deductSHIF, setDeductSHIF] = useState(false);
  const [deductHousingLevy, setDeductHousingLevy] = useState(false);
  const [deductNSSF, setDeductNSSF] = useState(false);
  const [payeResult, setPayeResult] = useState(null);
  const [message, setMessage] = useState("");

  // Calculate net salary via backend API
  const handleCalculateNetSalary = async () => {
    const res = await fetch("http://localhost:5000/api/calculate-net-salary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grossSalary,
        otherAllowances,
        deductSHIF,
        deductHousingLevy,
        deductNSSF,
      }),
    });
    const result = await res.json();
    // Store Paye Result
    setPayeResult(result);
    try {}catch (error) {
      console.error("Error calculating net salary:", error);
      setMessage("Failed to calculate net salary. Please try again.");
    }
  }
  
  return (
    <div className="p-5 gap-5">
      <LandingHero />
      <span className="flex flex-row items-center justify-center gap-5">
        <SalaryCalculator
          grossSalary={grossSalary}
          setGrossSalary={setGrossSalary}
          otherAllowances={otherAllowances}
          setOtherAllowances={setOtherAllowances}
          deductSHIF={deductSHIF}
          setDeductSHIF={setDeductSHIF}
          deductNSSF={deductNSSF}
          setDeductNSSF={setDeductNSSF}
          deductHousingLevy={deductHousingLevy}
          setDeductHousingLevy={setDeductHousingLevy}
          onCalculate={handleCalculateNetSalary}
        />
        {payeResult && <NetSalary result={payeResult} />}
      </span>
      <Navbar />
      <Debtlist />
    </div>
  );
}

export default App;
