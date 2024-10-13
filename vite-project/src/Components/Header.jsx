import React from "react";
import NavTab from "./NavTab";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping, faBars } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";


function Header(){
    const [menuOpen, setMenuOpen] = useState(false);

    function handleMenu(){
        setMenuOpen(!menuOpen);
    };
    return(
        <>
         <div className="header-container bg-slate-950 shadow-lg h-20 lg:h-28 sm:h-20 p-6 sm:p-10 lg:pr-20 lg:pl-20 lg:mb-5 flex align-middle items-center justify-between">
            <div className="title flex items-center">
            <span className="title text-white font-bold sm:text-xl lg:text-2xl flex flex-row items-center gap-2"><FontAwesomeIcon className="pr-1" icon={faBagShopping} /> Shoppy Globe</span>
            </div>
        
            <div className="flex flex-row justify-start sticky top-0  ">
            <div className="NavTabs-1 max-sm:hidden  "><NavTab /></div>
            <button onClick={handleMenu} className="text-white hover:scale-105 flex  items-center text-xl  p-1 "><FontAwesomeIcon icon={faBars} /></button>
            </div>
        

        
        </div>

        {/* Nav Tabs for small screen */}
        <div className="NavTabs-2 sm:hidden "><NavTab /></div>

        {/* Dropdown Menu */}
      <div className={`menu ${menuOpen ? 'block' : 'hidden'}  absolute  h-auto w-full bg-white top-20 md:top-28 shadow-md rounded-md p-4 md:right-10 md:w-72 lg:w-96 `}>
        <ul className="text-black space-y-3 text-center">
          <Link to="/About">
          <li className=" p-2 rounded-md active:scale-95 hover:text-blue-600">About</li>
          </Link>
          <li className=" p-2 rounded-md active:scale-95"><a className="hover:text-blue-600" href="mailto:vaibhavdewangan28@gmail.com">Contact Us</a></li>
        </ul>
      </div>
        </> 
    )
};

export default Header;