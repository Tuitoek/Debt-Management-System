import {useState, useEffect} from 'react'

function Debtlist() {
    const [debts, setDebts] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/api/debts')
        .then(response => response.json()   )
        .then(data => setDebts(data))
        .catch(error => console.error('Error fetching debts:', error))          
    }, []);

  return (
    <div className="p-5 gap-5 flex flex-col  w-auto h-auto border border-gray-300 rounded-sm shadow-md bg-blue-800">
      <h2 className="text-2xl font-bold mb-4 text-white">My Debts</h2>
      <ul className="flex flex-col gap-2">
        {debts.map(debt => (
          <li className="mb-2 w-auto h-auto bg-white p-2 border border-gray-300 rounded-md flex flex-col shadow-md" key={debt.id}>
            <span className="font-bold text-lg p-2">Loan Name: {debt.name}</span>
            <span className="ml-2"> <span className="font-semibold">Loan Amount:</span> KES {debt.amount}</span>
            <span className="ml-2"> <span className="font-semibold">Loan Due:</span> {debt.dueDate}</span>
            <span className="ml-2"> <span className="font-semibold">Loan Repayment Schedule:</span> {debt.repaymentSchedule}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}   

export default Debtlist