import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
  profileDetails: {},
  notifications: [],
  volunteeringDetails: [],
  recentActivities: [],
  recentTrophies: {},
  notes: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
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
      state.notifications = [...filteredNotificationList, updatedNotification];
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
      state.notes = [...state.notes, updatedNotes];
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
      state.notes = [...filteredNotes, updatedNotes];
    },
    updateExistingNoteFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.notes = [];
    },
    removeSelectedNote: (state, action) => {
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
  },
});

export const { actions: profileActions } = profileSlice;
export default profileSlice.reducer;
