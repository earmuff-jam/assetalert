import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: '',
  loading: false,
  categories: [],
  selectedCategory: {},
  itemsInCategory: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getCategories: (state) => {
      state.loading = true;
      state.error = '';
      state.categories = [];
    },
    getCategoriesSuccess: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.error = '';
    },
    getCategoriesFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.categories = [];
    },
    getCategory: (state) => {
      state.loading = true;
      state.error = '';
      state.selectedCategory = {};
    },
    getCategorySuccess: (state, action) => {
      state.selectedCategory = action.payload;
      state.loading = false;
      state.error = '';
    },
    getCategoryFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.selectedCategory = {};
    },
    getItemsForCategory: (state) => {
      state.loading = true;
      state.error = '';
      state.itemsInCategory = [];
    },
    getItemsForCategorySuccess: (state, action) => {
      state.itemsInCategory = action.payload;
      state.loading = false;
      state.error = '';
    },
    getItemsForCategoryFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.itemsInCategory = [];
    },
    createCategory: (state) => {
      state.loading = true;
      state.error = '';
    },
    createCategorySuccess: (state, action) => {
      const draftCategory = action.payload;
      state.categories = [...state.categories, draftCategory];
      state.loading = false;
      state.error = '';
    },
    createCategoryFailure: (state) => {
      state.loading = false;
      state.error = '';
    },
    updateCategory: (state) => {
      state.loading = true;
      state.error = '';
    },
    updateCategorySuccess: (state, action) => {
      const draftCategory = action.payload;
      const filteredCategories = [...state.categories].filter((v) => {
        return v.id !== draftCategory.id;
      });
      state.categories = [draftCategory, ...filteredCategories];
      // TODO: remove this after removing selected category workflow - https://github.com/earmuff-jam/mashed/issues/215
      state.selectedCategory = draftCategory;
      state.loading = false;
      state.error = '';
    },
    updateCategoryFailure: (state) => {
      state.loading = false;
      state.error = '';
    },
    removeCategory: (state) => {
      state.loading = true;
      state.error = '';
    },
    removeCategorySuccess: (state, action) => {
      const draftCategoryID = action.payload;
      state.categories = state.categories.filter((category) => category.id !== draftCategoryID);
      state.loading = false;
      state.error = '';
    },
    removeCategoryFailure: (state) => {
      state.loading = false;
      state.error = '';
    },
    addItemsInCategory: (state) => {
      state.loading = true;
      state.error = '';
    },
    addItemsInCategorySuccess: (state, action) => {
      state.itemsInCategory = [...action.payload];
      state.loading = false;
      state.error = '';
    },
    addItemsInCategoryFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.itemsInCategory = [];
    },
    download: (state) => {
      state.error = '';
    },
    downloadSuccess: (state, action) => {
      state.error = '';
      const rawData = action.payload;
      const formattedData = rawData.map((v) => {
        // eslint-disable-next-line no-unused-vars
        const { id, activity_id, created_by, updated_by, sharable_groups, status, ...rest } = v;
        return rest;
      });

      const ws = XLSX.utils.json_to_sheet(formattedData);
      const wsColsWidth = Object.values(formattedData[0]).map((v) => ({ wch: v.length > 10 ? v.length : 10 }));
      ws['!cols'] = wsColsWidth;
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, dayjs().format('YYYY-MM-DD'));
      XLSX.writeFile(wb, 'assetCategories.xlsx');
    },
    downloadFailure: (state) => {
      state.error = '';
    },
  },
});

export const { actions: categoryActions } = categorySlice;
export default categorySlice.reducer;
