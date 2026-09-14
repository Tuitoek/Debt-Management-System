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

function NetSalary({ result }) {
  // Avoid rendering if result is null or undefined
  if (!result) return null;

  const { gross, nssf, shif, housingLevy, paye, netSalary, totalDeductions } =
    result;

  return (
    <div className="w-full max-w-md h-auto rounded-lg bg-white shadow-md p-6 m-3 flex flex-col gap-4">
      <h2 className="font-bold text-2xl text-center text-gray-800">
        Net Salary Breakdown
      </h2>
      <p className="font-light text-sm text-center text-gray-500 mb-2">
        Based on official Kenyan statutory rates
      </p>
      {/* Gross Salary */}
      <div className="text-lg w-full shadow-sm border p-3 rounded-lg flex items-center justify-between">
        <span className="flex items-center gap-2 font-medium">
          <FontAwesomeIcon icon={faMoneyBillWave} className="text-blue-500" />
          <span>Gross Salary:</span>
        </span>
        <span className="font-semibold text-gray-800">
          KES {gross?.toLocaleString()}
        </span>
      </div>

      {/* NSSF */}
      <div className="text-base w-full shadow-sm border p-3 rounded-lg flex items-center justify-between">
        <span className="flex items-center gap-2 font-medium text-gray-700">
          <FontAwesomeIcon icon={faHandHoldingHeart} className="text-red-500" />
          <span>NSSF Deduction:</span>
        </span>
        <span className="font-medium text-red-600">
          - KES {nssf?.toLocaleString()}
        </span>
      </div>

      {/* SHIF */}
      <div className="text-base w-full shadow-sm border p-3 rounded-lg flex items-center justify-between">
        <span className="flex items-center gap-2 font-medium text-gray-700">
          <FontAwesomeIcon
            icon={faHandHoldingMedical}
            className="text-red-500"
          />
          <span>SHIF Deduction:</span>
        </span>
        <span className="font-medium text-red-600">
          - KES {shif?.toLocaleString()}
        </span>
      </div>

      {/* Housing Levy */}
      <div className="text-base w-full shadow-sm border p-3 rounded-lg flex items-center justify-between">
        <span className="flex items-center gap-2 font-medium text-gray-700">
          <FontAwesomeIcon icon={faLandmark} className="text-red-500" />
          <span>Housing Levy:</span>
        </span>
        <span className="font-medium text-red-600">
          - KES {housingLevy?.toLocaleString()}
        </span>
      </div>

      {/* PAYE */}
      <div className="text-base w-full shadow-sm border p-3 rounded-lg flex items-center justify-between">
        <span className="flex items-center gap-2 font-medium text-gray-700">
          <FontAwesomeIcon icon={faHandHoldingUsd} className="text-red-500" />
          <span>PAYE (Tax):</span>
        </span>
        <span className="font-medium text-red-600">
          - KES {paye?.toLocaleString()}
        </span>
      </div>

      {/* Total Deductions */}
      <div className="text-lg w-full shadow-sm border p-3 rounded-lg flex items-center justify-between bg-gray-50">
        <span className="flex items-center gap-2 font-semibold text-gray-800">
          <FontAwesomeIcon icon={faMinus} className="text-gray-600" />
          <span>Total Deductions:</span>
        </span>
        <span className="font-bold text-gray-800">
          KES {totalDeductions?.toLocaleString()}
        </span>
      </div>

      {/* Net Salary Result */}
      <div className="text-xl w-full shadow-md border-2 border-green-500 p-4 rounded-lg flex items-center justify-between bg-green-50">
        <span className="flex items-center gap-2 font-bold text-green-900">
          <FontAwesomeIcon icon={faWallet} className="text-green-600" />
          <span>Net Salary:</span>
        </span>
        <span className="font-extrabold text-green-700">
          KES {netSalary?.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export default NetSalary;
