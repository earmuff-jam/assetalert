import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: '',
  loading: false,
  assetSummary: [],
};

const assetSummarySlice = createSlice({
  name: 'assetSummary',
  initialState,
  reducers: {
    getAssetSummary: (state) => {
      state.loading = true;
      state.error = '';
      state.assetSummary = [];
    },
    getAssetSummarySuccess: (state, action) => {
      state.assetSummary = action.payload;
      state.loading = false;
      state.error = '';
    },
    getAssetSummaryFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.assetSummary = [];
    },
  },
});

export const { actions: assetSummaryActions } = assetSummarySlice;
export default assetSummarySlice.reducer;
