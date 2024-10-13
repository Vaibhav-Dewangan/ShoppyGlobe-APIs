import React from "react";
import { useState } from "react";
import { removeItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus   } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
import { addItem } from "../utils/cartSlice";

function CartItem(props){
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.Cart.items); 

    const [quantity, setQuantity] = useState(props.item.quantity); 

    // handle same product add on
    
    if(cartItems.id === props.item.id){
        return handlePlus();
    }
    
    // handle remove item

    function handleRemoveItem(){
        dispatch(removeItem(props.item.id));
    };

    // handle quantity +, - 

    function handlePlus(){
        if(quantity < 10){
            setQuantity(quantity + 1);
            dispatch(addItem({ id: props.item.id, quantity: 1 }));
        }
        
    };

    function handleMinus(){
        if(quantity > 1){
            setQuantity(quantity-1);
            dispatch(addItem({ id: props.item.id, quantity: -1 }));
        }
       
    };

   

    return(
        <div key={props.item.id} className="CartItem w-full h-auto  rounded-lg border-2 p-2 flex justify-around ">
        <img src={props.item.image} alt={props.item.title} className="w-24 lg:w-40 lg:h-40  h-24 sm:w-32 sm:h-32  " />
        <div className="ml-4 w-44 sm:w-60 ">
            <h2 className="text-md font-bold lg:text-lg ">{props.item.title}</h2>
            <h2 className="text-sm text-gray-600 lg:text-md ">Brand:{props.item.brand}</h2>
            <h2 className="text-sm text-gray-600 lg:text-md ">{props.item.shipping}</h2>
            <p className="font-semibold text-md text-green-600 lg:text-lg">Price: ${props.item.price}</p>
            <div className="flex flex-row gap-5">
            <p>Quantity:  {quantity}</p>
            </div>

            <div className="mt-4 flex flex-row justify-between md:pr-5">

                <div className="flex flex-row gap-3 lg:gap-5 ">
                <button onClick={handleMinus} className="text-red-500"><FontAwesomeIcon icon={faMinus} /></button>
                <button onClick={handlePlus} className="text-green-500"><FontAwesomeIcon icon={faPlus} /></button>
                </div>
    
             <button onClick={handleRemoveItem} className="bg-red-500 text-white text-sm p-1 pr-4 pl-4 rounded-lg hover:bg-blue-600 active:scale-95">
              Remove 
             </button>
            </div>
            
           

             
           
        </div>
        </div>

    );
};

export default CartItem;