import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "./Authcontext";
import { faUser  } from '@fortawesome/free-solid-svg-icons';

const LoginPage = ()=>{
    const { login } = useAuth(); // Get login function from context
    const [newUser, setNewUser ] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        username:'',
        email:'',
        password:''
    });


    // Toggle between Register and Login forms
    function handleToggle() {
            setNewUser(!newUser);
            setErrorMessage("");  // Clear error message when toggling forms
    };

    // Handle input change
    function handleChange(e){
        const {name, value } = e.target;
        setFormData((prevState)=>({...prevState,[name]:value}));
    };

    // Handle form submission
    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);  // Start loading
        setErrorMessage("");  // Clear previous error

        try{
            const url = newUser ? 'http://localhost:5100/auth/register' : 'http://localhost:5100/auth/login';
            const response = await fetch(url,{
                method: 'POST',
                headers: {'content-Type':'application/json'},
                body: JSON.stringify(formData) // Send form data as JSON
            });

            const data = await response.json();
            if(response.ok){
                alert (newUser ? 'Resistration successful !' : 'Login successful !')
                if (newUser) {
                    // After successful registration, switch to login form
                    setNewUser(false);
                } else {
                    login(data.token); // Use the context login function
                    localStorage.setItem('email', formData.email); // Store email in localStorage
                }
            } else{
                setErrorMessage(data.message || "Something went wrong, please try again.");
            }

        } catch(error){
            setLoading(false);  // Stop loading
            console.error('Error:', error);
            setErrorMessage('Something went wrong, please try again.');
        }
    };

    return(
        <div className="min-h-screen">
        <div className="loginPage min-h-full flex flex-col items-center text-base lg:text-lg  px-6 mt-16 sm:mt-20 lg:px-8">
     
            <h2><FontAwesomeIcon icon={faUser} /> {newUser === false ? ("Login"):("Register")}</h2>
            
            <div >
                <form className="form flex flex-col justify-center items-center mt-5 md:gap-4" onSubmit={handleSubmit}>
                    {newUser === true && (
                        <div className="sm:w-72 md:w-80 lg:w-96 w-60">
                        <label htmlFor="username">Username</label>
                        <div className="mt-2 w-full">
                            <input className=" w-full px-2 border-2 border-gray-300 rounded-md" id="username"  autoComplete="username"  type="text" name="username" value={formData.username} onChange={handleChange} />
                        </div>
                    </div>
                    )}
                    
                    <div className="sm:w-72 md:w-80 lg:w-96 w-60">
                        <label htmlFor="email">Email address</label>
                        <div className="mt-2 w-full">
                            <input className="w-full border-2 px-2 border-gray-300 rounded-md" id="email"  type="email" autoComplete="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="sm:w-72 md:w-80 lg:w-96 w-60">
                        <label htmlFor="password">Password</label>
                        <div className="mt-2 w-full">
                            <input className=" w-full border-2 px-2 border-gray-300 rounded-md" id="password"  autoComplete="current-password"  type="password" name="password" value={formData.password} onChange={handleChange} />
                        </div>
                    </div>

                    {errorMessage && (
                            <p className="text-red-600 mt-2">{errorMessage}</p>
                        )}

                    <div className="mt-5 w-full ">
                        <button className="bg-indigo-600 border-2 border-indigo-600 rounded-md w-full text-white"   disabled={loading} type="submit">  {loading ? "Please wait..." : newUser ? "Register" : "Login"}</button>
                    </div>
                </form>

                <p className="mt-5 flex justify-center">
                {newUser ? "Already have an account?" : "New user?"} 
                    <a onClick={handleToggle} className="font-semibold  text-indigo-600 hover:text-indigo-500"> {newUser ? "Login here" : "Register here"} </a>
                </p>
            </div>
        </div>
        </div>
    )
};

export default LoginPage;