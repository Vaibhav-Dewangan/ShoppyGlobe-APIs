import React from "react";
import ProductList from "./ProductList";
import WelcomePage from "./welcomePage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function Body() {
    
    return(
        <div className="Body-container min-h-screen  ">

            {/* welcome page */}
           
            <section className="Welcome-page flex flex-row overflow-x-scroll ">
               <WelcomePage />
            </section>

            {/* Product Section */}

            <section className="productList mt-5">
               <ProductList />
            </section>

            {/* buttons */}

            <section className="fixed bottom-10 right-10 space-x-3">
               <Link to="/Search" className="bg-black font-extrabold  hover:bg-slate-800 text-white sm:p-4 p-2 sm:pr-5 pr-3 sm:pl-5 pl-3  rounded-full"><FontAwesomeIcon icon={faMagnifyingGlass} /></Link>
               <a href="#" className="bg-black font-extrabold  hover:bg-slate-800 text-white sm:p-4 p-2 sm:pr-5 pr-3 sm:pl-5 pl-3 rounded-full scroll-smooth"><FontAwesomeIcon icon={faArrowUp} /></a>
            </section>

            

        </div> 
    );
};

export default Body;