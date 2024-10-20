import React from "react";

function WelcomePage(){
    return(
        <div className="Welcome-page bg-slate-100 w-screen mt-5  h-52 sm:h-56 md:h-60 lg:h-80  flex items-center  bg-center bg-cover bg-no-repeat bg-[url(/src/assets/welcome1.webp)]" >
        <ul className="welcome-message flex flex-col p-6 max-sm:mb-2  sm:gap-1 text-lg sm:p-10 lg:pr-20 lg:pl-20  ">
           <li className="text-sm mt-4 rounded-sm lg:text-xl w-fit text-white font-semibold  p-1">Best Prices  </li>
           <li className="font-bold sm:text-2xl lg:text-4xl">Incredible Prices</li>
           <li className="font-bold sm:text-2xl lg:text-4xl">on All Your</li>
           <li className="font-bold sm:text-2xl lg:text-4xl">Favorite Items</li>
           <li className="text-sm mt-4 rounded-full lg:text-xl  bg-slate-50 px-1 pl-3">Get more for less on selected brands</li>
        </ul>
       </div>
    );
};

export default WelcomePage;