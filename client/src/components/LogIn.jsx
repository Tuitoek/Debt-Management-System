import React, { useState } from "react";
import { useAuth } from '../context/AuthContext'

const LogIn = ({ onClose }) => {
  // Form , Error and Login State
  const [form, setForm] = useState({
    email: ' ' , 
    password: ''
  })
  const [error, setError] = useState("");
  const { login } = useAuth();

const handleChange = (e) =>{
  setForm({...form, [e.target.name]: e.target.value});
}
const handleSubmit = async (e) =>{
  e.preventDefault();
  setError('');

  try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      // save user + token into context (and localStorage, via AuthContext)
      login(data.user, data.token);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Try again.');
    }
  };


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100  ">
      <form onSubmit={handleSubmit}>
      <h2>Log In</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />

      <button type="submit">Log In</button>
    </form>
    </div>
  );
}

export default LogIn;
