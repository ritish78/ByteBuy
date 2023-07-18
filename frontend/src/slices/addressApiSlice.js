import { apiSlice } from "./apiSlice";
import { ADDRESS_URL } from "../utils/constant";

export const addressApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addShippingAddress: builder.mutation({
            query: (address) => ({
                url: ADDRESS_URL,
                method: 'POST',
                body: address
            })
        }),
        getShippingAddressOfCurrentUser: builder.query({
            query: () => ({
                url: ADDRESS_URL
            })
        }),
        getShippingAddressById: builder.query({
            query: (addressId) => ({
                url: `${ADDRESS_URL}/${addressId}`
            })
        }),
        updateShippingAddressById: builder.mutation({
            query: (addressId, address) => ({
                url: `${ADDRESS_URL}/${addressId}`,
                method: 'POST',
                body: address
            })
        })
    })
})

export const {
    useAddShippingAddressMutation,
    useGetShippingAddressOfCurrentUserQuery,
    useGetShippingAddressByIdQuery,
    useUpdateShippingAddressByIdMutation
} = addressApiSlice;