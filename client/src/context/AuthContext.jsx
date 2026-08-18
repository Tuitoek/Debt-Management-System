import React,{ createContext, useContext, useState} from 'react';

const AuthContext = createContext();

export function AuthProvider({children}){
    // Set state for User
    const [user, setUser] = useState(()=> {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    })

    // Set Auth Token
    const [token, setToken] = useState(()=>
    localStorage.getItem('token') || null
    )

    // set Login
    const login = (userData, jwtToken) =>{
        setUser(userData);
        setToken(jwtToken);
        localStorage.setItem(user, JSON.stringify(userData));
        localStorage.setItem('token', jwtToken);
    }

    // Logout function
    const logout = () =>{
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

  return (
    <AuthContext.Provider value = {{ user, token, login, logout }}>
        {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}