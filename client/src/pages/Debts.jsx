import React, { useState } from 'react'
import DebtForm from "../components/DebtForm";
import Debtlist from '../components/DebtList';

const Debts = () => {
   const [refreshSignal, setRefreshSignal] = useState(0);
   return (
    <div className="max-w-3xl mx-auto mt-10 p-5 flex flex-row gap-6">
      <DebtForm  onDebtAdded={() => setRefreshSignal((prev) => prev + 1)}/>
      <Debtlist refreshSignal={refreshSignal} />
      </div>
  )
}

export default Debts