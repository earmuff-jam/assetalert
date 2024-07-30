import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: '',
  loading: false,
  reports: [],
  expenses: [],
  storageLocations: [],
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    getReportsForSelectedEvent: (state) => {
      state.loading = true;
      state.error = '';
      state.reports = [];
    },
    getReportsForSelectedEventSuccess: (state, action) => {
      state.reports = action.payload;
      state.loading = false;
      state.error = '';
    },
    getReportsForSelectedEventFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.reports = [];
    },
    createNewReportAgainstEvent: (state) => {
      state.loading = true;
      state.error = '';
    },
    createNewReportAgainstEventSuccess: (state, action) => {
      state.reports = [...state.reports, action.payload];
      state.loading = false;
      state.error = '';
    },
    createNewReportAgainstEventFailure: (state) => {
      state.loading = false;
      state.error = '';
    },
    getExpenseList: (state) => {
      state.loading = true;
      state.error = '';
      state.expenses = [];
    },
    getExpenseListSuccess: (state, action) => {
      state.expenses = action.payload;
      state.loading = false;
      state.error = '';
    },
    getExpenseListFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.expenses = [];
    },
    addExpenseList: (state) => {
      state.expenses = [];
      state.error = '';
      state.loading = true;
    },
    addExpenseListSuccess: (state, action) => {
      state.expenses = [...state.expenses, action.payload];
      state.loading = false;
      state.error = '';
    },
    addExpenseListFailure: (state) => {
      state.loading = false;
      state.error = '';
    },
    getStorageLocations: (state) => {
      state.loading = true;
      state.error = '';
      state.storageLocations = [];
    },
    getStorageLocationsSuccess: (state, action) => {
      state.storageLocations = action.payload;
      state.loading = false;
      state.error = '';
    },
    getStorageLocationsFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.storageLocations = [];
    },
  },
});

export const { actions: eventActions } = eventSlice;
export default eventSlice.reducer;
