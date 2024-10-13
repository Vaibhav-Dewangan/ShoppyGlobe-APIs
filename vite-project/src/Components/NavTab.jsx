import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartShopping, faHouse, faMagnifyingGlass  } from '@fortawesome/free-solid-svg-icons';

function NavTab(){
    return(
        <div className="Nav-container sm:bg-slate-950 bg-white sm:text-white max-sm:shadow-md  p-1 pr-6 pl-6 sm:pr-10 sm:pl-10 lg:pr-20 lg:pl-20">

             <ul className="Nav-list flex justify-between items-center sm:justify-start sm:gap-10 md:14 ">

               <Link to="/">
               <li className="hover:scale-105 flex flex-row items-center gap-2 p-1"><FontAwesomeIcon icon={faHouse} /><p className="max-sm:hidden">Home</p></li>
               </Link>

               <Link to="/Search">
               <li className="hover:scale-105 flex flex-row items-center gap-2 p-1"><FontAwesomeIcon icon={faMagnifyingGlass} /><p className="max-sm:hidden">Search</p></li>
               </Link>

               <Link to="/Cart">
               <li className="hover:scale-105 flex flex-row items-center gap-2 p-1"><FontAwesomeIcon icon={faCartShopping} /><p className="max-sm:hidden">Cart</p></li>
               </Link>  

             </ul>

        </div>
       
    )
};
export default NavTab;