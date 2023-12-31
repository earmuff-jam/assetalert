import { produce } from 'immer';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedEvent: {},
  volunteeringActivities: [],
  storageLocations: [],
  items: [],
  reports: [],
  loading: false,
  error: '',
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    getSelectedEvent: (state) => {
      state.loading = true;
      state.error = '';
      state.selectedEvent = {};
    },
    getSelectedEventSuccess: (state, action) => {
      state.selectedEvent = action.payload;
      state.loading = false;
      state.error = '';
    },
    getSelectedEventFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.selectedEvent = {};
    },
    getReportsForSelectedEvent: (state) => {
      state.loading = true;
      state.error = '';
      state.reports = [];
    },
    getReportsForSelectedEventSuccess: (state, action) => {
      state.reports = action.payload;
      state.loading = false;
      state.error = '';
    },
    getReportsForSelectedEventFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.reports = [];
    },
    updateItemDetails: (state) => {
      state.loading = true;
      state.error = '';
    },
    updateItemDetailsSuccess: (state, action) => {
      const updatedItem = action.payload;
      const filterdItemList = state.items.filter((v) => v.id !== updatedItem.id);
      state.loading = false;
      state.error = '';
      state.items = [...filterdItemList, updatedItem];
    },
    updateItemDetailsFailure: (state) => {
      state.loading = false;
      state.error = '';
    },
    updateEventImage: (state) => {
      state.loading = true;
      state.error = '';
    },
    updateEventImageSuccess: (state, action) => {
      const { image_url } = action.payload;
      return produce(state, (draftState) => {
        draftState.loading = false;
        draftState.error = '';
        draftState.selectedEvent.image_url = image_url;
      });
    },
    updateEventImageFailure: (state) => {
      state.loading = false;
      state.error = '';
    },
    getVolunteeringActivities: (state) => {
      state.loading = true;
      state.error = '';
      state.volunteeringActivities = [];
    },
    getVolunteeringActivitiesSuccess: (state, action) => {
      state.volunteeringActivities = action.payload;
      state.loading = false;
      state.error = '';
    },
    getVolunteeringActivitiesFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.volunteeringActivities = [];
    },
    addVolunteeringHours: (state) => {
      state.loading = true;
      state.error = '';
    },
    addVolunteeringHoursSuccess: (state, action) => {
      state.volunteeringActivities = [...state.volunteeringActivities, action.payload];
      state.loading = false;
      state.error = '';
    },
    addVolunteeringHoursFailure: (state) => {
      state.loading = false;
      state.error = '';
    },
    createNewReportAgainstEvent: (state) => {
      state.loading = true;
      state.error = '';
    },
    createNewReportAgainstEventSuccess: (state, action) => {
      state.reports = [...state.reports, action.payload];
      state.loading = false;
      state.error = '';
    },
    createNewReportAgainstEventFailure: (state) => {
      state.loading = false;
      state.error = '';
    },
    getItemList: (state) => {
      state.loading = true;
      state.error = '';
      state.items = [];
    },
    getItemListSuccess: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = '';
    },
    getItemListFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.items = [];
    },
    addItem: (state) => {
      state.loading = true;
      state.error = '';
    },
    addItemSuccess: (state, action) => {
      state.items = [...state.items, action.payload];
      state.loading = false;
      state.error = '';
    },
    addItemFailure: (state) => {
      state.loading = false;
      state.error = '';
    },
    getStorageLocations: (state) => {
      state.loading = true;
      state.error = '';
      state.storageLocations = [];
    },
    getStorageLocationsSuccess: (state, action) => {
      state.storageLocations = action.payload;
      state.loading = false;
      state.error = '';
    },
    getStorageLocationsFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.storageLocations = [];
    },
    // flushUpdate fn is used to only update the reducer
    // no saga action is involved
    flushUpdate: (state, action) => {
      const { attendees, sharable_groups, updated_by } = action.payload;
      state.selectedEvent = {
        ...state.selectedEvent,
        attendees,
        sharable_groups,
        updated_by,
      };
    },
  },
});

export const { actions: eventActions } = eventSlice;
export default eventSlice.reducer;
