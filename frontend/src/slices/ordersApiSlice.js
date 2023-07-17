import { apiSlice } from './apiSlice';
import { ORDERS_URL } from '../utils/constant';

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createAnOrder: builder.mutation({
            query: (orderInfo) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: { ...orderInfo }
            })
        })
    })
})

export const {
    useCreateAnOrderMutation
} = ordersApiSlice;