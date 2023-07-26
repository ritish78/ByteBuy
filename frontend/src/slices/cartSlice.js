import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem('cart-items') 
                        ? JSON.parse(localStorage.getItem('cart-items')) 
                        : { cartItems: [], shippingAddress: {}, paymentMethod: '' };


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const itemExistsInCart = state.cartItems.find((currentItem) => currentItem._id === item._id);
            console.log(itemExistsInCart);

            if (itemExistsInCart) {
                state.cartItems = state.cartItems.map((currentItem) => currentItem._id === itemExistsInCart._id ? item : currentItem);
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
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;

            return updateCart(state);
        },
        clearCartItems: (state, action) => {
            state.cartItems = [];

            return updateCart(state);
        }
    }
});

export const {
    addToCart,
    removeFromCart,
    saveShippingAddress,
    savePaymentMethod,
    clearCartItems
} = cartSlice.actions;

export default cartSlice.reducer;