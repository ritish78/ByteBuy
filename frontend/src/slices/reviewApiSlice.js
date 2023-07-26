import { REVIEWS_URL } from "../utils/constant";
import { apiSlice } from "./apiSlice";

export const reviewsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReviewById: builder.query({
            query: (reviewId) => ({
                url: `${REVIEWS_URL}/${reviewId}`
            }),
            keepUnusedDataFor: 30,
            providesTags: ['Review']
        }),
        getReviewsByProductId: builder.query({
            query: (productId) => ({
                url: `${REVIEWS_URL}/product/${productId}`
            }),
            keepUnusedDataFor: 30,
            providesTags: ['Review']
        }),
        getAllReviewsOfOneUser: builder.query({
            query: (userId) => ({
                url: `${REVIEWS_URL}/user/${userId}`
            }),
            keepUnusedDataFor: 30
        }),
        createReview: builder.mutation({
            query: (reviewInfo) => ({
                url: `${REVIEWS_URL}/${reviewInfo.productId}`,
                method: 'POST',
                body: reviewInfo
            }),
            invalidatesTags: ['Product', 'Review']
        }),
        updateReviewById: builder.mutation({
            query: (reviewInfo) => ({
                url: `${REVIEWS_URL}/${reviewInfo.reviewId}}/update`,
                method: 'POST',
                body: reviewInfo
            }),
            invalidatesTags: ['Product', 'Review']
        }),
        deleteReviewById: builder.mutation({
            query: (reviewId) => ({
                url: `${REVIEWS_URL}/${reviewId}`,
                method: 'DELETE'
            })
        })
    })
});


export const {
    useGetReviewByIdQuery,
    useGetReviewsByProductIdQuery,
    useGetAllReviewsOfOneUserQuery,
    useCreateReviewMutation,
    useUpdateReviewByIdMutation,
    useDeleteReviewByIdMutation
} = reviewsApiSlice;