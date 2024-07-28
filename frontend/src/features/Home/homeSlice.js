import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  causeList: [],
  projectTypes: [],
  allStatesUS: [],
  username: '',
  loading: false,
  error: '',
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    getEvents: (state) => {
      state.loading = true;
      state.error = '';
      state.events = [];
    },
    getEventsSuccess: (state, action) => {
      state.events = action.payload;
      state.loading = false;
      state.error = '';
    },
    getEventsFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.events = [];
    },
    createEvent: (state) => {
      state.loading = true;
      state.error = '';
    },
    createEventSuccess: (state, action) => {
      state.events = [...state.events, action.payload];
      state.loading = false;
      state.error = '';
    },
    createEventFailure: (state) => {
      state.loading = false;
      state.error = '';
    },
    updateEvent: (state) => {
      state.loading = true;
      state.error = '';
    },
    updateEventSuccess: (state, action) => {
      const draftEvent = action.payload;
      state.events = [...state.events.filter((ev) => ev.id !== draftEvent.id), draftEvent];
      state.loading = false;
      state.error = '';
    },
    updateEventFailure: (state) => {
      state.loading = false;
      state.error = '';
    },
    getCauseList: (state) => {
      state.loading = true;
      state.error = '';
      state.causeList = [];
    },
    getCauseListSuccess: (state, action) => {
      state.causeList = action.payload;
      state.loading = false;
      state.error = '';
    },
    getCauseListFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.causeList = [];
    },
    getProjectTypes: (state) => {
      state.loading = true;
      state.error = '';
      state.projectTypes = [];
    },
    getProjectTypesSuccess: (state, action) => {
      state.projectTypes = action.payload;
      state.loading = false;
      state.error = '';
    },
    getProjectTypesFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.projectTypes = [];
    },
    getAllStatesUS: (state) => {
      state.loading = true;
      state.error = '';
      state.allStatesUS = [];
    },
    getAllStatesUSSuccess: (state, action) => {
      state.allStatesUS = action.payload;
      state.loading = false;
      state.error = '';
    },
    getAllStatesUSFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.allStatesUS = [];
    },
    getVolunteeringActivities: (state) => {
      state.loading = true;
      state.error = '';
      state.volunteeringActivities = {};
    },
    getVolunteeringActivitiesSuccess: (state, action) => {
      state.volunteeringActivities = action.payload;
      state.loading = false;
      state.error = '';
    },
    getVolunteeringActivitiesFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.volunteeringActivities = {};
    },
  },
});

export const { actions: homeActions } = homeSlice;
export default homeSlice.reducer;
