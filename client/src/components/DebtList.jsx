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

function Debtlist({ refreshSignal }) {
  const { token } = useAuth();
  const [debts, setDebts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  //   Function that fetched debts from database
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
  }, [refreshSignal]);

  //   Function that deletes debts from Database
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/debts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => fetchDebts())
      .catch((error) => console.error("Error deleting debt:", error));
  };

  //   Start editing: switch card into edit mode, prefilled with current values
  const startEdit = (debt) => {
    setEditingId(null);
    setEditForm({
        name: debt.name,
        total_amount: debt.total_amount,
        installment_amount: debt.installment_amount,
        interest_rate: debt.interest_rate,
        due_date: debt.due_date ? debt.due_date.split("T")[0] : "",
    });
  };

  const cancelEdit = () =>{
    setEditingId(null),
    setEditForm({});
  }

  const handleEditChange = (e) =>{
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  };

  


  return (
    <div className="p-4  flex flex-col gap-5 w-auto h-auto border border-gray-300 rounded-sm shadow-md bg-inherit">
      <span className="flex flex-row flex-wrap gap-3">
        <FontAwesomeIcon
          icon={faCalculator}
          className="mr-2 text-black text-4xl"
        />
        <h2 className="text-2xl font-bold mb-4 text-black">My Debts</h2>
      </span>

      <ul className="flex space-between flex-wrap gap-5">
        {debts.map((debt) => (
          <li
            className="m-4 w-auto h-auto bg-white p-2 border border-gray-300 rounded-lg flex flex-col shadow-md gap-3"
            key={debt.id}
          >
            <span className="font-bold text-lg p-2 w-auto h-auto bg-blue-500 text-white rounded-md flex justify-center">
              Loan Name: {debt.name}
              <span className="text-left ml-12">
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  onClick={updateDebt}
                  className="ml-2 text-black border p-2 rounded-lg bg-green-500 cursor-pointer"
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className="ml-2 text-black border bg-red-500 p-2 rounded-lg cursor-pointer"
                  onClick={() => handleDelete(debt.id)}
                />
              </span>
            </span>

            <span className="ml-2 w-auto h-auto border border-gray-300 rounded-md p-1 text-black">
              <span className="font-semibold">
                <FontAwesomeIcon icon={faMoneyBill} className="mr-2" /> Total
                Amount:
              </span>{" "}
              KES {debt.total_amount}
            </span>

            <span className="ml-2 w-auto h-auto border border-gray-300 rounded-md p-1 text-black">
              <span className="font-semibold">
                <FontAwesomeIcon icon={faCircleDollarToSlot} className="mr-2" />{" "}
                Interest Rate:
              </span>{" "}
              {debt.interest_rate}%
            </span>

            <span className="ml-2 w-auto h-auto border border-gray-300 rounded-md p-1 text-black">
              <span className="font-semibold">
                <FontAwesomeIcon icon={faMinusCircle} className="mr-2" />{" "}
                Installment Amount:
              </span>{" "}
              KES {debt.installment_amount}
            </span>

            <span className="ml-2 w-auto h-auto border border-gray-300 rounded-md p-1 text-black">
              <span className="font-semibold">
                <FontAwesomeIcon icon={faCalendarDays} className="mr-2" /> Due
                Date:
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
