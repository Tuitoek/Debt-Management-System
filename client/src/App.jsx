import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LandingHero from "./components/LandingHero";
import SalaryCalculator from "./components/SalaryCalculator";
import Navbar from "./components/Navbar";
import NetSalary from "./components/NetSalary";
import Debtlist from "./components/Debtlist";
import DebtForm from "./components/DebtForm";
import Login from "./components/LogIn";
import LogInButton from "./components/LogInButton";
import SignUpButton from "./components/SignUpButton";
import { useAuth } from "./context/AuthContext";
import "./App.css";
import SignUp from "./components/SignUp";

function App() {
  // Calculate net salary via backend API
  const [payeResult, setPayeResult] = useState(null);
  const { user, logout } = useAuth();

  if (user) {
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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
