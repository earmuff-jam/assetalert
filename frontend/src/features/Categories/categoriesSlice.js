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
    removeCategory: (state) => {
      state.loading = true;
      state.error = '';
      state.categories = [];
    },
    removeCategorySuccess: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.error = '';
    },
    removeCategoryFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.categories = [];
    },
  },
});

export const { actions: categoryActions } = categorySlice;
export default categorySlice.reducer;
