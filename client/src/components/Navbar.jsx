import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMoneyBill,
  faCreditCard,
  faPiggyBank,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  return (
    <div className="w-full h-15 bg-gray-300 rounded-lg shadow-md p-4 flex justify-around items-center font-semibold text-lg">
      <span className="flex items-center gap-2">
        <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
        <h2>Debts</h2>
      </span>
      <span className="flex items-center gap-2" >
        <FontAwesomeIcon icon={faHouse} className="mr-2" />
        <h2>Payments</h2>
      </span>
 
      <span className="flex items-center gap-2">
        <FontAwesomeIcon icon={faMoneyBill} className="mr-2" />
        <h2>Expenses</h2>
      </span>

      <span className="flex items-center gap-2">
        <FontAwesomeIcon icon={faPiggyBank} className="mr-2" />
        <h2>Savings</h2>
      </span>
    </div>
  );
}

export default Navbar;
