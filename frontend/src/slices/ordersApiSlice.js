import { apiSlice } from './apiSlice';
import { ORDERS_URL, PAYPAL_URL } from '../utils/constant';

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
        }),
        payOrder: builder.mutation({
            query: ({orderId, details}) => ({
                url: `${ORDERS_URL}/${orderId}/paid`,
                method: 'POST',
                body: details
            })
        }),
        getPayPalClientId: builder.query({
            query: () => ({
                url: PAYPAL_URL
            }),
            keepUnusedDataFor: 30
        }),
        getCurrentUserOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/mine`
            }),
            keepUnusedDataFor: 30
        }),
        getAllOrdersForAdmin: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/all`
            }),
            keepUnusedDataFor: 30
        }),
        setOrderStatusToDelivered: builder.mutation({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}/shipment`,
                method: 'POST'
            })
        })
    })
})

export const {
    useCreateAnOrderMutation,
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPayPalClientIdQuery,
    useGetCurrentUserOrdersQuery,
    useGetAllOrdersForAdminQuery,
    useSetOrderStatusToDeliveredMutation
} = ordersApiSlice;