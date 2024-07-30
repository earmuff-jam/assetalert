import { takeLatest, put, call } from 'redux-saga/effects';
import { REACT_APP_LOCALHOST_URL } from '../../util/Common';
import { eventActions } from './eventSlice';
import instance from '../../util/Instances';

const BASEURL = `${REACT_APP_LOCALHOST_URL}/api/v1`;


export function* fetchExpenseList(action) {
  try {
    const { eventID } = action.payload;
    const response = yield call(instance.get, `${BASEURL}/expenses/${eventID}`);
    yield put(eventActions.getExpenseListSuccess(response.data));
  } catch (e) {
    yield put(eventActions.getExpenseListFailure(e));
  }
}

export function* fetchStorageLocations() {
  try {
    const response = yield call(instance.get, `${BASEURL}/locations`);
    yield put(eventActions.getStorageLocationsSuccess(response.data));
  } catch (e) {
    yield put(eventActions.getStorageLocationsFailure(e));
  }
}

export function* createNewReportAgainstEvent(action) {
  try {
    const response = yield call(instance.post, `${BASEURL}/report`, { ...action.payload });
    yield put(eventActions.createNewReportAgainstEventSuccess(response.data));
  } catch (e) {
    yield put(eventActions.createNewReportAgainstEventFailure(e));
  }
}

export function* fetchReportForSelectedEvent(action) {
  try {
    const { eventID } = action.payload;
    const response = yield call(instance.get, `${BASEURL}/report/${eventID}`);
    yield put(eventActions.getReportsForSelectedEventSuccess(response.data));
  } catch (e) {
    yield put(eventActions.getReportsForSelectedEventFailure(e));
  }
}

export function* watchFetchExpenseList() {
  yield takeLatest(`event/getExpenseList`, fetchExpenseList);
}

export function* watchFetchStorageLocations() {
  yield takeLatest(`event/getStorageLocations`, fetchStorageLocations);
}

export function* watchCreateNewReportAgainstEvent() {
  yield takeLatest(`event/createNewReportAgainstEvent`, createNewReportAgainstEvent);
}

export function* watchFetchReportForSelectedEvent() {
  yield takeLatest(`event/getReportsForSelectedEvent`, fetchReportForSelectedEvent);
}

 
export default [
  watchFetchExpenseList,
  watchFetchStorageLocations,
  watchFetchReportForSelectedEvent,
  watchCreateNewReportAgainstEvent,
];
