import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items:[],
}

const cartSlice = createSlice({
    name:"Cart",
    initialState,
    reducers:{
        addItem:(state, action) =>{
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if(existingItem){
                existingItem.quantity += action.payload.quantity;

            }else{
                state.items.push({ ...action.payload, quantity: 1 });
            }
           
        },
        removeItem:(state, action) =>{
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearCart:(state, action) =>{
            state.items = [];
        },
        setCartItems: (state, action) => {
            state.items = action.payload;
        },

    }

});

export default cartSlice.reducer;
export const{addItem, removeItem, clearCart, setCartItems} = cartSlice.actions;