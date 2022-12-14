/*
 *
 * ProductsList reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
} from './constants';

export const initialState = {
  products: [],
};

/* eslint-disable default-case, no-param-reassign */
const productsListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case FETCH_PRODUCTS:
        break;
      case FETCH_PRODUCTS_SUCCESS:
        draft.products = action.response;
        return draft;
    }
  });

export default productsListReducer;
