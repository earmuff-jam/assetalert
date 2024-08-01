import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
  notes: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    getNotes: (state) => {
      state.loading = true;
      state.error = '';
      state.notes = [];
    },
    getNotesSuccess: (state, action) => {
      state.notes = action.payload;
      state.loading = false;
      state.error = '';
    },
    getNotesFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.notes = [];
    },
    createNote: (state) => {
      state.loading = true;
      state.error = '';
    },
    createNoteSuccess: (state, action) => {
      const updatedNotes = action.payload;
      state.loading = false;
      state.error = '';
      state.notes = [updatedNotes, ...state.notes];
    },
    createNoteFailure: (state) => {
      state.loading = false;
      state.error = '';
    },
    updateNote: (state) => {
      state.loading = true;
      state.error = '';
    },
    updateNoteSuccess: (state, action) => {
      const updatedNotes = action.payload;
      const filteredNotes = [...state.notes].filter((v) => {
        return v.noteID !== updatedNotes.noteID;
      });
      state.loading = false;
      state.error = '';
      state.notes = [updatedNotes, ...filteredNotes];
    },
    updateNoteFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.notes = [];
    },
    removeNote: (state) => {
      state.loading = true;
      state.error = '';
    },
    removeNoteSuccess: (state, action) => {
      const updatedNotesID = action.payload;
      const filteredNotes = [...state.notes].filter((v) => {
        return v.noteID !== updatedNotesID;
      });
      state.loading = false;
      state.error = '';
      state.notes = [...filteredNotes];
    },
    removeNoteFailure: (state) => {
      state.loading = false;
      state.error = '';
      state.notes = [];
    },
  },
});

export const { actions: notesActions } = notesSlice;
export default notesSlice.reducer;
