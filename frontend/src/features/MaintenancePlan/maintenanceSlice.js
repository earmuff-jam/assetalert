import dayjs from 'dayjs';
import * as XLSX from 'xlsx';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: '',
  loading: false,
  maintenancePlan: [],
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
    download: (state) => {
      state.error = '';
    },
    downloadSuccess: (state, action) => {
      state.error = '';
      const rawData = action.payload;
      const formattedData = rawData.map((v) => {
        /* eslint-disable no-unused-vars */
        const {
          id,
          activity_id,
          created_by,
          updated_by,
          sharable_groups,
          maintenance_status,
          associated_image_url,
          location,
          ...rest
        } = v;
        return rest;
      });

      const ws = XLSX.utils.json_to_sheet(formattedData);
      const wsColsWidth = Object.values(formattedData[0]).map((v) => ({ wch: v.length > 10 ? v.length : 10 }));
      ws['!cols'] = wsColsWidth;
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, dayjs().format('YYYY-MM-DD'));
      XLSX.writeFile(wb, 'assetMaintenancePlans.xlsx');
    },
    downloadFailure: (state) => {
      state.error = '';
    },
  },
});

export const { actions: maintenancePlanActions } = maintenancePlanSlice;
export default maintenancePlanSlice.reducer;
