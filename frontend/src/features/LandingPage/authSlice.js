import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userID: '',
  appConfig: {},
  loading: false,
  isUserVerified: false, // only used for pwd reset
  retryCounts: 0,
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
    getUserVerification: (state) => {
      state.loading = true;
      state.error = '';
    },
    getUserVerificationSuccess: (state, action) => {
      const { valid, retry_attempt } = action.payload;
      state.loading = false;
      state.error = '';
      state.isUserVerified = valid;
      state.retryCounts = retry_attempt;
    },
    getUserVerificationFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.isUserVerified = false;
      state.retryCounts = 0;
    },
  },
});

export const { actions: authActions } = authSlice;

export default authSlice.reducer;
