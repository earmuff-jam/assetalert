import { call, put, takeLatest } from 'redux-saga/effects';

import instance from '@utils/Instances';
import { Base64ToUint8Array } from '@common/utils';
import { REACT_APP_LOCALHOST_URL } from '@utils/Common';
import { maintenancePlanActions } from '@features/MaintenancePlan/maintenanceSlice';

const DEFAULT_LIMIT = 10;
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

    if (Array.isArray(data)) {
      data.map((item) => {
        if (item.image) {
          try {
            // decode the image url into a valid data
            const binaryData = Base64ToUint8Array(item.image);
            const blob = new Blob([binaryData], { type: 'image/png' });
            item.image = URL.createObjectURL(blob);
          } catch (error) {
            console.debug(error);
          }
        }
      });
    }

    yield put(maintenancePlanActions.getPlansSuccess(data));
  } catch (e) {
    yield put(maintenancePlanActions.getPlansFailure(e));
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
    const currentMaintenancePlan = { ...action.payload };
    const draftMaintenancePlan = Object.assign({}, { ...currentMaintenancePlan });
    if (draftMaintenancePlan?.image) {
      delete draftMaintenancePlan['image'];
    }
    const response = yield call(instance.put, `${BASEURL}/plan/${id}`, { ...draftMaintenancePlan, updated_by: userID });
    yield put(
      maintenancePlanActions.updatePlanSuccess({ ...response.data, image: currentMaintenancePlan?.image || '' })
    );
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

export default [watchGetPlanList, watchCreatePlan, watchUpdatePlan, watchDownload, watchRemovePlan];
