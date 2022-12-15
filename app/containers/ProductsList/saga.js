import { take, call, put, select, takeLatest, all } from 'redux-saga/effects';
import { ADD_PRODUCT, DELETE_PRODUCT, FETCH_PRODUCTS } from './constants';
import request from '../../utils/request';
import { addProduct, addProductSuccess, deleteProductSuccess, fetchProductsSuccess } from './actions';
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
export function* deleteProducts(action) {
  console.log('inside generator >>>  ', action.pid);
  const reqUrl = `https://dummyjson.com/products/${action.pid}`;
  try {
    const options = {
      method: 'DELETE',
    };
    const isDeleted = yield call(request, reqUrl, options);
    if (isDeleted) {
      yield put(
        deleteProductSuccess({
          isDeleted: true,
          msg: `Item with id ${action.pid} deleted successfully`,
        }),
      );
    } else {
    }
  } catch (error) {
    console.log(error);
  }
}
export function* addNewProduct(action){
  const reqUrl = `https://dummyjson.com/products/add`;
  try {
    const options={
      method:'POST',
      body:action.data
    };
    const newProduct = yield call(request,reqUrl,options);
    console.log("newProduct >>> ",newProduct);
    if(newProduct){
      yield put(addProductSuccess({isNewProductAdded:true,msg:`new product( ${action.data} ) is added successfully`,newProductId:newProduct.id}));
    }
  } catch (error) {
    console.log(error);
  }
}
// Individual exports for testing
export default function* productsListSaga() {
  // See example in containers/HomePage/saga.js
  console.log('inside productListSaga >>>>> ');
  yield all([
    takeLatest(FETCH_PRODUCTS, fetchProducts),
    takeLatest(DELETE_PRODUCT, deleteProducts),
    takeLatest(ADD_PRODUCT,addNewProduct)
  ]);
}
