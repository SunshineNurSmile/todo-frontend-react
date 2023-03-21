import apiSlice from '../../app/api/apiSlice';
import { setIsLoggedIn, logOut } from './authSlice';

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/user/login',
        method: 'POST',
        body: {
          ...credentials,
        },
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: '/user/create',
        method: 'POST',
        body: {
          ...credentials,
        },
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: '/user/logout',
        method: 'GET',
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOut());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.error(err);
        }
      },
    }),
    verify: builder.mutation({
      query: () => ({
        url: '/user/verify',
        method: 'GET',
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.valid) {
            dispatch(setIsLoggedIn({ username: data.username }));
          }
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSendLogoutMutation,
  useRegisterMutation,
  useVerifyMutation,
} = authApiSlice;
