import React from "react";

function WelcomePage(){
    return(
        <div className="Welcome-page bg-slate-100 w-screen mt-5  h-80 lg:h-96 flex items-center  bg-center bg-cover bg-no-repeat bg-[url(/src/assets/welcome.webp)]" >
        <ul className="welcome-message flex flex-col p-6 max-sm:mb-2 sm:text-3xl gap-1 text-2xl   sm:p-10 lg:pr-20 lg:pl-20  ">
           <li className="text-sm mt-4 rounded-sm lg:text-xl w-fit text-white font-semibold  p-1">Best Prices  </li>
           <li className="font-bold sm:text-4xl lg:text-5xl">Incredible Prices</li>
           <li className="font-bold sm:text-4xl lg:text-5xl">on All Your</li>
           <li className="font-bold sm:text-4xl lg:text-5xl">Favorite Items</li>
           <li className="text-sm mt-4 rounded-full lg:text-xl  bg-slate-50 p-1 pl-3">Get more for less on selected brands</li>
        </ul>
       </div>
    );
};

export default WelcomePage;