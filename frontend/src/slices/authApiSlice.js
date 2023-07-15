import { AUTH_URL } from "../utils/constant";
import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        authUser: builder.mutation({
            query: (userInfo) => ({
                url: `${AUTH_URL}/login`,
                method: 'POST',
                body: userInfo
            })
        }),
        getUserProfile: builder.query({
            query: () => ({
                url: `${AUTH_URL}/profile`
            }),
            keepUnusedDataFor: 30
        })
    }),
});

export const { 
    useAuthUser,
    useGetUserProfile
} = authApiSlice;