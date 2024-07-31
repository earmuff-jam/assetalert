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
      state.notes = [];
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
  },
});

export const { actions: notesActions } = notesSlice;
export default notesSlice.reducer;
