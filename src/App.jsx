import { useState } from "react";
import LandingHero from "./components/LandingHero";
import SalaryCalculator from "./components/SalaryCalculator";
import Navbar from "./components/Navbar";
import Infinity from "./components/Infinity";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-5 gap-5">
      <LandingHero />
      <SalaryCalculator />
      <Navbar />
    </div>
  );
}

export default App;
