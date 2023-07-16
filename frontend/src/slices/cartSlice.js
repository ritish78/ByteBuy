import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem('cart-items') 
                        ? JSON.parse(localStorage.getItem('cart-items')) 
                        : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };


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
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload);

            return updateCart(state);
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;

            return updateCart(state);
        }
    }
});

export const {
    addToCart,
    removeFromCart,
    saveShippingAddress
} = cartSlice.actions;

export default cartSlice.reducer;