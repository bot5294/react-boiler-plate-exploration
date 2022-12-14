/*
 *
 * ProductsList actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS,
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
