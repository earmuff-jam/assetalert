import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: '',
  loading: false,
  selectedCategory: {},
  selectedCategoryImage: '',
  itemsInCategory: [],
};

const categoryItemDetailsSlice = createSlice({
  name: 'categoryItemDetails',
  initialState,
  reducers: {
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
      state.selectedCategoryImage = action.payload;
      state.loading = false;
      state.error = '';
    },
    getSelectedImageFailure: (state) => {
      state.loading = false;
      state.error = '';
    },
  },
});

export const { actions: categoryItemDetailsActions } = categoryItemDetailsSlice;
export default categoryItemDetailsSlice.reducer;
