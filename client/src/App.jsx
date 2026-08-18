import { useState, useEffect } from "react";
import LandingHero from "./components/LandingHero";
import SalaryCalculator from "./components/SalaryCalculator";
import Navbar from "./components/Navbar";
import NetSalary from "./components/NetSalary";
import Debtlist from "./components/Debtlist";
import DebtForm from "./components/DebtForm";
import Login from "./components/LogIn";
import LogInButton from "./components/LogInButton";
import SignUpButton from "./components/SignUpButton";
import { useAuth } from './context/AuthContext';
import "./App.css";
import SignUp from "./components/SignUp";

function App() {
  // Calculate net salary via backend API
  const [payeResult, setPayeResult] = useState(null);
  const { user, logout } = useAuth();

  if(user){
 return (
      <div>
        <h1>Welcome, {user.name}!</h1>
        <button onClick={logout}>Log Out</button>
      </div>
    );
  }

  // Receive calculated data directly from SalaryCalculator
  const handleCalculateNetSalary = (data) => {
    console.log("Data received in App.jsx:", data); // Debug log
    setPayeResult(data);
  };

  return (
    <div className="p-5 gap-5 bg-white-100">
      <SignUp />
      <Login />
<span className="flex flex-row flex-wrap gap-4 ">
        <LandingHero />
        <span className="flex flex-row gap-3 m-10">
          <LogInButton />
          <SignUpButton />
        </span>
      </span>
<Login />
      <span className="flex flex-row items-center justify-center gap-5">
        {/* Pass handler to receive result */}
        <SalaryCalculator onCalculate={handleCalculateNetSalary} />

        {/* Display NetSalary once payeResult is populated */}
        {payeResult && <NetSalary result={payeResult} />}
      </span>
      <Navbar />
      <span className="flex flex-row justify-center space-x-5 p-5">
        <DebtForm />
        <Debtlist />
      </span>
      
      
    </div>
  );
}

export default App;
