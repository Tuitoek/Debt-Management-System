import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faCalendar,
  faCalendarCheck,
  faCalendarDays,
  faCircleDollarToSlot,
  faMoneyBill,
  faPlusCircle,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";

function Debtlist() {
  const [debts, setDebts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/debts")
      .then((response) => response.json())
      .then((data) => setDebts(data))
      .catch((error) => console.error("Error fetching debts:", error));
  }, []);

  return (
    <div className="p-5 gap-5 flex flex-col  w-270 h-auto border border-gray-300 rounded-sm shadow-md bg-blue-800">
      <span className="flex flex-row gap-3">
        <FontAwesomeIcon
          icon={faCalculator}
          className="mr-2 text-white text-4xl"
        />
        <h2 className="text-2xl font-bold mb-4 text-white">My Debts</h2>
      </span>
      <ul className="flex space-around gap-4">
        {debts.map((debt) => (
          <li 
            className="mb-2 w-100 h-auto bg-white p-2 border border-gray-300 rounded-md flex flex-col shadow-md gap-3 "
            key={debt.id}
          >
            <span className="font-bold text-lg p-2 w-auto h-auto bg-blue-200 text-black rounded-md">
              Loan Name: {debt.name}
            </span>
               <span className="ml-2 w-auto h-auto border border-gray-300 rounded-md p-1 text-black">
              {" "}
              <span className="font-semibold">
                {" "}
                <FontAwesomeIcon
                  icon={faMoneyBill}
                  className="mr-2"
                />{" "}
                Loan Amount:
              </span>{" "}
              KES {debt.amount}
            </span>
            <span className="ml-2 w-auto h-auto border border-gray-300 rounded-md p-1 text-black">
              {" "}
              <span className="font-semibold">
                {" "}
                <FontAwesomeIcon
                  icon={faCircleDollarToSlot}
                  className="mr-2"
                />{" "}
                Outstanding Amount:
              </span>{" "}
              KES {debt.outstandingAmount}
            </span>
                  <span className="ml-2 w-auto h-auto border border-gray-300 rounded-md p-1 text-black">
              {" "}
              <span className="font-semibold">
                {" "}
                <FontAwesomeIcon
                  icon={faMinusCircle}
                  className="mr-2"
                />{" "}
                Installment Amount:
              </span>{" "}
              KES {debt.installmentAmount}
            </span>
            <span className="ml-2 w-auto h-auto border border-gray-300 rounded-md p-1 text-black">
              {" "}
              <span className="font-semibold">
                {" "}
                <FontAwesomeIcon icon={faCalendarDays} className="mr-2" /> Loan
                Due:
              </span>{" "}
              {debt.dueDate}
            </span>
            <span className="ml-2 w-auto h-auto border border-gray-300 rounded-md p-1 text-black ">
              {" "}
              <span className="font-semibold">
                {" "}
                <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" /> Loan
                Repayment Schedule:
              </span>{" "}
              {debt.repaymentSchedule}
            </span>
          </li>
        ))}

      </ul>
    </div>
  );
}

export default Debtlist;
