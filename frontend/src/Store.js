// store.js
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';

import home from './features/Home/homeSlice';
import auth from './Containers/Auth/authSlice';
import event from './Containers/Event/eventSlice';

import profile from './features/Profile/profileSlice';
import categories from './features/Categories/categoriesSlice';

import { all } from 'redux-saga/effects'; // Import 'all' from redux-saga

import homeSaga from './features/Home/homeSaga';
import authSaga from './Containers/Auth/authSaga';
import eventSaga from './Containers/Event/eventSaga';
import profileSaga from './features/Profile/profileSaga';
import categoriesSaga from './features/Categories/categoriesSaga';

const sagaMiddleware = createSagaMiddleware();

// Combine all sagas into one root saga
function* rootSaga() {
  yield all([
    ...authSaga.map((saga) => saga()),
    ...profileSaga.map((saga) => saga()),
    ...homeSaga.map((saga) => saga()),
    ...eventSaga.map((saga) => saga()),
    ...categoriesSaga.map((saga) => saga()),
  ]);
}

export const store = configureStore({
  reducer: {
    auth,
    home,
    event,
    profile,
    categories,
  },
  middleware: [sagaMiddleware],
  // devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);
