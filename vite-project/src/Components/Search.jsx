import React, { useEffect } from "react";
import ProductList from "./ProductList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faArrowUp  } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import ProductItem from "./ProductItem";
import useFetchData from "../hooks/useFetch";
import { Link } from "react-router-dom";

function Search() {

    const url = 'https://dummyjson.com/products';
    const {data, loading, error} = useFetchData(url);
    const[searchInput, setSearchInput] = useState('');
    const[searchFilter, setSearchFilter] = useState([]);
    const[hiddenCss, setHiddenCss] = useState("");

    // handle OnChange

    function SearchInputOnChange(e){
        const value = e.target.value;
        setSearchInput(value);

        if (value.trim() === '') {
            setSearchFilter([]);
            return;
        }

        const searched = data.filter((item) => item.title.toLowerCase().includes(value.toLocaleLowerCase()));
        setSearchFilter(searched);


    };

    useEffect(()=>{

        if(searchInput !== ''){
            setHiddenCss("Product-List pt-5 w-full bg-indigo-100  max-sm:pb-0  box-border ")
        }else{
            setHiddenCss("Product-List pt-5 w-full bg-indigo-100  max-sm:pb-0  box-border hidden")
        }

    },[searchInput])

    // Handle Search Click

    function handleClick(){

        const searched = data.filter((item) => item.title.toLowerCase().includes(value.toLocaleLowerCase()));
        setSearchFilter(searched);


    };
    
    // handle error

     if (error) {
        return (
          <div className="flex justify-center items-center min-h-screen">
            <p className="text-lg font-semibold text-red-500">Error loading products. Please try again later.</p>
          </div>
        );
      }

    return(
        <div className="Search-container min-h-screen">

            <section className="flex flex-row justify-center p-6 gap-5 bg-slate-50">

                <input onChange={SearchInputOnChange} className="shadow-inner w-60 sm:w-96 sm:p-2 border-2 border-slate-800 rounded-full p-1 text-center" type="text" placeholder="Search Book By Name"  value={searchInput} />
                <button onClick={handleClick} className="hover:scale-110"><FontAwesomeIcon className="text-xl" icon={faMagnifyingGlass} /></button>

            </section>
            
           {/* Section with conditions */}
            <section  className={hiddenCss}>
            <h2 className="font-bold  lg:text-xl pr-6 pl-6 sm:pl-10 lg:pr-20 lg:pl-20  ">Searches</h2>
            {searchFilter.length === 0 && searchInput ? (
                     <div className="Card-1 flex  flex-col items-center justify-center gap-5 p-6 sm:pl-10 sm:pr-10  lg:pr-20 lg:pl-20 lg:gap-10 overflow-x-auto   ">
                        <img className="lg:h-40 lg:w-40 sm:h-20 sm:w-20 h-20 w-20" src="/no-results.png" alt="No search found" />
                        <p className=" text-gray-600 mt-4 ">No results found</p>
                     </div>
                    
                ):(
            <div className="Card-1 flex gap-5 p-6 sm:pl-10 sm:pr-10 lg:pr-20 lg:pl-20 lg:gap-10 overflow-x-auto   ">
            
               {searchFilter.map((item)=>(
                    <ProductItem key={item.id} itemId={item.id} itemTitle={item.title} itemBrand={item.brand} itemPrice={item.price} itemImage={item.images} itemRating={item.rating} loadingStatus={loading} errorStatus={error}  />
                ))}
         
            </div>)
            }
            </section> 

            <section>
                <ProductList/>
            </section>

            <section className="fixed bottom-10 right-10 space-x-3">
               <Link to="/Search" className="bg-black font-extrabold  hover:bg-slate-800 text-white sm:p-4 p-2 sm:pr-5 pr-3 sm:pl-5 pl-3  rounded-full"><FontAwesomeIcon icon={faMagnifyingGlass} /></Link>
               <a href="#" className="bg-black font-extrabold  hover:bg-slate-800 text-white sm:p-4 p-2 sm:pr-5 pr-3 sm:pl-5 pl-3 rounded-full scroll-smooth"><FontAwesomeIcon icon={faArrowUp} /></a>
            </section>
 
        </div>
        
    );
};

export default Search;