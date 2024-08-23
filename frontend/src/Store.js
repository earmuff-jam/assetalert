// store.js
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';

import auth from './Containers/Auth/authSlice';
import profile from './features/Profile/profileSlice';
import notes from './features/Notes/notesSlice';
import categories from './features/Categories/categoriesSlice';
import maintenance from './features/Maintenance/maintenanceSlice';
import inventory from './features/InventoryList/inventorySlice';
import summary from './features/Home/SummarySlice';

import { all } from 'redux-saga/effects'; // Import 'all' from redux-saga

import authSaga from './Containers/Auth/authSaga';
import profileSaga from './features/Profile/profileSaga';
import notesSaga from './features/Notes/notesSaga';
import categoriesSaga from './features/Categories/categoriesSaga';
import maintenanceSaga from './features/Maintenance/maintenanceSaga';
import inventorySaga from './features/InventoryList/inventorySaga';
import summarySaga from './features/Home/SummarySaga';

const sagaMiddleware = createSagaMiddleware();

// Combine all sagas into one root saga
function* rootSaga() {
  yield all([
    ...authSaga.map((saga) => saga()),
    ...profileSaga.map((saga) => saga()),
    ...categoriesSaga.map((saga) => saga()),
    ...notesSaga.map((saga) => saga()),
    ...inventorySaga.map((saga) => saga()),
    ...maintenanceSaga.map((saga) => saga()),
    ...summarySaga.map((saga) => saga()),
  ]);
}

export const store = configureStore({
  reducer: {
    auth,
    profile,
    categories,
    inventory,
    notes,
    maintenance,
    summary,
  },
  middleware: [sagaMiddleware],
  // devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);
