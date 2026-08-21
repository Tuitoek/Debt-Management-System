import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faCalendarCheck,
  faCalendarDays,
  faCircleDollarToSlot,
  faMoneyBill,
  faMinusCircle,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function Debtlist() {
  const { token } = useAuth();
  const [debts, setDebts] = useState([]);

  const fetchDebts = () => {
    fetch("http://localhost:5000/api/debts", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDebts(data);
        } else {
          console.error("Unexpected debts response:", data);
          setDebts([]);
        }
      })
      .catch((error) => console.error("Error fetching debts:", error));
  };

  useEffect(() => {
    fetchDebts();
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/debts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => fetchDebts())
      .catch((error) => console.error("Error deleting debt:", error));
  };

  return (
    <div className="p-5 gap-5 flex flex-col w-auto h-auto border border-gray-300 rounded-sm shadow-md bg-blue-800">
      <span className="flex flex-row flex-wrap gap-3">
        <FontAwesomeIcon icon={faCalculator} className="mr-2 text-white text-4xl" />
        <h2 className="text-2xl font-bold mb-4 text-white">My Debts</h2>
      </span>

      <ul className="flex space-between flex-wrap gap-5">
        {debts.map((debt) => (
          <li
            className="mb-2 w-80 h-auto bg-white p-2 border border-gray-300 rounded-md flex flex-col shadow-md gap-3"
            key={debt.id}
          >
            <span className="font-bold text-lg p-2 w-auto h-auto bg-blue-200 text-black rounded-md">
              Loan Name: {debt.name}
              <span className="text-left ml-12">
                <FontAwesomeIcon icon={faPenToSquare} className="ml-2 text-green-600 cursor-pointer" />
                <FontAwesomeIcon
                  icon={faTrash}
                  className="ml-2 text-red-600 cursor-pointer"
                  onClick={() => handleDelete(debt.id)}
                />
              </span>
            </span>

            <span className="ml-2 w-auto h-auto border border-gray-300 rounded-md p-1 text-black">
              <span className="font-semibold">
                <FontAwesomeIcon icon={faMoneyBill} className="mr-2" /> Total Amount:
              </span>{" "}
              KES {debt.total_amount}
            </span>

            <span className="ml-2 w-auto h-auto border border-gray-300 rounded-md p-1 text-black">
              <span className="font-semibold">
                <FontAwesomeIcon icon={faCircleDollarToSlot} className="mr-2" /> Interest Rate:
              </span>{" "}
              {debt.interest_rate}%
            </span>

            <span className="ml-2 w-auto h-auto border border-gray-300 rounded-md p-1 text-black">
              <span className="font-semibold">
                <FontAwesomeIcon icon={faMinusCircle} className="mr-2" /> Installment Amount:
              </span>{" "}
              KES {debt.installment_amount}
            </span>

            <span className="ml-2 w-auto h-auto border border-gray-300 rounded-md p-1 text-black">
              <span className="font-semibold">
                <FontAwesomeIcon icon={faCalendarDays} className="mr-2" /> Due Date:
              </span>{" "}
              {new Date(debt.due_date).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Debtlist;