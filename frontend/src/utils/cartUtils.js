import { TAX_PERCENTAGE } from "../utils/constant";

export const showDecimal = (number) => {
    return (Math.round(number * 100) / 100).toFixed(2);
}

export const updateCart = (state) => {
    //Calculate item price
    state.itemsPrice = showDecimal(state.cartItems.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0));

    //Calculate shipping price
    //We will be charging shipping fee of $20 if order is less than $100
    state.shippingPrice = showDecimal(state.itemsPrice >= 100 ? 0 : 20);

    //Calculate total price
    state.totalPrice = showDecimal(Number(state.itemsPrice) + Number(state.shippingPrice));

    //Calculate tax price
    //The tax is already included in the item's price when we show items to the user.
    // itemPrice = taxPrice + intialPrice
    // initalPrice = itemPrice - taxPrice
    //              = itemPrice - (tax% of itemPrice)
    const initialPrice = showDecimal(state.totalPrice - ((TAX_PERCENTAGE / 100) * state.totalPrice));
    state.taxPrice = showDecimal(state.totalPrice - initialPrice);

    localStorage.setItem('cart-items', JSON.stringify(state));

    return state;
}