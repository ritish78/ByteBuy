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
        getShippingAddressByUserId: builder.query({
            query: (userId) => ({
                url: `${ADDRESS_URL}/${userId}/user`
            })
        }),
        updateShippingAddressById: builder.mutation({
            query: (address) => ({
                url: `${ADDRESS_URL}/${address.addressId}/update`,
                method: 'POST',
                body: address
            })
        }),
        getAllShippingAddress: builder.query({
            query: ({ pageNumber }) => ({
                url: `${ADDRESS_URL}/all`,
                params: {
                    pageNumber
                }
            })
        })
    })
})

export const {
    useAddShippingAddressMutation,
    useGetShippingAddressOfCurrentUserQuery,
    useGetShippingAddressByIdQuery,
    useGetShippingAddressByUserIdQuery,
    useUpdateShippingAddressByIdMutation,
    useGetAllShippingAddressQuery
} = addressApiSlice;