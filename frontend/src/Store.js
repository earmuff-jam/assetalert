// store.js
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';

import home from './Containers/Home/homeSlice';
import auth from './Containers/Auth/authSlice';
import event from './Containers/Event/eventSlice';
import profile from './Containers/Profile/profileSlice';

import { all } from 'redux-saga/effects'; // Import 'all' from redux-saga

import homeSaga from './Containers/Home/homeSaga';
import authSaga from './Containers/Auth/authSaga';
import eventSaga from './Containers/Event/eventSaga';
import profileSaga from './Containers/Profile/profileSaga';

const sagaMiddleware = createSagaMiddleware();

// Combine all sagas into one root saga
function* rootSaga() {
  yield all([
    ...authSaga.map((saga) => saga()),
    ...profileSaga.map((saga) => saga()),
    ...homeSaga.map((saga) => saga()),
    ...eventSaga.map((saga) => saga()),
  ]);
}

export const store = configureStore({
  reducer: {
    auth,
    home,
    event,
    profile,
  },
  middleware: [sagaMiddleware],
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);
