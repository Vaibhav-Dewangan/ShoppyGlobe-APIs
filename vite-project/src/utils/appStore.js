import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { addItem, clearCart, removeItem, setCartItems } from "./cartSlice";
import cartReducer from "./cartSlice";

const appStore = configureStore({

    reducer:{
        Cart: cartReducer,
    }
});

export default appStore;