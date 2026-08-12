import { useState, useEffect } from "react";
import LandingHero from "./components/LandingHero";
import SalaryCalculator from "./components/SalaryCalculator";
import Navbar from "./components/Navbar";
import NetSalary from "./components/NetSalary";
import Debtlist from "./components/Debtlist";
import DebtForm from "./components/DebtForm";
import "./App.css";

function App() {
 // Calculate net salary via backend API
  const [payeResult, setPayeResult] = useState(null);

  // Receive calculated data directly from SalaryCalculator
  const handleCalculateNetSalary = (data) => {
    console.log("Data received in App.jsx:", data); // Debug log
    setPayeResult(data);
  };
  
  return (
    <div className="p-5 gap-5">
      <LandingHero />
      <span className="flex flex-row items-center justify-center gap-5">
       {/* Pass handler to receive result */}
        <SalaryCalculator onCalculate={handleCalculateNetSalary} />

        {/* Display NetSalary once payeResult is populated */}
        {payeResult && <NetSalary result={payeResult} />}
      </span>
      <Navbar />
      <span className="flex flex-row  space-x-5 p-5">
        <DebtForm />
        <Debtlist />
      </span>
    </div>
  );
}

export default App;
