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
    <div className="p-5 gap-5 flex flex-col  justify-center">
      <h2 className="text-2xl font-bold mb-4">My Debts</h2>
      <ul className="flex flex-row gap-2">
        {debts.map(debt => (
          <li className="mb-2 w-auto h-auto bg-gradient-to-r from-blue-400 to-blue-600  p-2 border border-gray-300 rounded-md flex flex-col shadow-md" key={debt.id}>
            <span className="font-bold text-lg p-2">{debt.name}</span>
            <span className="ml-2">Loan Amount: KES {debt.amount}</span>
            <span className="ml-2">Loan Due: {debt.dueDate}</span>
            <span className="ml-2">Loan Repayment Schedule: {debt.repaymentSchedule}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}   

export default Debtlist