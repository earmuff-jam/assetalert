import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userID: '',
  appConfig: {},
  loading: false,
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getUserID: (state, action) => {
      state.loading = true;
      state.error = '';
      state.userID = action.payload;
    },
    getUserIDSuccess: (state, action) => {
      state.userID = action.payload;
      state.loading = false;
      state.error = '';
    },
    getUserIDFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'Invalid User';
      state.userID = {};
    },
    getSignup: (state) => {
      state.loading = true;
      state.error = '';
      state.userID = {};
    },
    getSignupSuccess: (state, action) => {
      state.userID = action.payload;
      state.loading = false;
      state.error = '';
    },
    getSignupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'Invalid User';
      state.userID = {};
    },
    getLogout: (state) => {
      state.loading = true;
      state.error = '';
    },
    getLogoutSuccess: (state) => {
      state.loading = false;
      state.error = '';
    },
    getLogoutFailure: (state) => {
      state.loading = false;
      state.error = '';
    },
  },
});

export const { actions: authActions } = authSlice;

export default authSlice.reducer;
