import { takeLatest, put, call } from 'redux-saga/effects';
import { REACT_APP_LOCALHOST_URL } from '../../util/Common';
import { notesActions } from './notesSlice';
import instance from '../../util/Instances';

const BASEURL = `${REACT_APP_LOCALHOST_URL}/api/v1/profile`;

export function* fetchUserNotes() {
  try {
    const USER_ID = localStorage.getItem('userID');
    const response = yield call(instance.get, `${BASEURL}/${USER_ID}/notes`);
    yield put(notesActions.getUserNotesSuccess(response.data));
  } catch (e) {
    yield put(notesActions.getUserNotesFailure(e));
  }
}

export function* fetchAddNewNote(action) {
  try {
    const USER_ID = localStorage.getItem('userID');
    const response = yield call(instance.post, `${BASEURL}/${USER_ID}/notes`, { ...action.payload });
    yield put(notesActions.addNewNoteSuccess(response.data));
  } catch (e) {
    yield put(notesActions.addNewNoteFailure(e));
  }
}

export function* fetchUpdateExistingNote(action) {
  try {
    const USER_ID = localStorage.getItem('userID');
    const response = yield call(instance.put, `${BASEURL}/${USER_ID}/notes`, { ...action.payload });
    yield put(notesActions.updateExistingNoteSuccess(response.data));
  } catch (e) {
    yield put(notesActions.updateExistingNoteFailure(e));
  }
}

export function* fetchRemoveSelectedNote(action) {
  try {
    const USER_ID = localStorage.getItem('userID');
    const { noteID } = action.payload;
    const response = yield call(instance.delete, `${BASEURL}/${USER_ID}/notes/${noteID}`);
    yield put(notesActions.removeSelectedNoteSuccess(response.data));
  } catch (e) {
    yield put(notesActions.removeSelectedNoteFailure(e));
  }
}

export function* watchGetUserNotes() {
  yield takeLatest(`notes/getUserNotes`, fetchUserNotes);
}

export function* watchFetchAddNewNote() {
  yield takeLatest(`notes/addNewNote`, fetchAddNewNote);
}

export function* watchFetchUpdateExistingNote() {
  yield takeLatest(`notes/updateExistingNote`, fetchUpdateExistingNote);
}

export function* watchFetchRemoveSelectedNote() {
  yield takeLatest(`notes/removeSelectedNote`, fetchRemoveSelectedNote);
}

export default [
  watchGetUserNotes,
  watchFetchAddNewNote,
  watchFetchUpdateExistingNote,
  watchFetchRemoveSelectedNote,
];
