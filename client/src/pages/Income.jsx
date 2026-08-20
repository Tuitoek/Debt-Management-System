import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';


const Income = () => {
    const { token } = useAuth();
    const [incomeList, setIncomeList] = useState([]);
    const [form, setForm] = useState({ source: '', amount: '', date_received: '' });
    const [error, setError] = useState(' ');
    return (
    <div>Income</div>
  )
}

export default Income