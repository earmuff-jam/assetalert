import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
  inventory: {},
  inventories: [],
  storageLocations: [],
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
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
      state.inventory = { ...updatedItem };
      state.inventories = [updatedItem, ...filteredInventoriesList];
    },
    updateInventoryFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.inventories = [];
    },
    updateAssetCol: (state) => {
      state.loading = true;
      state.error = '';
    },
    updateAssetColSuccess: (state, action) => {
      const updatedItem = action.payload;
      const filteredInventoriesList = state.inventories.filter((v) => v.id !== updatedItem.id);
      state.loading = false;
      state.error = '';
      state.inventories = [updatedItem, ...filteredInventoriesList];
    },
    updateAssetColFailure: (state) => {
      state.loading = false;
      state.error = '';
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
    getStorageLocations: (state) => {
      state.loading = true;
      state.error = '';
    },
    getStorageLocationsSuccess: (state, action) => {
      state.loading = false;
      state.error = '';
      state.storageLocations = action.payload;
    },
    getStorageLocationsFailure: (state) => {
      state.loading = false;
      state.error = '';
    },
    retrieveSelectedImage: (state) => {
      state.error = '';
    },
    retrieveSelectedImageSuccess: (state, action) => {
      const updatedItem = { ...action.payload };
      const assetID = updatedItem.assetID;
      state.inventories = state.inventories.map((item) =>
        item.id === assetID ? { ...item, selectedImage: updatedItem.imageData } : item
      );
      state.loading = false;
      state.error = '';
    },
    retrieveSelectedImageFailure: (state) => {
      state.error = '';
    },
    createInventoryImage: (state) => {
      state.loading = true;
      state.error = '';
    },
    createInventoryImageSuccess: (state) => {
      state.loading = false;
      state.error = '';
    },
    createInventoryImageFailure: (state) => {
      state.loading = false;
      state.error = '';
    },
  },
});

export const { actions: inventoryActions } = inventorySlice;
export default inventorySlice.reducer;
