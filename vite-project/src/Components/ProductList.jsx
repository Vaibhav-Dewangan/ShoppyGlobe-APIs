import React from "react";
import useFetchData from "../hooks/useFetch";
import ProductItem from "./ProductItem";
import { useMemo } from "react";

function ProductList(){

    // Fetching url

    const url = "https://dummyjson.com/products";
    const {data, error, loading} = useFetchData(url);
    
    
    const beauty = useMemo(() => data.filter((items)=>items.category === "beauty"),[data]);
    const fragrances = useMemo(() => data.filter((items)=>items.category === "fragrances"),[data]);
    const furniture = useMemo(() => data.filter((items)=>items.category === "furniture"),[data]);
    const groceries = useMemo(() => data.filter((items)=>items.category === "groceries"),[data]);

    // Handle Loading

    if (loading) {
        return (
          <div className="flex justify-center items-center min-h-screen">
            <img
              src="/loading.gif"
              alt="Loading"
              className="w-10 h-10 lg:w-14 lg:h-14 mb-4"
            />
            <p className="text-lg font-semibold text-gray-500 ml-4">Loading products...</p>
          </div>
        );
      }

    // handle error
    
      if (error) {
        return (
          <div className="flex justify-center items-center min-h-screen">
            <p className="text-lg font-semibold text-red-500">Error loading products. Please try again later.</p>
          </div>
        );
      }

    return(
        <>

          <section  className="Product-List pt-5 w-full bg-pink-100  max-sm:pb-0  box-border">
            <h2 className="font-bold  lg:text-xl pr-6 pl-6 sm:pl-10 lg:pr-20 lg:pl-20 ">Beauty</h2>
            <div className="Card-1 flex gap-5 p-6 sm:pl-10 sm:pr-10 lg:pr-20 lg:pl-20 lg:gap-10 overflow-x-auto   ">
            
               {beauty.map((item)=>(
                    <ProductItem key={item.id} itemId={item.id} itemTitle={item.title} itemBrand={item.brand} itemPrice={item.price} itemImage={item.images} itemRating={item.rating} loadingStatus={loading} errorStatus={error}  />
                ))}
         
            </div>
            </section> <hr />

            <section  className="Product-List pt-5 w-full bg-gray-200  max-sm:pb-0  box-border">
            <h2 className="font-bold  lg:text-xl pr-6 pl-6 sm:pl-10 lg:pr-20 lg:pl-20 ">Groceries</h2>
            <div className="Card-1 flex gap-5 p-6 sm:pl-10 sm:pr-10 lg:pr-20 lg:pl-20 lg:gap-10 overflow-x-auto   ">
            
               {groceries.map((item)=>(
                    <ProductItem key={item.id} itemId={item.id} itemTitle={item.title} itemBrand={item.brand} itemPrice={item.price} itemImage={item.images} itemRating={item.rating} loadingStatus={loading} errorStatus={error}  />
                ))}
         
            </div>
            </section> <hr />

            <section  className="Product-List pt-5 w-full bg-orange-100  max-sm:pb-0  box-border">
            <h2 className="font-bold  lg:text-xl pr-6 pl-6 sm:pl-10 lg:pr-20 lg:pl-20 ">Furniture</h2>
            <div className="Card-1 flex gap-5 p-6 sm:pl-10 sm:pr-10 lg:pr-20 lg:pl-20 lg:gap-10 overflow-x-auto   ">
            
               {furniture.map((item)=>(
                    <ProductItem key={item.id} itemId={item.id} itemTitle={item.title} itemBrand={item.brand} itemPrice={item.price} itemImage={item.images} itemRating={item.rating} loadingStatus={loading} errorStatus={error}  />
                ))}
         
            </div>
            </section> <hr />

            <section  className="Product-List pt-5 w-full bg-gray-100  max-sm:pb-0  box-border">
            <h2 className="font-bold  lg:text-xl pr-6 pl-6 sm:pl-10 lg:pr-20 lg:pl-20 ">Fragrances</h2>
            <div className="Card-1 flex gap-5 p-6 sm:pl-10 sm:pr-10 lg:pr-20 lg:pl-20 lg:gap-10 overflow-x-auto   ">
            
               {fragrances.map((item)=>(
                    <ProductItem key={item.id} itemId={item.id} itemTitle={item.title} itemBrand={item.brand} itemPrice={item.price} itemImage={item.images} itemRating={item.rating} loadingStatus={loading} errorStatus={error}  />
                ))}
         
            </div>
            </section> 


        </>

        

    );
};

export default ProductList;