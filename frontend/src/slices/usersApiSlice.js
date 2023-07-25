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
            query: () => ({
                url: `${USERS_URL}/all`
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 30
        }),
        deleteUserById: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE'
            })
        })
    })
})

export const {
    useLogoutUserMutation,
    useRegisterUserMutation,
    useUpdateUserProfileMutation,
    useGetAllUsersQuery,
    useDeleteUserByIdMutation
} = usersApiSlice;