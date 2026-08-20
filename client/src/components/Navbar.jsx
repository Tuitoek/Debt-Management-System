import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMoneyBill,
  faCreditCard,
  faPiggyBank,
  faUser,
  faWallet,
  faGauge,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className=" flex flex-wrap m-10 p-5 w-auto h-15  bg-gradient-to-r from-blue-600 to-green-500  rounded-lg shadow-md p-4 flex justify-around items-center font-semibold text-lg">
      <Link to="/" className="flex items-center gap-2">
        <FontAwesomeIcon icon={faHouse} className="mr-2" />
        <h2>Home</h2>
      </Link>

      {user ? (
        <>
          <Link to="/dashboard" className="flex items-center gap-2">
            <FontAwesomeIcon icon={faGauge} className="mr-2" />
            <h2>Dashboard</h2>
          </Link>

          <Link to="/profile" className="flex items-center gap-2">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            <h2>Profile</h2>
          </Link>

          <Link to="/income" className="flex items-center gap-2">
            <FontAwesomeIcon icon={faMoneyBill} className="mr-2" />
            <h2>Income</h2>
          </Link>

          <Link to="/debts" className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
            <h2>Debts</h2>
          </Link>

          <Link to="/budget" className="flex items-center gap-2">
            <FontAwesomeIcon icon={faWallet} className="mr-2" />
            <h2>Budget</h2>
          </Link>

          <Link to="/expenses" className="flex items-center gap-2">
            <FontAwesomeIcon icon={faPiggyBank} className="mr-2" />
            <h2>Expenses</h2>
          </Link>

          <button onClick={handleLogout} className="flex items-center gap-2 text-red-700">
            <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
            <h2>Log Out</h2>
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="flex items-center gap-2 p-4 border-blue-300 rounded-lg font-semibold">
            <h2>Log In</h2>
          </Link>
          <Link to="/signup" className="flex items-center gap-2">
            <h2>Sign Up</h2>
          </Link>
        </>
      )}
    </div>
  );
}

export default Navbar;