import React, { useEffect } from "react";
import { useState } from "react";
import { removeItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { addItem } from "../utils/cartSlice";

function CartItem({ item, fetchFunction }) {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState("");
    const [quantity, setQuantity] = useState(item.quantity);
    const [removed, setRemoved] = useState(false);

    // For Api calling
    const token = localStorage.getItem('token');
    const headerDetails = {
        "content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };

    useEffect(() => {
        if (removed) {
            fetchFunction(); // Call the fetchFunction after item is removed
        }
    }, [removed]);

    // Handle remove item from Redux and backend
    const handleRemoveItem = async () => {
        try {
            // Backend remove request
            const response = await fetch(`http://localhost:5100/cart/remove/${item._id}`, {
                method: "DELETE",
                headers: headerDetails,
            });

            const result = await response.json();
            if (response.ok) {
                // Dispatch Redux action to remove item
                dispatch(removeItem(item._id));
                setRemoved(true);
                console.log("Item removed from cart");
            } else {
                setErrorMessage("Failed to remove item from cart.");
            }
        } catch (error) {
            console.error("Error removing item:", error);
            setErrorMessage("Network error. Please try again.");
        }
    };

    // Handle increment quantity
    const handlePlus = async () => {
        if (item.quantity < 10) {

            // Update quantity in the backend
            try {
                const response = await fetch(`http://localhost:5100/cart/update/inc/${item._id}`, {
                    method: "PATCH",
                    headers: headerDetails,
                });

                if (response.ok) {
                    const updatedItem = await response.json();
                    setQuantity(updatedItem.quantity);
                    dispatch(addItem({ id: item._id, quantity: 1 }));
                    console.log(updatedItem);
                } else {
                    setErrorMessage("Failed to update quantity.");
                }
            } catch (error) {
                console.error("Error updating quantity:", error);
                setErrorMessage("Network error. Please try again.");
            }
        }
    };

    // Handle decrement quantity
    const handleMinus = async () => {
        if (quantity > 1) {

            // Update quantity in the backend
            try {
                const response = await fetch(`http://localhost:5100/cart/update/dec/${item._id}`, {
                    method: "PATCH",
                    headers: headerDetails,

                });

                if (response.ok) {
                    const updatedItem = await response.json();
                    setQuantity(updatedItem.quantity);
                    dispatch(addItem({ id: item._id, quantity: -1 }));
                    console.log(updatedItem);
                } else {
                    setErrorMessage("Failed to update quantity.");
                }

            } catch (error) {
                console.error("Error updating quantity:", error);
                setErrorMessage("Network error. Please try again.");
            }
        }
    };

    return (
        <div className="CartItem w-full h-auto  rounded-lg border-2 p-2 flex justify-around ">
            <img src={item.productId.images[0]} alt={item.productId.title} className="w-24 lg:w-40 lg:h-40  h-24 sm:w-32 sm:h-32  " />
            <div className="ml-4 w-44 sm:w-60 ">
                <h2 className="text-md font-bold lg:text-lg ">{item.productId.title}</h2>
                <h2 className="text-sm text-gray-600 lg:text-md ">Brand:{item.productId.brand}</h2>
                <h2 className="text-sm text-gray-600 lg:text-md ">{item.productId.shippingInformation}</h2>
                <p className="font-semibold text-md text-green-600 lg:text-lg">Price: ${item.productId.price}</p>
                <div className="flex flex-row gap-5">
                    <p>Quantity:  {quantity}</p>
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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