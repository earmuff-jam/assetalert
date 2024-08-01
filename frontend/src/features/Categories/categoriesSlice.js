import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: '',
  loading: false,
  categories: [],
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
      const formattedCategories = state.categories.filter((v) => v.id === draftCategory.id);
      state.categories = [...formattedCategories, draftCategory];
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
  },
});

export const { actions: categoryActions } = categorySlice;
export default categorySlice.reducer;
