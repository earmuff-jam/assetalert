import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
  profiles: [],
  inventory: {},
  inventories: [],
  profileDetails: {},
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfileList: (state) => {
      state.loading = true;
      state.error = '';
      state.profiles = [];
    },
    getProfileListSuccess: (state, action) => {
      state.profiles = action.payload;
      state.loading = false;
      state.error = '';
    },
    getProfileListFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.profiles = [];
    },
    getProfileDetails: (state) => {
      state.loading = true;
      state.error = '';
      state.profileDetails = {};
    },
    getProfileDetailsSuccess: (state, action) => {
      state.profileDetails = action.payload;
      state.loading = false;
      state.error = '';
    },
    getProfileDetailsFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.profileDetails = {};
    },
    updateProfileDetails: (state) => {
      state.loading = true;
      state.error = '';
      state.profileDetails = {};
    },
    updateProfileDetailsSuccess: (state, action) => {
      state.profileDetails = action.payload;
      state.loading = false;
      state.error = '';
    },
    updateProfileDetailsFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.profileDetails = {};
    },
    updateProfileImage: (state) => {
      state.loading = true;
      state.error = '';
    },
    updateProfileImageSuccess: (state) => {
      state.loading = false;
      state.error = '';
    },
    updateProfileImageFailure: (state) => {
      state.loading = false;
      state.error = '';
    },
    getAllInventoriesForUser: (state) => {
      state.loading = true;
      state.error = '';
      state.inventories = [];
    },
    getAllInventoriesForUserSuccess: (state, action) => {
      state.inventories = action.payload;
      state.loading = false;
      state.error = '';
    },
    getAllInventoriesForUserFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.inventories = [];
    },
    getInvByID: (state) => {
      state.loading = true;
      state.error = '';
      state.inventory = {};
    },
    getInvByIDSuccess: (state, action) => {
      state.inventory = action.payload;
      state.loading = false;
      state.error = '';
    },
    getInvByIDFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.inventory = {};
    },
    addInventory: (state) => {
      state.loading = true;
      state.error = '';
    },
    addInventorySuccess: (state, action) => {
      const updatedValues = action.payload;
      state.loading = false;
      state.error = '';
      state.inventories = [updatedValues, ...state.inventories];
    },
    addInventoryFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.inventories = [];
    },
    addBulkInventory: (state) => {
      state.loading = true;
      state.error = '';
    },
    addBulkInventorySuccess: (state, action) => {
      const updatedValues = action.payload;
      state.loading = false;
      state.error = '';
      state.inventories = [...updatedValues, ...state.inventories];
    },
    addBulkInventoryFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.inventories = [];
    },
    updateInventory: (state) => {
      state.loading = true;
      state.error = '';
    },
    updateInventorySuccess: (state, action) => {
      const updatedItem = action.payload;
      const filteredInventoriesList = state.inventories.filter((v) => v.id !== updatedItem.id);
      state.loading = false;
      state.error = '';
      state.inventories = [updatedItem, ...filteredInventoriesList];
    },
    updateInventoryFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.inventories = [];
    },
    removeInventoryRows: (state) => {
      state.loading = true;
      state.error = '';
    },
    removeInventoryRowsSuccess: (state, action) => {
      const updatedInventoriesID = action.payload;
      const filteredInventories = state.inventories.filter((inventory) => {
        return !updatedInventoriesID.includes(inventory.id);
      });
      state.loading = false;
      state.error = '';
      state.inventories = [...filteredInventories];
    },
    removeInventoryRowsFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.inventories = [];
    },
  },
});

export const { actions: profileActions } = profileSlice;
export default profileSlice.reducer;
