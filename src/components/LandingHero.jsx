import React from "react";
import "../index.css";

function LandingHero() {
  return (
    <div className="p-10 flex 
    justify-content-center
     flex-col items-center gap-10">
      <h1 className="text-transparent bg-clip-text 
      bg-gradient-to-r from-blue-600 to-green-500 
      text-6xl font-bold align-center">
        Debt Management System
      </h1>
      <h3 className="text-3xl font-light text-center">
        Take control of your finances with smart debt tracking, expense
        management & savings planning
      </h3>
    </div>
  );
}

export default LandingHero;
