import React, { useState } from "react";
import { 
  Container, 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Alert, 
  CircularProgress 
} from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LogIn = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");
    } catch (err) {
      console.error("Error signing in:", err);
      // Cleans up standard Firebase error strings for cleaner UI display
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100  ">
      <form className='flex flex-col gap-5 p-4 border rounded-md border-gray-300 shadow-md' onSubmit={handleLogin}       >
                  <h3 className='text-lg font-bold'>Login</h3>
                  <input type="number" placeholder='Enter Email Address' className='p-2 border border-gray-300 rounded' value={email} onChange={(e) => setEmail(e.target.value)}/>
                  <input type="password" placeholder='Enter Password' className='p-2 border border-gray-300 rounded' value={password} onChange={(e) => setPassword(e.target.value)}     />
                  <button type="submit" className='bg-blue-800 text-white p-2 rounded'>Login</button>
              </form>
    </div>
  );
};

export default LogIn;