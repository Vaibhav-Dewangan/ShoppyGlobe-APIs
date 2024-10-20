import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./Authcontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartShopping, faHouse, faMagnifyingGlass, faUser  } from '@fortawesome/free-solid-svg-icons';

function NavTab(){
    
    const {isLogin} = useAuth();

    return(
        <div className="Nav-container sm:bg-slate-800 bg-white sm:text-white max-sm:shadow-md  p-1 pr-6 pl-6 sm:pr-10 sm:pl-10 lg:pr-20 lg:pl-20">

             <ul className="Nav-list flex justify-between items-center sm:justify-start sm:gap-10 md:14 text-sm lg:text-base ">

               <Link to="/">
               <li className="hover:scale-105 flex flex-row items-center gap-2 p-1"><FontAwesomeIcon icon={faHouse} /><p className="max-sm:hidden">Home</p></li>
               </Link>

               <Link to="/Search">
               <li className="hover:scale-105 flex flex-row items-center gap-2 p-1"><FontAwesomeIcon icon={faMagnifyingGlass} /><p className="max-sm:hidden">Search</p></li>
               </Link>

               <Link to="/Cart">
               <li className="hover:scale-105 flex flex-row items-center gap-2 p-1"><FontAwesomeIcon icon={faCartShopping} /><p className="max-sm:hidden">Cart</p></li>
               </Link>  

               <Link to='/Account'>
                    <li className="hover:scale-105 flex flex-row items-center gap-2 p-1 cursor-pointer">
                        <FontAwesomeIcon icon={faUser} />
                        <p className="max-sm:hidden">{isLogin ? 'Account' : 'Login'}</p>
                    </li>
                </Link>

             </ul>

        </div>
       
    )
};
export default NavTab;