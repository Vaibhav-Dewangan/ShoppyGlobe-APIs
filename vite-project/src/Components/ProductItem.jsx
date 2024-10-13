import React, { useState } from "react";
import { Link } from "react-router-dom";

function ProductItem(props){

    const [ItemImage, setItemImage] = useState(props.itemImage);

    // handling image with more than one link

    if(ItemImage.length > 1){
        setItemImage([props.itemImage[1]]);

    };
    
    return(
       <>
       {props.loadingStatus === false ? (

         <Link to={`/products/productDetails/${props.itemId}`}> <div className="Item-Card h-64 w-48 lg:h-72 lg:w-52 shadow-md  flex justify-center  flex-col bg-white items-center flex-shrink-0 p-5 hover:scale-105 rounded-lg" >
         
         <img className="Item-Card-img mb-5 bg-cover h-32 w-32  lg:h-36 lg:w-36 rounded-md bg-white " src={ItemImage} alt="book" />
         
         <div className="flex text-center flex-col ">
         <p>{props.itemTitle} <b>{props.itemBrand} </b></p>
         <p><b>$ {props.itemPrice}</b></p>
         </div>
        
         </div></Link>
       ):(
        <Link to={`/products/productDetails/${props.itemId}`}> <div className="Item-Card h-64 w-48 lg:h-72 lg:w-52 shadow-md  flex justify-center  flex-col bg-white items-center flex-shrink-0 p-5 hover:scale-105 rounded-lg" >
         
        <img className="Item-Card-img mb-5 bg-cover h-32 w-32  lg:h-36 lg:w-36 rounded-md bg-white " src={'/loading.gif'} alt="book" />
        
        <div className="flex text-center flex-col ">
        <p>{''} <b>{""} </b></p>
        <p><b>{""}</b></p>
        </div>
       
        </div></Link>
       )}
      
       
       </>
    );
};

export default ProductItem;