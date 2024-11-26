import { call, put, takeLatest } from 'redux-saga/effects';

import instance from '../../utils/Instances';
import { maintenancePlanActions } from './maintenanceSlice';
import { REACT_APP_LOCALHOST_URL } from '../../utils/Common';

const DEFAULT_LIMIT = 10;
const MAINTENANCE_STATUS_OPTION_TYPE = 'maintenance';
const BASEURL = `${REACT_APP_LOCALHOST_URL}/api/v1`;

export function* getPlans(action) {
  try {
    const userID = localStorage.getItem('userID');
    const params = new URLSearchParams();
    params.append('id', userID);
    if (action.payload) {
      params.append('limit', action.payload);
    } else {
      params.append('limit', DEFAULT_LIMIT);
    }
    const response = yield call(instance.get, `${BASEURL}/maintenance-plans?${params.toString()}`);
    const data = Array.isArray(response.data) ? response.data : [];
    yield put(maintenancePlanActions.getPlansSuccess(data));
  } catch (e) {
    yield put(maintenancePlanActions.getPlansFailure(e));
  }
}

export function* getStatusOptions() {
  try {
    const userID = localStorage.getItem('userID');
    const params = new URLSearchParams();
    params.append('id', userID);
    params.append('type', MAINTENANCE_STATUS_OPTION_TYPE);
    const response = yield call(instance.get, `${BASEURL}/status/list?${params.toString()}`);
    yield put(maintenancePlanActions.getStatusOptionsSuccess(response.data));
  } catch (e) {
    yield put(maintenancePlanActions.getStatusOptionsFailure(e));
  }
}

export function* createPlan(action) {
  try {
    const userID = localStorage.getItem('userID');
    const response = yield call(instance.post, `${BASEURL}/plan`, { ...action.payload, created_by: userID });
    yield put(maintenancePlanActions.createPlanSuccess(response.data));
  } catch (e) {
    yield put(maintenancePlanActions.createPlanFailure(e));
  }
}

export function* updatePlan(action) {
  try {
    const { id } = action.payload;
    const userID = localStorage.getItem('userID');
    const response = yield call(instance.put, `${BASEURL}/plan/${id}`, { ...action.payload, updated_by: userID });
    yield put(maintenancePlanActions.updatePlanSuccess(response.data));
  } catch (e) {
    yield put(maintenancePlanActions.updatePlanFailure(e));
  }
}

export function* removePlan(action) {
  try {
    const response = yield call(instance.delete, `${BASEURL}/plan/${action.payload}`);
    yield put(maintenancePlanActions.removePlanSuccess(response.data));
  } catch (e) {
    yield put(maintenancePlanActions.removePlanFailure(e));
  }
}


export function* download() {
  try {
    const userID = localStorage.getItem('userID');
    const params = new URLSearchParams();
    params.append('id', userID);
    const response = yield call(instance.get, `${BASEURL}/maintenance-plans?${params.toString()}`);
    yield put(maintenancePlanActions.downloadSuccess(response.data));
  } catch (e) {
    yield put(maintenancePlanActions.downloadFailure(e));
  }
}

export function* watchGetPlanList() {
  yield takeLatest(`maintenancePlan/getPlans`, getPlans);
}

export function* watchGetStatusOptions() {
  yield takeLatest(`maintenancePlan/getStatusOptions`, getStatusOptions);
}

export function* watchCreatePlan() {
  yield takeLatest(`maintenancePlan/createPlan`, createPlan);
}

export function* watchUpdatePlan() {
  yield takeLatest(`maintenancePlan/updatePlan`, updatePlan);
}

export function* watchRemovePlan() {
  yield takeLatest(`maintenancePlan/removePlan`, removePlan);
}

export function* watchDownload() {
  yield takeLatest(`maintenancePlan/download`, download);
}


export default [
  watchGetPlanList,
  watchGetStatusOptions,
  watchCreatePlan,
  watchDownload,
  watchUpdatePlan,
  watchRemovePlan,
];
