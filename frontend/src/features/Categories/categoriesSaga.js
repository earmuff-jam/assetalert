import instance from '@utils/Instances';
import { Base64ToUint8Array } from '@common/utils';
import { REACT_APP_LOCALHOST_URL } from '@utils/Common';
import { call, put, takeLatest } from 'redux-saga/effects';
import { categoryActions } from '@features/Categories/categoriesSlice';

const DEFAULT_LIMIT = 10;
const BASEURL = `${REACT_APP_LOCALHOST_URL}/api/v1`;

export function* getCategories(action) {
  try {
    const userID = localStorage.getItem('userID');
    const params = new URLSearchParams();
    params.append('id', userID);
    if (action.payload) {
      params.append('limit', action.payload);
    } else {
      params.append('limit', DEFAULT_LIMIT);
    }
    const response = yield call(instance.get, `${BASEURL}/categories?${params.toString()}`);
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

    yield put(categoryActions.getCategoriesSuccess(data));
  } catch (e) {
    yield put(categoryActions.getCategoriesFailure(e));
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

export function* download() {
  try {
    const userID = localStorage.getItem('userID');
    const params = new URLSearchParams();
    params.append('id', userID);
    const response = yield call(instance.get, `${BASEURL}/categories?${params.toString()}`);
    yield put(categoryActions.downloadSuccess(response.data));
  } catch (e) {
    yield put(categoryActions.downloadFailure(e));
  }
}

export function* watchGetCategoryList() {
  yield takeLatest(`category/getCategories`, getCategories);
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

export function* watchDownload() {
  yield takeLatest(`category/download`, download);
}

export default [watchGetCategoryList, watchDownload, watchCreateCategory, watchUpdateCategory, watchRemoveCategory];
