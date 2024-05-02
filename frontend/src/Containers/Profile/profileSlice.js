import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
  notes: [],
  profiles: [],
  inventories: [],
  notifications: [],
  profileDetails: {},
  recentTrophies: {},
  recentActivities: [],
  volunteeringDetails: [],
  eventsSharedWithSelectProfile: [],
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
    getRecentActivitiesList: (state) => {
      state.loading = true;
      state.error = '';
      state.recentActivities = [];
    },
    getRecentActivitiesListSuccess: (state, action) => {
      state.recentActivities = action.payload;
      state.loading = false;
      state.error = '';
    },
    getRecentActivitiesListFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.recentActivities = [];
    },
    getRecentActivitiesTrophyList: (state) => {
      state.loading = true;
      state.error = '';
      state.recentTrophies = {};
    },
    getRecentActivitiesTrophyListSuccess: (state, action) => {
      state.recentTrophies = action.payload;
      state.loading = false;
      state.error = '';
    },
    getRecentActivitiesTrophyListFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.recentTrophies = {};
    },
    getProfileNotifications: (state) => {
      state.loading = true;
      state.error = '';
      state.notifications = [];
    },
    getProfileNotificationsSuccess: (state, action) => {
      state.loading = false;
      state.error = '';
      state.notifications = action.payload;
    },
    getProfileNotificationsFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.notifications = [];
    },
    updateProfileNotification: (state) => {
      state.loading = true;
      state.error = '';
    },
    updateProfileNotificationSuccess: (state, action) => {
      const updatedNotification = action.payload;
      const filteredNotificationList = [...state.notifications].filter((v) => {
        return v.id !== updatedNotification.id;
      });
      state.loading = false;
      state.error = '';
      state.notifications = [updatedNotification, ...filteredNotificationList];
    },
    updateProfileNotificationFailure: (state) => {
      state.loading = false;
      state.error = '';
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
    getVolunteeringDetails: (state) => {
      state.loading = true;
      state.error = '';
      state.volunteeringDetails = [];
    },
    getVolunteeringDetailsSuccess: (state, action) => {
      state.volunteeringDetails = action.payload;
      state.loading = false;
      state.error = '';
    },
    getVolunteeringDetailsFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.volunteeringDetails = [];
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
    getUserNotes: (state) => {
      state.loading = true;
      state.error = '';
      state.notes = [];
    },
    getUserNotesSuccess: (state, action) => {
      state.notes = action.payload;
      state.loading = false;
      state.error = '';
    },
    getUserNotesFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.notes = [];
    },
    addNewNote: (state) => {
      state.loading = true;
      state.error = '';
    },
    addNewNoteSuccess: (state, action) => {
      const updatedNotes = action.payload;
      state.loading = false;
      state.error = '';
      state.notes = [updatedNotes, ...state.notes];
    },
    addNewNoteFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.notes = [];
    },
    updateExistingNote: (state) => {
      state.loading = true;
      state.error = '';
    },
    updateExistingNoteSuccess: (state, action) => {
      const updatedNotes = action.payload;
      const filteredNotes = [...state.notes].filter((v) => {
        return v.noteID !== updatedNotes.noteID;
      });
      state.loading = false;
      state.error = '';
      state.notes = [updatedNotes, ...filteredNotes];
    },
    updateExistingNoteFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.notes = [];
    },
    removeSelectedNote: (state) => {
      state.loading = true;
      state.error = '';
    },
    removeSelectedNoteSuccess: (state, action) => {
      const updatedNotesID = action.payload;
      const filteredNotes = [...state.notes].filter((v) => {
        return v.noteID !== updatedNotesID;
      });
      state.loading = false;
      state.error = '';
      state.notes = [...filteredNotes];
    },
    removeSelectedNoteFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.notes = [];
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
    retrieveEventsSharedWithSelectProfile: (state) => {
      state.error = '';
      state.loading = true;
    },
    retrieveEventsSharedWithSelectProfileSuccess: (state, action) => {
      state.error = '';
      state.loading = false;
      state.eventsSharedWithSelectProfile = action.payload;
    },
    retrieveEventsSharedWithSelectProfileFailure: (state) => {
      state.error = '';
      state.loading = false;
      state.eventsSharedWithSelectProfile = [];
    },
    transferItemsToSelectedEvent: (state) => {
      state.error = '';
      state.loading = true;
    },
    transferItemsToSelectedEventSuccess: (state, action) => {
      state.error = '';
      state.loading = false;
      const updatedInventories = action.payload;
      const filteredStateInventories = state.inventories.filter((existingInventory) => {
        return !updatedInventories.some((updatedInventory) => updatedInventory.id === existingInventory.id);
      });
      state.inventories = [...updatedInventories, ...filteredStateInventories];
    },
    transferItemsToSelectedEventFailure: (state) => {
      state.error = '';
      state.loading = false;
      state.inventories = [];
    }
  },
});

export const { actions: profileActions } = profileSlice;
export default profileSlice.reducer;
