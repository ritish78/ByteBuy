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
        }),
        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`
            }),
            keepUnusedDataFor: 30
        })
    })
})

export const {
    useCreateAnOrderMutation,
    useGetOrderDetailsQuery
} = ordersApiSlice;