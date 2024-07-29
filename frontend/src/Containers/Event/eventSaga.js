import { takeLatest, put, call } from 'redux-saga/effects';
import { REACT_APP_LOCALHOST_URL } from '../../util/Common';

import { eventActions } from './eventSlice';
import instance from '../../util/Instances';

const BASEURL = `${REACT_APP_LOCALHOST_URL}/api/v1`;

export function* fetchEvent(action) {
  try {
    const { eventID } = action.payload;
    const response = yield call(instance.get, `${BASEURL}/event/${eventID}`);
    yield put(eventActions.getSelectedEventSuccess(response.data));
  } catch (e) {
    yield put(eventActions.getSelectedEventFailure(e));
  }
}

export function* fetchCollaboratorListForSelectedEvent(action) {
  try {
    const { eventID } = action.payload;
    const response = yield call(instance.get, `${BASEURL}/event/${eventID}/collaborators`);
    yield put(eventActions.getCollaboratorListForSelectedEventSuccess(response.data));
  } catch (e) {
    yield put(eventActions.getCollaboratorListForSelectedEventFailure(e));
  }
}

export function* fetchCategoryList() {
  try {
    const response = yield call(instance.get, `${BASEURL}/categories`);
    yield put(eventActions.getCategoryListSuccess(response.data));
  } catch (e) {
    yield put(eventActions.getCategoryListFailure(e));
  }
}

export function* addItem(action) {
  try {
    const response = yield call(instance.post, `${BASEURL}/item`, { ...action.payload });
    yield put(eventActions.addItemSuccess(response.data));
  } catch (e) {
    yield put(eventActions.addItemFailure(e));
  }
}

export function* updateEventImage(action) {
  try {
    const { selectedImage, eventID } = action.payload;
    const formData = new FormData();
    formData.append('eventSrc', selectedImage);
    const response = yield call(instance.post, `${BASEURL}/event/${eventID}/updateAvatar`, formData);
    yield put(eventActions.updateEventImageSuccess(response.data));
  } catch (e) {
    yield put(eventActions.updateEventImageFailure(e));
  }
}

export function* fetchItemList(action) {
  try {
    const { eventID } = action.payload;
    const response = yield call(instance.get, `${BASEURL}/items/${eventID}`);
    yield put(eventActions.getItemListSuccess(response.data));
  } catch (e) {
    yield put(eventActions.getItemListFailure(e));
  }
}

export function* fetchExpenseList(action) {
  try {
    const { eventID } = action.payload;
    const response = yield call(instance.get, `${BASEURL}/expenses/${eventID}`);
    yield put(eventActions.getExpenseListSuccess(response.data));
  } catch (e) {
    yield put(eventActions.getExpenseListFailure(e));
  }
}

export function* fetchUpdateItemDetails(action) {
  try {
    const { eventID } = action.payload;
    const response = yield call(instance.put, `${BASEURL}/items/${eventID}`, { ...action.payload });
    yield put(eventActions.updateItemDetailsSuccess(response.data));
  } catch (e) {
    yield put(eventActions.updateItemDetailsFailure(e));
  }
}

export function* addExpense(action) {
  try {
    const { postFormattedData } = action.payload;
    const response = yield call(instance.post, `${BASEURL}/expenses`, { ...postFormattedData });
    yield put(eventActions.addExpenseListSuccess(response.data));
  } catch (e) {
    console.log('wat happened - ', e);
    yield put(eventActions.addExpenseListFailure(e));
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

export function* fetchAllVolunteeringHours(action) {
  try {
    const { eventID } = action.payload;
    const response = yield call(instance.get, `${BASEURL}/volunteering/${eventID}`);
    yield put(eventActions.getVolunteeringActivitiesSuccess(response.data));
  } catch (e) {
    yield put(eventActions.getVolunteeringActivitiesFailure(e));
  }
}

export function* addVolunteeringHours(action) {
  try {
    const response = yield call(instance.post, `${BASEURL}/volunteering`, { ...action.payload });
    yield put(eventActions.addVolunteeringHoursSuccess(response.data));
  } catch (e) {
    yield put(eventActions.addVolunteeringHoursFailure(e));
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

export function* fetchAllInventoriesAssociatedWithEvent(action) {
  try {
    const { eventID } = action.payload;
    const response = yield call(instance.get, `${BASEURL}/profile/${eventID}/associated-inventories`);
    yield put(eventActions.getAllInventoriesAssociatedWithEventSuccess(response.data));
  } catch (e) {
    yield put(eventActions.getAllInventoriesAssociatedWithEventFailure(e));
  }
}

export function* watchFetchEvent() {
  yield takeLatest(`event/getSelectedEvent`, fetchEvent);
}

export function* watchAddItem() {
  yield takeLatest(`event/addItem`, addItem);
}

export function* watchFetchCollaboratorListForSelectedEvent() {
  yield takeLatest(`event/getCollaboratorListForSelectedEvent`, fetchCollaboratorListForSelectedEvent);
}

export function* watchGetCategoryList() {
  yield takeLatest(`event/getCategoryList`, fetchCategoryList);
}

export function* watchFetchExpenseList() {
  yield takeLatest(`event/getExpenseList`, fetchExpenseList);
}

export function* watchUpdateExpenseList() {
  yield takeLatest(`event/addExpenseList`, addExpense);
}

export function* watchFetchItemList() {
  yield takeLatest(`event/getItemList`, fetchItemList);
}

export function* watchUpdateItemDetails() {
  yield takeLatest(`event/updateItemDetails`, fetchUpdateItemDetails);
}

export function* watchUpdateEventImage() {
  yield takeLatest(`event/updateEventImage`, updateEventImage);
}

export function* watchFetchStorageLocations() {
  yield takeLatest(`event/getStorageLocations`, fetchStorageLocations);
}

export function* watchFetchAllVolunteeringHours() {
  yield takeLatest(`event/getVolunteeringActivities`, fetchAllVolunteeringHours);
}

export function* watchAddVolunteeringHours() {
  yield takeLatest(`event/addVolunteeringHours`, addVolunteeringHours);
}

export function* watchCreateNewReportAgainstEvent() {
  yield takeLatest(`event/createNewReportAgainstEvent`, createNewReportAgainstEvent);
}

export function* watchFetchReportForSelectedEvent() {
  yield takeLatest(`event/getReportsForSelectedEvent`, fetchReportForSelectedEvent);
}

export function* watchGetAllInventoriesAssociatedWithEvent() {
  yield takeLatest(`event/getAllInventoriesAssociatedWithEvent`, fetchAllInventoriesAssociatedWithEvent);
}

 
export default [
  watchAddItem,
  watchFetchEvent,
  watchFetchExpenseList,
  watchUpdateExpenseList,
  watchGetCategoryList,
  watchFetchItemList,
  watchUpdateEventImage,
  watchUpdateItemDetails,
  watchAddVolunteeringHours,
  watchUpdateEventImage,
  watchFetchStorageLocations,
  watchFetchAllVolunteeringHours,
  watchFetchReportForSelectedEvent,
  watchCreateNewReportAgainstEvent,
  watchGetAllInventoriesAssociatedWithEvent,
  watchFetchCollaboratorListForSelectedEvent,
];
