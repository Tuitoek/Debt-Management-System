import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  // Set Form State
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  // Set Error State
  const [error, setError] = useState("");
  // Set Login State
  const { login } = useAuth();

  const handleChange = (e) => {
    e.preventDefault();
    setError("");
  };

  // Handle Submit Function for signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      alert("Account Created! Please log in");
    } catch (error) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }
  };
  return <div>
    <form onSubmit = {handleSubmit}>
        {error && <p style={{color: 'red'}}> {error} </p> }
         <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />

      <button type="submit">Create Account</button>
    </form>
  </div>;
};

export default SignUp;
