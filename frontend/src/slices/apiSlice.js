import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils/constant';

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Product', 'Order', 'User', 'Address', 'Review'],
    endpoints: (builder) => ({})
})