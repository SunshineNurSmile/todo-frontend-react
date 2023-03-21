import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000/api',
  credentials: 'include',
});

const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Todo'],
  endpoints: (builder) => ({}),
});

export default apiSlice;
