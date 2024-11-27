import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: '',
  loading: false,
  statusOptions: [],
  selectedMaintenancePlan: {},
  selectedMaintenancePlanImage: '',
  itemsInMaintenancePlan: [],
};

const maintenancePlanItemSlice = createSlice({
  name: 'maintenancePlanItem',
  initialState,
  reducers: {
    getSelectedMaintenancePlan: (state) => {
      state.loading = false;
      state.error = '';
    },
    getSelectedMaintenancePlanSuccess: (state, action) => {
      state.loading = false;
      state.error = '';
      state.selectedMaintenancePlan = action.payload;
    },
    getSelectedMaintenancePlanFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.selectedMaintenancePlan = {};
    },
    getItemsInMaintenancePlan: (state) => {
      state.loading = true;
      state.error = '';
    },
    getItemsInMaintenancePlanSuccess: (state, action) => {
      state.itemsInMaintenancePlan = action.payload;
      state.loading = false;
      state.error = '';
    },
    getItemsInMaintenancePlanFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.itemsInMaintenancePlan = [];
    },
    addItemsInPlan: (state) => {
      state.loading = true;
      state.error = '';
    },
    addItemsInPlanSuccess: (state, action) => {
      state.itemsInMaintenancePlan = [...action.payload];
      state.loading = false;
      state.error = '';
    },
    addItemsInPlanFailure: (state) => {
      state.loading = false;
      state.error = '';
    },
    uploadImage: (state) => {
      state.error = '';
    },
    uploadImageSuccess: (state) => {
      state.loading = false;
      state.error = '';
    },
    uploadImageFailure: (state) => {
      state.loading = false;
      state.error = '';
    },
    getSelectedImage: (state) => {
      state.error = '';
    },
    getSelectedImageSuccess: (state, action) => {
      state.selectedMaintenancePlanImage = action.payload;
      state.loading = false;
      state.error = '';
    },
    getSelectedImageFailure: (state) => {
      state.loading = false;
      state.error = '';
    },
  },
});

export const { actions: maintenancePlanItemActions } = maintenancePlanItemSlice;
export default maintenancePlanItemSlice.reducer;
