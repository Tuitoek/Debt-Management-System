import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillWave,
  faMinus,
  faWallet,
  faLandmark,
  faHandHoldingMedical,
  faHandHoldingUsd,
  faHandHoldingHeart,
} from "@fortawesome/free-solid-svg-icons";

function NetSalary() {
  return (
    <div
      className="w-150 h-auto
     rounded-lg bg-white
     shadow-md p-10 m-10 flex justify-content-center 
     flex-col gap-5"
    >
      <h2 className="font-bold text-2xl text-center">Net Salary</h2>
      <p className="font-light text-l text-center">
        Your Net Salary will be displayed here
      </p>
      <p
        className="font-sm text-lg w-full h-full  
     shadow-md rounded-sm p-2 rounded-lg"
      >
        <span className="flex items-center gap-2">
          <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2" />
          <h3>Gross Salary:</h3>
          <span className="font-light">KES</span>
        </span>
      </p>
      <p
        className="font-sm text-lg w-full h-full 
     shadow-md p-2 rounded-lg"
      >
        <span className="flex items-center gap-2">
          <FontAwesomeIcon icon={faHandHoldingHeart} className="mr-2" />
          <h3>NSSF Deduction:</h3>
          <span className="font-light">KES</span>
        </span>
      </p>
      <p
        className="font-sm text-lg w-full h-full  
     shadow-md p-2 rounded-lg"
      >
        <span className="flex items-center gap-2">
          <FontAwesomeIcon icon={faHandHoldingMedical} className="mr-2" />
          <h3>SHIF Deduction:</h3>
          <span className="font-light">KES</span>
        </span>
      </p>
      <p
        className="font-sm text-lg w-full h-full 
     shadow-md p-2 rounded-lg"
      >
        <span className="flex items-center gap-2">
          <FontAwesomeIcon icon={faLandmark} className="mr-2" />
          <h3>Housing Levy Deduction:</h3>
          <span className="font-light">KES</span>
        </span>
      </p>
      <p
        className="font-sm text-lg w-full h-full 
     shadow-md p-2 rounded-lg"
      >
        <span className="flex items-center gap-2">
          <FontAwesomeIcon icon={faHandHoldingUsd} className="mr-2" />
          <h3>PAYE Deduction:</h3>
          <span className="font-light">KES</span>
        </span>
      </p>
      <p
        className="font-bold text-xl w-full h-full 
     shadow-md p-2 rounded-lg"
      >
        <span className="flex items-center gap-2">
          <FontAwesomeIcon icon={faMinus} className="mr-2" />
          <h3>Total Deductions:</h3>
          <span className="font-light">KES</span>
        </span>
      </p>
      <p
        className="font-bold text-xl w-full h-full 
     shadow-md p-2 rounded-lg"
      >
          <span className="flex items-center gap-2">
          <FontAwesomeIcon icon={faWallet} className="mr-2" />
          <h3>Net Salary:</h3>
          <span className="font-light">KES</span>
        </span>
      </p>
    </div>
  );
}

export default NetSalary;
