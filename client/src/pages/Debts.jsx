import React, { useState } from 'react'
import DebtForm from "../components/DebtForm";
import Debtlist from '../components/DebtList';

const Debts = () => {
   const [refreshSignal, setRefreshSignal] = useState(0);
   return (
    <div className="flex flex-row justify-center">
      <DebtForm  onDebtAdded={() => setRefreshSignal((prev) => prev + 1)}/>
      <Debtlist refreshSignal={refreshSignal} />
      </div>
  )
}

export default Debts