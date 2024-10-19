import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(() => {
        return localStorage.getItem('token') !== null;
    });

    const isTokenExpired = (token) => {
        if (!token) return true;
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000); // convert to seconds
            return decodedToken.exp < currentTime;
        } catch (error) {
            console.error("Error decoding token:", error);
            return true; // Treat any error as token expired
        }
    };
    

    // Check token on mount to handle logout 
    useEffect(()=>{
        const token = localStorage.getItem('token');

        if(token && isTokenExpired(token)){
            logout();
        }else if (token) { // Ensure token is valid before decoding
            const decodedToken = jwtDecode(token);
            const remainingTime = decodedToken.exp * 1000 - Date.now();
            const timeout = setTimeout(() => {
                logout();
            }, remainingTime);
    
            return () => clearTimeout(timeout);
        }
    },[]);

    // Update login state based on token presence in local storage
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLogin(!!token);
    }, []);

    const login = (token) => {
        try {
            localStorage.setItem('token', token);
            setIsLogin(true);
        } catch (error) {
            console.error('Error saving token to local storage:', error);
        }
    };

    const logout = () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            setIsLogin(false);
        } catch (error) {
            console.error('Error removing token from local storage:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isLogin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
