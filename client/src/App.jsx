import { useState, useEffect } from "react";
import LandingHero from "./components/LandingHero";
import SalaryCalculator from "./components/SalaryCalculator";
import Navbar from "./components/Navbar";
import NetSalary from "./components/NetSalary";
import "./App.css";

function App() {
  const [netSalary, setNetSalary] = useState(null);
  const [grossSalary, setGrossSalary] = useState("");
  const [otherAllowances, setOtherAllowances] = useState("");
  const [deductSHIF, setDeductSHIF] = useState(false);
  const [deductHousingLevy, setDeductHousingLevy] = useState(false);
  const [deductNSSF, setDeductNSSF] = useState(false);
  const [message, setMessage] = useState("");

  // Calculate net salary via backend API
  const handleCalculateNetSalary = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/calculate-net-salary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grossSalary,
          otherAllowances,
          deductSHIF,
          deductHousingLevy,
          deductNSSF,
        }),
      });
      const result = await res.json();
      setNetSalary(result.netSalary);
    } catch (error) {
      console.error("Error calculating net salary:", error);
    }
  };

  // Test call to backend on mount (runs once, not on every render)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/hello");
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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
        <NetSalary netSalary={netSalary} />
      </span>
      <Navbar />
    </div>
  );
}

export default App;