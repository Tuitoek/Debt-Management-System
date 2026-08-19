import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const LogIn = ({ onClose }) => {
  // Form , Error and Login State
  const [form, setForm] = useState({
    email: " ",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // save user + token into context (and localStorage, via AuthContext)
      login(data.user, data.token);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center ">
      <form
        className="flex flex-col p-5 w-auto h-auto border border-gray-200 rounded-md shadow-md gap-2 bg-green-600"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold text-2xl">Log In</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <span className="flex flex-col p-2 gap-1">
          <p>Email</p>
          <input
            className="p-2 border border-gray-100 rounded-sm"
            name="email"
            type="email"
            placeholder="Enter Your Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />
        </span>
        <span className="flex flex-col p-2 gap-1">
          <p>Password</p>
          <input
            className="p-2 border border-gray-100 rounded-sm"
            name="password"
            type="password"
            placeholder="Enter Your Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </span>

        <button
          className="w-full  p-2 bg-green-200 border border-black rounded-sm  text-xl font-bold"
          type="submit"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LogIn;
