import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';
import { REACT_APP_LOCALHOST_URL } from '../../util/Common';
import { profileActions } from './profileSlice';
import instance from '../../util/Instances';

const BASEURL = `${REACT_APP_LOCALHOST_URL}/api/v1/profile`;

export function* fetchProfileList() {
  try {
    const response = yield call(instance.get, `${BASEURL}/list`);
    yield put(profileActions.getProfileListSuccess(response.data));
  } catch (e) {
    yield put(profileActions.getProfileListFailure(e));
  }
}

export function* fetchExistingUserDetails() {
  try {
    const USER_ID = localStorage.getItem('userID');
    console.log('here');
    const response = yield call(instance.get, `${BASEURL}/${USER_ID}`);
    yield put(profileActions.getProfileDetailsSuccess(response.data));
  } catch (e) {
    yield put(profileActions.getProfileDetailsFailure(e));
  }
}

export function* updateExistingUserDetails(action) {
  try {
    const USER_ID = localStorage.getItem('userID');
    const { formattedData } = action.payload;
    console.log(formattedData);
    const response = yield call(instance.put, `${BASEURL}/${USER_ID}`, {
      id: USER_ID,
      username: formattedData.username,
      full_name: formattedData.full_name,
      email_address: formattedData.email_address,
      phone_number: formattedData.phone_number,
      about_me: formattedData.about_me,
    });
    yield put(profileActions.getProfileDetailsSuccess(response.data));
  } catch (e) {
    yield put(profileActions.getProfileDetailsFailure(e));
  }
}

export function* fetchUpdateProfileImage(action) {
  try {
    const { selectedImage, userID } = action.payload;
    const formData = new FormData();
    formData.append('avatarSrc', selectedImage);
    const response = yield call(instance.post, `${BASEURL}/${userID}/updateAvatar`, formData);
    yield put(profileActions.updateProfileImageSuccess(response.data));
  } catch (e) {
    yield put(profileActions.updateProfileImageFailure(e));
  }
}

/**
 * Inventories related api calls
 */

export function* fetchAllInventoriesForUser() {
  try {
    const USER_ID = localStorage.getItem('userID');
    const response = yield call(instance.get, `${BASEURL}/${USER_ID}/inventories`);
    yield put(profileActions.getAllInventoriesForUserSuccess(response.data || {}));
  } catch (e) {
    yield put(profileActions.getAllInventoriesForUserFailure(e));
  }
}

export function* fetchInvByID({ payload }) {
  try {
    const USER_ID = localStorage.getItem('userID');
    const response = yield call(instance.get, `${BASEURL}/${USER_ID}/inventories/${payload}`);
    yield put(profileActions.getInvByIDSuccess(response.data || []));
  } catch (e) {
    yield put(profileActions.getInvByIDFailure(e));
  }
}

export function* fetchAddNewInventory(action) {
  try {
    const USER_ID = localStorage.getItem('userID');
    const response = yield call(instance.post, `${BASEURL}/${USER_ID}/inventories`, { ...action.payload });
    yield put(profileActions.addInventorySuccess(response.data));
  } catch (e) {
    yield put(profileActions.addInventoryFailure(e));
  }
}

export function* fetchAddBulkInventory(action) {
  try {
    const USER_ID = localStorage.getItem('userID');
    const response = yield call(instance.post, `${BASEURL}/${USER_ID}/inventories/bulk`, { ...action.payload });
    yield put(profileActions.addBulkInventorySuccess(response.data));
  } catch (e) {
    yield put(profileActions.addBulkInventoryFailure(e));
  }
}

export function* fetchUpdateExistingInventoryDetails(action) {
  try {
    const USER_ID = localStorage.getItem('userID');
    const response = yield call(instance.put, `${BASEURL}/${USER_ID}/inventories`, { ...action.payload });
    yield put(profileActions.updateInventorySuccess(response.data));
  } catch (e) {
    yield put(profileActions.updateInventoryFailure(e));
  }
}

export function* fetchRemoveInventoryRows(action) {
  try {
    const USER_ID = localStorage.getItem('userID');
    const response = yield call(instance.post, `${BASEURL}/${USER_ID}/inventories/prune`, { ...action.payload });
    yield put(profileActions.removeInventoryRowsSuccess(response.data));
  } catch (e) {
    yield put(profileActions.removeInventoryRowsFailure(e));
  }
}

/********************************
 * WATCHER FUNCTIONS BELOW HERE
 ********************************/

export function* watchFetchProfileList() {
  yield takeLatest(`profile/getProfileList`, fetchProfileList);
}

export function* watchFetchExistingUserDetails() {
  yield takeLatest(`profile/getProfileDetails`, fetchExistingUserDetails);
}

export function* watchUpdateExistingUserDetails() {
  yield takeLatest(`profile/updateProfileDetails`, updateExistingUserDetails);
}

export function* watchFetchUpdateProfileImage() {
  yield takeEvery(`profile/updateProfileImage`, fetchUpdateProfileImage);
}

export function* watchFetchAllInventoriesForUser() {
  yield takeLatest(`profile/getAllInventoriesForUser`, fetchAllInventoriesForUser);
}

export function* watchFetchInvByID() {
  yield takeLatest(`profile/getInvByID`, fetchInvByID);
}

export function* watchFetchAddNewInventory() {
  yield takeLatest(`profile/addInventory`, fetchAddNewInventory);
}

export function* watchFetchAddBulkInventory() {
  yield takeLatest(`profile/addBulkInventory`, fetchAddBulkInventory);
}

export function* watchUpdateExistingInventoryDetails() {
  yield takeLatest(`profile/updateInventory`, fetchUpdateExistingInventoryDetails);
}

export function* watchFetchRemoveInventoryRows() {
  yield takeLatest(`profile/removeInventoryRows`, fetchRemoveInventoryRows);
}

export default [
  watchFetchProfileList,
  watchFetchInvByID,
  watchFetchExistingUserDetails,
  watchFetchAddBulkInventory,
  watchFetchRemoveInventoryRows,
  watchFetchAllInventoriesForUser,
  watchUpdateExistingUserDetails,
  watchFetchUpdateProfileImage,
  watchUpdateExistingInventoryDetails,
];
