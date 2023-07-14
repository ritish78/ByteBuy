import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem('cart-items') ? JSON.parse(localStorage.getItem('cart-items')) : { cartItems: [] };


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const itemExistsInCart = state.cartItems.find((currentItem) => currentItem._id === item._id);

            if (itemExistsInCart) {
                state.cartItems = state.cartItems.map((currentItem) => currentItem._id === itemExistsInCart._id ? item : currentItem)
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            return updateCart(state);
        }
    }
});

export const {
    addToCart
} = cartSlice.actions;

export default cartSlice.reducer;