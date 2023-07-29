import { USERS_URL } from "../utils/constant";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        logoutUser: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            })
        }),
        registerUser: builder.mutation({
            query: (userInfo) => ({
                url: `${USERS_URL}/signup`,
                method: 'POST',
                body: userInfo
            })
        }),
        updateUserProfile: builder.mutation({
            query: (profileInfo) => ({
                url: `${USERS_URL}/profile`,
                method: 'POST',
                body: profileInfo
            })
        }),
        getAllUsers: builder.query({
            query: ({ keyword, pageNumber }) => ({
                url: `${USERS_URL}/all`,
                params: {
                    keyword,
                    pageNumber
                }
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 30
        }),
        deleteUserById: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE'
            })
        }),
        getUserDetailsById: builder.query({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`
            }),
            keepUnusedDataFor: 30
        }),
        updateUserById: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/${data.userId}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['User']
        })
    })
})

export const {
    useLogoutUserMutation,
    useRegisterUserMutation,
    useUpdateUserProfileMutation,
    useGetAllUsersQuery,
    useDeleteUserByIdMutation,
    useGetUserDetailsByIdQuery,
    useUpdateUserByIdMutation
} = usersApiSlice;