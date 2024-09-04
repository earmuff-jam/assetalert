import axios from 'axios';
import { authActions } from './authSlice';

import { takeLatest, put, call } from 'redux-saga/effects';
import { REACT_APP_LOCALHOST_URL } from '../../util/Common';

const BASEURL = `${REACT_APP_LOCALHOST_URL}/api/v1`;

export function* fetchUserLogin(action) {
  try {
    const response = yield call(fetch, `${BASEURL}/signin`, {
      method: 'POST',
      body: JSON.stringify(action.payload),
      headers: {
        Accept: 'application/json',
      },
      credentials: 'include', // Equivalent to withCredentials: true
    });

    if (!response.ok) {
      throw new Error(`Failed to find user`);
    }

    // Get the "Authorization2" header from the response
    const authorization2Header = response.headers.get('authorization2');
    const role2Header = response.headers.get('Role2');

    if (!authorization2Header) {
      throw new Error('Authorization2 Header not found');
    }

    // save the user token and userID to the local storage instance of the application
    localStorage.setItem('access', authorization2Header);
    localStorage.setItem('role', role2Header);
    const data = yield response.json();
    localStorage.setItem('userID', data);
    yield put(authActions.getUserIDSuccess(data));
  } catch (e) {
    yield put(authActions.getUserIDFailure(e));
  }
}

export function* fetchUserSignup(action) {
  try {
    const response = yield call(fetch, `${BASEURL}/signup`, {
      method: 'POST',
      body: JSON.stringify(action.payload),
      headers: {
        Accept: 'application/json',
      },
      credentials: 'include', // Equivalent to withCredentials: true
    });

    if (!response.ok) {
      throw new Error('Failed to create new user');
    }

    yield put(authActions.getSignupSuccess(response.data));
  } catch (e) {
    yield put(authActions.getSignupFailure(e));
  }
}

export function* fetchUserLogout() {
  try {
    const response = yield call(axios.get, `${BASEURL}/logout`);
    yield put(authActions.getLogoutSuccess(response.data));
  } catch (e) {
    yield put(authActions.getLogoutFailure(e));
  }
}

export function* fetchUserVerification(action) {
  try {
    const response = yield call(axios.post, `${BASEURL}/user/verification`, {
      email: action.payload.email,
      birthday: action.payload.birthday,
    }, {
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true, // Equivalent to credentials: 'include'
    });
    yield put(authActions.getUserVerificationSuccess(response.data));
  } catch (e) {
    yield put(authActions.getUserVerificationFailure(e));
  }
}

export function* watchFetchUserLogin() {
  yield takeLatest('auth/getUserID', fetchUserLogin);
}
export function* watchFetchUserVerification() {
  yield takeLatest('auth/getUserVerification', fetchUserVerification);
}
export function* watchFetchUserSignup() {
  yield takeLatest('auth/getSignup', fetchUserSignup);
}
export function* watchFetchUserLogout() {
  yield takeLatest(`auth/getLogout`, fetchUserLogout);
}

export default [watchFetchUserLogin, watchFetchUserSignup, watchFetchUserLogout, watchFetchUserVerification];
