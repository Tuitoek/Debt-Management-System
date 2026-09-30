import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faCalendarDays,
  faCircleDollarToSlot,
  faMoneyBill,
  faMinusCircle,
  faPenToSquare,
  faTrash,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function Debtlist({ refreshSignal }) {
  const { token } = useAuth();
  const [debts, setDebts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const fetchDebts = () => {
    fetch("/api/debts", {
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

  const handleDelete = (id) => {
    fetch(`/api/debts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => fetchDebts())
      .catch((error) => console.error("Error deleting debt:", error));
  };

  // Start editing: switch this card into edit mode, pre-filled with current values
  const startEdit = (debt) => {
    setEditingId(debt.id);
    setEditForm({
      name: debt.name,
      total_amount: debt.total_amount,
      installment_amount: debt.installment_amount,
      interest_rate: debt.interest_rate,
      due_date: debt.due_date ? debt.due_date.split("T")[0] : "", // format for <input type="date">
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEdit = (id) => {
    fetch(`/api/debts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editForm),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          console.error("Update failed:", data);
          alert(data.message || "Failed to update debt");
          return;
        }
        setEditingId(null);
        fetchDebts();
      })
      .catch((error) => console.error("Error updating debt:", error));
  };

  return (
    <div className="m-10 p-5 gap-5 flex flex-col w-auto h-auto border border-gray-300 rounded-sm shadow-md bg-inherit">
      <span className="flex flex-row flex-wrap gap-3">
        <FontAwesomeIcon
          icon={faCalculator}
          className="mr-2 text-black text-4xl"
        />
        <h2 className="text-2xl font-bold mb-4 text-black">My Debts</h2>
      </span>

      <ul className="flex space-between flex-wrap gap-5">
        {debts.map((debt) =>
          editingId === debt.id ? (
            // EDIT MODE for this card
            <li
              key={debt.id}
              className="mb-2 w-72 h-auto bg-white p-3 border border-blue-400 rounded-lg flex flex-col shadow-md gap-2"
            >
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                className="p-2 border border-gray-300 rounded"
                placeholder="Debt name"
              />
              <input
                type="number"
                name="total_amount"
                value={editForm.total_amount}
                onChange={handleEditChange}
                className="p-2 border border-gray-300 rounded"
                placeholder="Total amount"
              />
              <input
                type="number"
                name="installment_amount"
                value={editForm.installment_amount}
                onChange={handleEditChange}
                className="p-2 border border-gray-300 rounded"
                placeholder="Installment amount"
              />
              <input
                type="number"
                step="0.01"
                name="interest_rate"
                value={editForm.interest_rate}
                onChange={handleEditChange}
                className="p-2 border border-gray-300 rounded"
                placeholder="Interest rate"
              />
              <input
                type="date"
                name="due_date"
                value={editForm.due_date}
                onChange={handleEditChange}
                className="p-2 border border-gray-300 rounded"
              />
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => saveEdit(debt.id)}
                  className="flex-1 bg-green-600 text-white p-2 rounded flex items-center justify-center gap-2"
                >
                  <FontAwesomeIcon icon={faCheck} /> Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="flex-1 bg-gray-400 text-white p-2 rounded flex items-center justify-center gap-2"
                >
                  <FontAwesomeIcon icon={faXmark} /> Cancel
                </button>
              </div>
            </li>
          ) : (
            // NORMAL DISPLAY MODE
            <li
              key={debt.id}
              className="w-auto h-auto bg-white p-2 border border-gray-300 rounded-lg flex flex-col shadow-md gap-3"
            >
              <span className=" p-2 w-auto h-auto bg-blue-500 text-white rounded-md flex">
                <p className=" font-bold text-md">Loan Name: {debt.name}</p>

                <span className="flex flex-row text-left ml-12">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="ml-2 text-black border p-2 rounded-lg bg-green-500 cursor-pointer"
                    onClick={() => startEdit(debt)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="ml-2 text-black border bg-red-500 p-2 rounded-lg cursor-pointer"
                    onClick={() => handleDelete(debt.id)}
                  />
                </span>
              </span>

              <span className="ml-2 w-auto h-auto border border-gray-300 rounded-md p-1 text-gray-700 flex flex-wrap gap-2">
                <span className="font-semibold">
                  <FontAwesomeIcon icon={faMoneyBill} className="mr-2" /> Total
                  Amount:
                </span>{" "}
               <p className="text-blue-500 font-semibold">KES {debt.total_amount}</p> 
              </span>

              <span className="ml-2 w-auto h-auto border border-gray-300 rounded-md p-1 text-gray-700 flex flex-wrap gap-2">
                <span className="font-semibold">
                  <FontAwesomeIcon
                    icon={faCircleDollarToSlot}
                    className="mr-2"
                  />{" "}
                  Interest Rate:
                </span>{" "}
                 <p className="text-blue-500 font-semibold">{debt.interest_rate}%</p>
              </span>

              <span className="ml-2 w-auto h-auto border border-gray-300 rounded-md p-1 text-gray-700 flex flex-wrap gap-2 ">
                <span className="font-semibold">
                  <FontAwesomeIcon icon={faMinusCircle} className="mr-2" />{" "}
                  Installment Amount:
                </span>{" "}
                <p className="text-blue-500 font-semibold">KES {debt.installment_amount}</p>
              </span>

              <span className="ml-2 w-auto h-auto border border-gray-300 rounded-md p-1 text-gray-700 flex flex-wrap gap-2">
                <span className="font-semibold">
                  <FontAwesomeIcon icon={faCalendarDays} className="mr-2" /> Due
                  Date:
                </span>{" "}
                <p className="text-blue-500 font-semibold">{new Date(debt.due_date).toLocaleDateString()} </p>
              </span>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

export default Debtlist;
