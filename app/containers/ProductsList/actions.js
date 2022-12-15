/*
 *
 * ProductsList actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchProducts() {
  return {
    type: FETCH_PRODUCTS,
  };
}
export function fetchProductsSuccess(response) {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    response,
  };
}
export function deleteProduct(productId) {
  console.log('inside deleteProduct >>>> ', productId);
  return {
    type: DELETE_PRODUCT,
    pid: productId,
  };
}
export function deleteProductSuccess(response) {
  return {
    type: DELETE_PRODUCT_SUCCESS,
    response,
  };
}
export function addProduct(productData) {
  console.log('inside addProduct >>>> ', productData);
  return {
    type: ADD_PRODUCT,
    data: productData,
  };
}
export function addProductSuccess(response) {
  return {
    type: ADD_PRODUCT_SUCCESS,
    response,
  };
}