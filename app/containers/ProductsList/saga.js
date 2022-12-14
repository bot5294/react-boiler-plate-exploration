import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { FETCH_PRODUCTS } from './constants';
import request from '../../utils/request';
import { fetchProductsSuccess } from './actions';
export function* fetchProducts() {
  const reqUrl = 'https://dummyjson.com/products';
  try {
    const products = yield call(request, reqUrl);
    yield put(fetchProductsSuccess(products));
    console.log('inside saga Products > ', products);
  } catch (error) {
    console.log(error);
  }
}
// Individual exports for testing
export default function* productsListSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(FETCH_PRODUCTS, fetchProducts);
}
