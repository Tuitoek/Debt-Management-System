import { Navigate, replace } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import React from 'react'

const ProtectedRoute = ({children}) => {
    const { user } = useAuth();

    if(!user){
        return <Navigate to="/login" replace />;
    }

  return  children;
}

export default ProtectedRoute;