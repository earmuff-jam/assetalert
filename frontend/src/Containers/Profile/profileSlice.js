import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
  profileDetails: {},
  notifications: [],
  volunteeringDetails: [],
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
    updateProfileImageSuccess: (state, action) => {
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
  },
});

export const { actions: profileActions } = profileSlice;
export default profileSlice.reducer;
