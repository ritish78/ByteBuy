import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userAddress: localStorage.getItem('userAddress') 
                    ? JSON.parse(localStorage.getItem('userAddress'))
                    : null
}

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        setAddress: (state, action) => {
            state.userAddress = action.payload;

            localStorage.setItem('userAddress', JSON.stringify(action.payload));
        },
        removeAddress: (state, action) => {
            state.userAddress = null;

            localStorage.removeItem('userAddress');
        }
    }
})

export const {
    setAddress,
    removeAddress
} = addressSlice.actions;

export default addressSlice.reducer;