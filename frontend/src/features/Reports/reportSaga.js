import { takeLatest, put, call } from 'redux-saga/effects';
import { REACT_APP_LOCALHOST_URL } from '../../util/Common';
import { reportActions } from './reportSlice';
import instance from '../../util/Instances';

const BASEURL = `${REACT_APP_LOCALHOST_URL}/api/v1`;

export function* fetchReports(action) {
  try {
    const USER_ID = localStorage.getItem('userID');
    const { since, includeOverdue } = action.payload;
    const params = new URLSearchParams();

    params.append('since', since);
    params.append('includeOverdue', includeOverdue);

    const response = yield call(instance.get, `${BASEURL}/reports/${USER_ID}?${params.toString()}`);
    yield put(reportActions.getReportsSuccess(response.data));
  } catch (e) {
    yield put(reportActions.getReportsFailure(e));
  }
}

export function* watchFetchReports() {
  yield takeLatest(`report/getReports`, fetchReports);
}

export default [watchFetchReports];
