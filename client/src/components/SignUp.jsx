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
    setForm({ ...form, [e.target.name]: e.target.value });
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
  return (
    <div className="flex flex-wrap items-center justify-center">
      <form
        className="flex flex-col p-5 w-auto h-auto border border-gray-200 rounded-md shadow-md gap-2"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold text-2xl"> Sign Up</h2>
        {error && <p style={{ color: "red" }}> {error} </p>}
        <span className="flex flex-col p-2 gap-1">
          <p className="w-auto h-auto ">Full Name</p>
          <input
            className="p-2 border border-gray-100 rounded-sm"
            name="name"
            placeholder="Enter Your Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </span>
        <span className="flex flex-col p-2 gap-1">
          <p> Email Address</p>
          <input
            className="p-2 border border-gray-100 rounded-sm"
            name="email"
            type="email"
            placeholder="Enter your Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />
        </span>
        <span className="flex flex-col p-2 gap-1">
          <p> Password</p>
          <input
            className="p-2 border border-gray-100 rounded-sm"
            name="password"
            type="password"
            placeholder="Enter a strong Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </span>
        <span className="flex flex-col p-2 gap-1">
          <p>Phone Number</p>
          <input
            className="p-2 border border-gray-100 rounded-sm"
            name="phone"
            placeholder="Enter Valid Phone No"
            value={form.phone}
            onChange={handleChange}
          />
        </span>

        <button
          className="w-full  p-2 bg-blue-900 border border-black rounded-sm text-white text-xl font-bold"
          type="submit"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignUp;
