import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';


const Income = () => {
    const { token } = useAuth();
    const [incomeList, setIncomeList] = useState([]);
    const [form, setForm] = useState({ source: '', amount: '', date_received: '' });
    const [error, setError] = useState(' ');

    // Fetch Income when page loads
    const fetchIncome = async () =>{
        try {
            const res = await fetch("http://localhost:5000/api/income", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await.res.json();
            setIncomeList(data);

        } catch (error) {
            console.error('Fetch income error:', error);
        }    
    }
    // Use Effect to manage fetched income
     useEffect(()=>{
            fetchIncome()
        }, []);

    // Handle form changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    // Handle Form Submit
    const handleSubmit = async(e) =>{
        e.preventDefault();
        setError('');

        try {

            const res = await fetch("http://localhost:5000/api/income", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:  `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            // If response is not okay, Show Error
            if(!res.ok){
                setError(data.message || 'Failed to add income');
                return;
            }

            // Clear Form to null values
            setForm({ 
                source: '',
            amount: '',
        date_received: '' 
    })
    // Refresj list to show new entry
    fetchIncome()
        } catch (error) {
            
        }
    }
    return (
    <div>Income</div>
  )
}

export default Income