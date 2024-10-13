import React from "react";
import { useSelector } from "react-redux"; 
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";

function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.Cart.items); 

    console.log(cartItems);

    // calculating total price

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // handle clear cart
    
    function handleClearCart(){
        dispatch(clearCart());

    };


    return (
        <div className="Cart-container min-h-screen lg:mx-48 p-5 flex flex-col gap-5">
            {cartItems.length > 0 ? (
                cartItems.map((item) => (
                   <CartItem key={item.id} item={item} />
                ))
            ) :  (
                <div className="empty-cart flex flex-col mx-auto mt-16 sm:mt-20 items-center justify-center h-full text-center">
                    <img
                        src="/empty-cart.png" 
                        alt="Empty Cart"
                        className="w-48 h-48 lg:w-56 lg:h-56 mb-4"
                    />
                    <p className="text-lg font-semibold text-gray-500">
                        Your cart is empty.
                    </p>
                    <Link to="/">
                    <button className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Start Shopping
                    </button>
                    </Link>
                    
                </div>
            )}

            <div className="fixed bottom-0 left-0 right-0 h-14 lg:h-16 bg-gray-300 w-full flex justify-evenly items-center  pr-5 pl-5 pt-2 border-t ">
            <Link className="  p-1 bg-white pr-5 pl-5 rounded-lg border-black " >
               Total : <span className="text-green-600 font-semibold"> $ {totalPrice}</span>
             </Link>
            <button onClick={handleClearCart} className="bg-red-600 text-white p-1  pr-5 pl-5 rounded-lg hover:bg-red-800 active:scale-95">Clear Cart</button>
            </div>


        </div>
    );
}

export default Cart;