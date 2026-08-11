import React,{useState} from 'react'

const DebtForm = () => {
  const [debtName, setDebtName] = useState('');
  const [debtAmount, setDebtAmount] = useState('');
  const [repaymentSchedule, setRepaymentSchedule] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className='p-5 w-100 h-auto border border-gray-300 rounded shadow-md bg-white'>
        <form className='flex flex-col gap-5 p-4' onSubmit={handleSubmit}       >
            <h3 className='text-lg font-bold'>Add New Debt</h3>
            <input type="text" placeholder='Enter debt name' className='p-2 border border-gray-300 rounded' value={debtName} onChange={(e) => setDebtName(e.target.value)}/>
            <input type="number" placeholder='Enter debt amount' className='p-2 border border-gray-300 rounded' value={debtAmount} onChange={(e) => setDebtAmount(e.target.value)}/>
            <input type="number" placeholder='Enter repayment schedule' className='p-2 border border-gray-300 rounded' value={repaymentSchedule} onChange={(e) => setRepaymentSchedule(e.target.value)}/>
            <input type="text" placeholder='Enter interest rate' className='p-2 border border-gray-300 rounded' value={interestRate} onChange={(e) => setInterestRate(e.target.value)}/>
            <input type="date" placeholder='Enter due date' className='p-2 border border-gray-300 rounded' value={dueDate} onChange={(e) => setDueDate(e.target.value)}     />
            <button type="submit" className='bg-blue-800 text-white p-2 rounded'>Add Debt</button>
        </form>
    </div>
  )
}

export default DebtForm