import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('cart-items') ? JSON.parse(localStorage.getItem('cart-items')) : { cartItems: [] };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {}
});

export default cartSlice.reducer;