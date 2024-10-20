import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; 
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginPage from "./LoginPage";
import { clearCart, setCartItems } from "../utils/cartSlice";
import { useAuth } from "./Authcontext";

function Cart() {
    const [cart, setCart] = useState([]);
    const { isLogin} = useAuth(); // Use context for login state
    const dispatch = useDispatch();
   
    // For Api calling
    const token = localStorage.getItem('token');
    const headerDetails = {
        "content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };

    //Fetch cart data from API
    async function fetchCartItems() {
        try{
            const response = await fetch("http://localhost:5100/api/cart",{
                method: "GET",
                headers:headerDetails,

            });
            const cart = await response.json();
            if(response.ok){
                dispatch(setCartItems(cart));
                setCart(cart);
                console.log("cart items fetched successfully")
            }
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }

    };

    useEffect(()=>{
        fetchCartItems();
    },[]);
   
    // Handle clear cart
    async function handleClearCart() {
        try {
            // Backend request to clear all items in the cart
            const response = await fetch("http://localhost:5100/api/cart/clear", {
                method: "DELETE",
                headers:headerDetails,
            });

            if (response.ok) {
                dispatch(clearCart());
                setCart([]);
                console.log("Cart cleared successfully");
            } else {
                console.error("Failed to clear cart");
            }
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    };

    // calculating total price
    const totalPrice = cart.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);
    
    return (
        <>
        {!isLogin ? (
            <LoginPage/>
        ):(
            <div className="Cart-container min-h-screen lg:mx-48 p-5 pt-10 flex flex-col gap-5">
            {cart.length > 0 ? (
                cart.map((item) => (
                   <CartItem key={item._id} item={item} fetchFunction={fetchCartItems} />
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
        )}
       </>
    );
    
}

export default Cart;