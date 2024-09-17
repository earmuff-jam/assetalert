import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: '',
  loading: false,
  maintenancePlan: [],
  statusOptions: [],
  selectedMaintenancePlan: {},
  itemsInMaintenancePlan: [],
};

const maintenancePlanSlice = createSlice({
  name: 'maintenancePlan',
  initialState,
  reducers: {
    getPlans: (state) => {
      state.loading = true;
      state.error = '';
      state.maintenancePlan = [];
    },
    getPlansSuccess: (state, action) => {
      state.maintenancePlan = action.payload;
      state.loading = false;
      state.error = '';
    },
    getPlansFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.maintenancePlan = [];
    },
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
    getStatusOptions: (state) => {
      state.loading = true;
      state.error = '';
      state.statusOptions = [];
    },
    getStatusOptionsSuccess: (state, action) => {
      state.statusOptions = action.payload;
      state.loading = false;
      state.error = '';
    },
    getStatusOptionsFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.statusOptions = [];
    },
    createPlan: (state) => {
      state.loading = true;
      state.error = '';
    },
    createPlanSuccess: (state, action) => {
      const draftMaintenancePlan = action.payload;
      state.maintenancePlan = [draftMaintenancePlan, ...state.maintenancePlan];
      state.loading = false;
      state.error = '';
    },
    createPlanFailure: (state) => {
      state.loading = false;
      state.error = '';
    },
    updatePlan: (state) => {
      state.loading = true;
      state.error = '';
    },
    updatePlanSuccess: (state, action) => {
      const draftMaintenancePlan = action.payload;
      const filteredMaintenancePlan = [...state.maintenancePlan].filter((v) => {
        return v.id !== draftMaintenancePlan.id;
      });
      state.maintenancePlan = [draftMaintenancePlan, ...filteredMaintenancePlan];
      // TODO: remove this after removing selected maintenance workflow - https://github.com/earmuff-jam/mashed/issues/215
      state.selectedMaintenancePlan = draftMaintenancePlan;
      state.loading = false;
      state.error = '';
    },
    updatePlanFailure: (state) => {
      state.loading = false;
      state.error = '';
    },
    removePlan: (state) => {
      state.loading = true;
      state.error = '';
    },
    removePlanSuccess: (state, action) => {
      const draftMaintenancePlanID = action.payload;
      state.maintenancePlan = state.maintenancePlan.filter((category) => category.id !== draftMaintenancePlanID);
      state.loading = false;
      state.error = '';
    },
    removePlanFailure: (state) => {
      state.loading = false;
      state.error = '';
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
  },
});

export const { actions: maintenancePlanActions } = maintenancePlanSlice;
export default maintenancePlanSlice.reducer;
