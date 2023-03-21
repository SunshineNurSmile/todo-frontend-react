import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  username: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = true;
      state.username = action.payload.username;
    },
    logOut: (state, _action) => {
      state.isLoggedIn = false;
      state.username = '';
    },
  },
});

export const { setIsLoggedIn, logOut } = authSlice.actions;

export const selectAuthState = (state) => state.auth;

export default authSlice.reducer;
