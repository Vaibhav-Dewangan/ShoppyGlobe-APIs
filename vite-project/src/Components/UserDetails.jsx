import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "./Authcontext";
import { useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import useFetchData from "../hooks/useFetch";
import { jwtDecode } from "jwt-decode";


function UserDetails() {

    const { logout, isLogin } = useAuth();
    const url = "http://localhost:5100/users";
    const { data, isLoading, error } = useFetchData(url);
    const loginEmail = localStorage.getItem('email');
    const [remainingTime, setRemainingTime] = useState(0);

    const userData = useMemo(() => data ? data.find((user) => user.email === loginEmail) : null, [data, loginEmail]);

    const navigate = useNavigate();

    // Sign out function
    function handleSignOut() {
        logout();
        navigate('/');
    };

    // for countdown
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
                const currentTime = Date.now();
                const remainingTimeFn = Math.max(0, expirationTime - currentTime);
                setRemainingTime(remainingTimeFn);

                // Update countdown
                const interval = setInterval(() => {
                    setRemainingTime((prevTime) => Math.max(0, prevTime - 1000));
                }, 1000);

                // Clear interval on component unmount
                return () => clearInterval(interval);
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
    }, [userData]);

    // Format time as MM:SS
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };


    return (
        <div className="min-h-screen">
            {!isLogin ? (
                <LoginPage />
            ) : (
                <div className="flex flex-col justify-center items-center mx-auto mt-20">
                    <div className="p-5 rounded-md bg-slate-100 h-72 w-64 sm:h-72 sm:w-96 lg:h-80">
                        <h3 className="text-xl font-bold mb-4">Profile</h3>
                        {isLoading ? (
                            <p>Loading user data...</p>
                        ) : error ? (
                            <p className="text-red-500">Error loading user data: {error.message}</p>
                        ) : userData ? (
                            <div className="flex flex-col h-full pb-10 justify-between">
                                <div>
                                    <p><strong>Username:</strong> {userData.username}</p>
                                    <br />
                                    <p><strong>Email:</strong> {userData.email}</p>
                                </div>
                                <div className="flex items-center justify-center">
                                    <p className="text-red-500 text-sm">
                                        Session will expire in: {formatTime(remainingTime)}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <p>No user data found.</p>
                        )}
                    </div>
                    <div className="mt-5 mx-auto w-64 sm:w-96">
                        <button onClick={handleSignOut} className="bg-red-500 w-64 sm:w-96 text-white p-2 active:bg-red-400 rounded-md text-sm">Sign Out</button>
                    </div>
                </div>
            )};

        </div>
    )
};

export default UserDetails;