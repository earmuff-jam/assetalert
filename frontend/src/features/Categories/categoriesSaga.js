import { takeLatest, put, call } from 'redux-saga/effects';
import { categoryActions } from './categoriesSlice';
import { REACT_APP_LOCALHOST_URL } from '../../util/Common';
import instance from '../../util/Instances';

const DEFAULT_LIMIT = 10;
const BASEURL = `${REACT_APP_LOCALHOST_URL}/api/v1`;

export function* getCategories() {
  try {
    const userID = localStorage.getItem('userID');
    const params = new URLSearchParams();
    params.append('id', userID);
    params.append('limit', DEFAULT_LIMIT);
    const response = yield call(instance.get, `${BASEURL}/categories?${params.toString()}`);
    yield put(categoryActions.getCategoriesSuccess(response.data));
  } catch (e) {
    yield put(categoryActions.getCategoriesFailure(e));
  }
}

export function* getCategory(action) {
  try {
    const catID = action.payload;
    const userID = localStorage.getItem('userID');
    const params = new URLSearchParams();
    params.append('id', userID);
    params.append('catID', catID);
    const response = yield call(instance.get, `${BASEURL}/category?${params.toString()}`);
    yield put(categoryActions.getCategorySuccess(response.data));
  } catch (e) {
    yield put(categoryActions.getCategoryFailure(e));
  }
}

export function* getItemsForCategory(action) {
  try {
    const catID = action.payload;
    const userID = localStorage.getItem('userID');
    const params = new URLSearchParams();
    params.append('id', userID);
    params.append('catID', catID);
    params.append('limit', DEFAULT_LIMIT);
    const response = yield call(instance.get, `${BASEURL}/category/items?${params.toString()}`);
    yield put(categoryActions.getItemsForCategorySuccess(response.data));
  } catch (e) {
    yield put(categoryActions.getItemsForCategoryFailure(e));
  }
}

export function* createCategory(action) {
  try {
    const response = yield call(instance.post, `${BASEURL}/category`, { ...action.payload });
    yield put(categoryActions.createCategorySuccess(response.data));
  } catch (e) {
    yield put(categoryActions.createCategoryFailure(e));
  }
}

export function* updateCategory(action) {
  try {
    const { id } = action.payload;
    const response = yield call(instance.put, `${BASEURL}/category/${id}`, { ...action.payload });
    yield put(categoryActions.updateCategorySuccess(response.data));
  } catch (e) {
    yield put(categoryActions.updateCategoryFailure(e));
  }
}

export function* removeCategory(action) {
  try {
    const { id } = action.payload;
    const response = yield call(instance.delete, `${BASEURL}/category/${id}`);
    yield put(categoryActions.removeCategorySuccess(response.data));
  } catch (e) {
    yield put(categoryActions.removeCategoryFailure(e));
  }
}

export function* fetchAddItemsInCategory(action) {
  try {
    const { rowSelected, id } = action.payload;
    const userID = localStorage.getItem('userID');
    const response = yield call(instance.post, `${BASEURL}/category/items`, { id, userID, assetIDs: rowSelected });
    yield put(categoryActions.addItemsInCategorySuccess(response.data));
  } catch (e) {
    yield put(categoryActions.addItemsInCategoryFailure(e));
  }
}

export function* watchGetCategoryList() {
  yield takeLatest(`category/getCategories`, getCategories);
}

export function* watchGetCategory() {
  yield takeLatest(`category/getCategory`, getCategory);
}

export function* watchGetItemsForCategory() {
  yield takeLatest(`category/getItemsForCategory`, getItemsForCategory);
}

export function* watchCreateCategory() {
  yield takeLatest(`category/createCategory`, createCategory);
}

export function* watchUpdateCategory() {
  yield takeLatest(`category/updateCategory`, updateCategory);
}

export function* watchRemoveCategory() {
  yield takeLatest(`category/removeCategory`, removeCategory);
}

export function* watchFetchAddItemsInCategory() {
  yield takeLatest(`category/addItemsInCategory`, fetchAddItemsInCategory);
}

export default [
  watchGetCategoryList,
  watchGetCategory,
  watchGetItemsForCategory,
  watchCreateCategory,
  watchUpdateCategory,
  watchRemoveCategory,
  watchFetchAddItemsInCategory,
];
