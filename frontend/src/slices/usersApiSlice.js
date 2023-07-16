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
        })
    })
})

export const {
    useLogoutUserMutation,
    useRegisterUserMutation
} = usersApiSlice;