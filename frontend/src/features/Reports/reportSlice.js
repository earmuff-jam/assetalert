import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
  reports: [],
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    getReports: (state) => {
      state.loading = true;
      state.error = '';
    },
    getReportsSuccess: (state, action) => {
      state.reports = action.payload;
      state.loading = false;
      state.error = '';
    },
    getReportsFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.reports = [];
    },
  },
});

export const { actions: reportActions } = reportSlice;
export default reportSlice.reducer;
