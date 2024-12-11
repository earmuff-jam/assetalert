import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { all } from 'redux-saga/effects';

import auth from './features/LandingPage/authSlice';
import profile from './features/Profile/profileSlice';
import notes from './features/Notes/notesSlice';
import categories from './features/Categories/categoriesSlice';
import categoryItemDetails from './features/CategoryItemDetails/categoryItemDetailsSlice';
import maintenance from './features/MaintenancePlan/maintenanceSlice';
import maintenancePlanItem from './features/MaintenancePlanItemDetails/maintenancePlanItemSlice';
import inventory from './features/Assets/inventorySlice';
import summary from './features/Home/SummarySlice';
import reports from './features/Reports/reportSlice';

import authSaga from './features/LandingPage/authSaga';
import profileSaga from './features/Profile/profileSaga';
import notesSaga from './features/Notes/notesSaga';
import categoriesSaga from './features/Categories/categoriesSaga';
import categoryItemSaga from './features/CategoryItemDetails/categoryItemDetailsSaga';
import maintenanceSaga from './features/MaintenancePlan/maintenanceSaga';
import maintenancePlanItemSaga from './features/MaintenancePlanItemDetails/maintenancePlanItemSaga';
import inventorySaga from './features/Assets/inventorySaga';
import summarySaga from './features/Home/SummarySaga';
import reportsSaga from './features/Reports/reportSaga';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([
    ...authSaga.map((saga) => saga()),
    ...notesSaga.map((saga) => saga()),
    ...reportsSaga.map((saga) => saga()),
    ...summarySaga.map((saga) => saga()),
    ...profileSaga.map((saga) => saga()),
    ...inventorySaga.map((saga) => saga()),
    ...categoriesSaga.map((saga) => saga()),
    ...maintenanceSaga.map((saga) => saga()),
    ...categoryItemSaga.map((saga) => saga()),
    ...maintenancePlanItemSaga.map((saga) => saga()),
  ]);
}

export const store = configureStore({
  reducer: {
    auth,
    notes,
    reports,
    summary,
    profile,
    inventory,
    categories,
    maintenance,
    maintenancePlanItem,
    categoryItemDetails,
  },
  middleware: [sagaMiddleware],
  // devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);
