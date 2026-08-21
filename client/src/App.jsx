import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import LandingHero from "./components/LandingHero";
import SalaryCalculator from "./components/SalaryCalculator";
import Navbar from "./components/Navbar";
import NetSalary from "./components/NetSalary";
import Debtlist from "./pages/Debtlist";
import DebtForm from "./components/DebtForm";
import Login from "./components/LogIn";
import LogInButton from "./components/LogInButton";
import SignUpButton from "./components/SignUpButton";
import { useAuth } from "./context/AuthContext";
import "./App.css";
import SignUp from "./components/SignUp";
import Profile from "./pages/Profile";
import Income from "./pages/Income";

function App() {
  // Calculate net salary via backend API
  const [payeResult, setPayeResult] = useState(null);

  // Receive calculated data directly from SalaryCalculator
  const handleCalculateNetSalary = (data) => {
    console.log("Data received in App.jsx:", data); // Debug log
    setPayeResult(data);
  };

  return (
    <>
   <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/income"
        element={
          <ProtectedRoute>
            <Income />
          </ProtectedRoute>
        }
      />
           <Route
        path="/income"
        element={
          <ProtectedRoute>
            <Debtlist />
          </ProtectedRoute>
        }
      />
    </Routes>
     
    </>
  );
}

export default App;
