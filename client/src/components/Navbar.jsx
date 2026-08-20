import React, { useState } from "react";
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
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="m-10 p-5 w-auto h-auto bg-gradient-to-r from-blue-600 to-green-500 rounded-lg shadow-md font-semibold text-lg">
      {/* Top row: Home link + burger button */}
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <FontAwesomeIcon icon={faHouse} className="mr-2" />
          <h2>Home</h2>
        </Link>

        {/* Burger button — only shows on small screens */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
        </button>

        {/* Desktop menu — hidden on small screens, shown from md breakpoint up */}
        <div className="hidden md:flex flex-wrap justify-around items-center gap-6">
          {user ? (
            <>
              <Link to="/dashboard" className="flex items-center gap-2">
                <FontAwesomeIcon icon={faGauge} className="mr-2" /> <h2>Dashboard</h2>
              </Link>
              <Link to="/profile" className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} className="mr-2" /> <h2>Profile</h2>
              </Link>
              <Link to="/income" className="flex items-center gap-2">
                <FontAwesomeIcon icon={faMoneyBill} className="mr-2" /> <h2>Income</h2>
              </Link>
              <Link to="/debts" className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCreditCard} className="mr-2" /> <h2>Debts</h2>
              </Link>
              <Link to="/budget" className="flex items-center gap-2">
                <FontAwesomeIcon icon={faWallet} className="mr-2" /> <h2>Budget</h2>
              </Link>
              <Link to="/expenses" className="flex items-center gap-2">
                <FontAwesomeIcon icon={faPiggyBank} className="mr-2" /> <h2>Expenses</h2>
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-2 text-red-700">
                <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" /> <h2>Log Out</h2>
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
      </div>

      {/* Mobile dropdown — only rendered when isOpen, only visible on small screens */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 pt-4 border-t border-white/40">
          {user ? (
            <>
              <Link to="/dashboard" className="flex items-center gap-2" onClick={closeMenu}>
                <FontAwesomeIcon icon={faGauge} className="mr-2" /> <h2>Dashboard</h2>
              </Link>
              <Link to="/profile" className="flex items-center gap-2" onClick={closeMenu}>
                <FontAwesomeIcon icon={faUser} className="mr-2" /> <h2>Profile</h2>
              </Link>
              <Link to="/income" className="flex items-center gap-2" onClick={closeMenu}>
                <FontAwesomeIcon icon={faMoneyBill} className="mr-2" /> <h2>Income</h2>
              </Link>
              <Link to="/debts" className="flex items-center gap-2" onClick={closeMenu}>
                <FontAwesomeIcon icon={faCreditCard} className="mr-2" /> <h2>Debts</h2>
              </Link>
              <Link to="/budget" className="flex items-center gap-2" onClick={closeMenu}>
                <FontAwesomeIcon icon={faWallet} className="mr-2" /> <h2>Budget</h2>
              </Link>
              <Link to="/expenses" className="flex items-center gap-2" onClick={closeMenu}>
                <FontAwesomeIcon icon={faPiggyBank} className="mr-2" /> <h2>Expenses</h2>
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-2 text-red-700">
                <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" /> <h2>Log Out</h2>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="flex items-center gap-2" onClick={closeMenu}>
                <h2>Log In</h2>
              </Link>
              <Link to="/signup" className="flex items-center gap-2" onClick={closeMenu}>
                <h2>Sign Up</h2>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;