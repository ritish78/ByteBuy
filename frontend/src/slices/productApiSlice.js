import { PRODUCTS_URL, IMAGES_URL } from "../utils/constant";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ pageNumber }) => ({
                url: PRODUCTS_URL,
                params: {
                    pageNumber
                }
            }),
            keepUnusedDataFor: 30,  //In seconds
            providesTags: ['Product']
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
        }),
        uploadProductImages: builder.mutation({
            query: (data) => ({
                url: IMAGES_URL,
                method: 'POST',
                body: data
            })
        }),
        deleteProductById: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE'
            })
        })
    }),
});

export const { 
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductByIdMutation,
    useUploadProductImagesMutation,
    useDeleteProductByIdMutation
} = productsApiSlice;