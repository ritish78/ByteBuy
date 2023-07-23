import { PRODUCTS_URL } from "../utils/constant";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL
            }),
            keepUnusedDataFor: 30,  //In seconds
            providesTags: ['Products']
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`
            }),
            keepUnusedDataFor: 30
        }),
        createProduct: builder.mutation({
            query: (productInfo) => ({
                url: PRODUCTS_URL,
                method: 'POST',
                body: productInfo
            }),
            invalidatesTags: ['Product']
        }),
        updateProductById: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data._id}/update`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Product']
        })
    }),
});

export const { 
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductByIdMutation
} = productsApiSlice;