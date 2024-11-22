import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
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
    downloadReports: (state) => {
      state.error = '';
    },
    downloadReportsSuccess: (state, action) => {
      state.error = '';
      const { reports, inventories } = action.payload;
      const formattedReports = reports.map((v) => {
        /* eslint-disable no-unused-vars */
        const {
          id,
          created_at,
          created_by,
          creator_name,
          selected_time_range,
          updated_at,
          updated_by,
          updater_name,
          sharable_groups,
          ...rest
        } = v;
        return rest;
      });

      const worksheetOne = XLSX.utils.json_to_sheet(formattedReports);
      const worksheetOneColsWidth = Object.values(formattedReports[0]).map((v) => ({
        wch: v.length > 10 ? v.length : 10,
      }));
      worksheetOne['!cols'] = worksheetOneColsWidth;
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, worksheetOne, `${dayjs().format('YYYY-MM-DD')}-overview`);

      const formattedInventories = inventories.map((v) => {
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
          status,
          storage_location_id,
          ...rest
        } = v;
        return rest;
      });
      const worksheetTwo = XLSX.utils.json_to_sheet(formattedInventories);
      const worksheetTwoColsWidth = Object.values(formattedReports[0]).map((v) => ({
        wch: v.length > 10 ? v.length : 10,
      }));
      worksheetTwoColsWidth['!cols'] = worksheetTwoColsWidth;
      XLSX.utils.book_append_sheet(wb, worksheetTwo, `${dayjs().format('YYYY-MM-DD')}-assets`);

      XLSX.writeFile(wb, 'reports.xlsx');
    },
    downloadReportsFailure: (state) => {
      state.error = '';
    },
  },
});

export const { actions: reportActions } = reportSlice;
export default reportSlice.reducer;
