import { useState, useEffect } from "react";
import LandingHero from "./components/LandingHero";
import SalaryCalculator from "./components/SalaryCalculator";
import Navbar from "./components/Navbar";
import Infinity from "./components/Infinity";
import NetSalary from "./components/NetSalary";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  useEffect(() => {
    // Simulate an API call
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

  //Calling node server to send data to the backend
  fetch("http://localhost:5000/api/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key: "value" }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Response from server:", data);
      setMessage(data.message || "Data received successfully");
    })
    .catch((error) => {
      console.error("Error sending data:", error);
      setMessage("Error sending data");
    });

  return (
    <div className="p-5 gap-5">
      <LandingHero />
      <span className="flex flex-row justify-content-center gap-5">
        <SalaryCalculator />
        <NetSalary />
      </span>

      <Navbar />
    </div>
  );
}

export default App;
