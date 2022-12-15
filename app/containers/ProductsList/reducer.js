/*
 *
 * ProductsList reducer
 *
 */
import produce from 'immer';
import { act } from 'react-test-renderer';
import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  DEFAULT_ACTION,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  EDIT_PRODUCT,
  EDIT_PRODUCT_SUCCESS,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  RESET_MSGS,
} from './constants';

export const initialState = {
  products: [],
  isDeleted: false,
  isNewProductAdded: false,
  newProductId: null,
  isProductUpdated:false,
  msg: '',
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
        draft.isDeleted = false;
        return draft;
      case DELETE_PRODUCT:
        console.log('inside reducer >>> ', action.pid);
        let { products } = state.products;
        products = products.filter(item => item.id != action.pid);
        console.log('products after deleting');
        console.log(products);
        draft.products.products = products;
        return draft;
      case DELETE_PRODUCT_SUCCESS:
        console.log('action -> ', action.response);
        draft.isDeleted = action.response.isDeleted;
        draft.msg = action.response.msg;
        return draft;
      case ADD_PRODUCT:
        console.log('addP >> ', action.data);
        draft.products.products.unshift({
          id: action.newProductId,
          title: action.data,
        });
        return draft;
      case ADD_PRODUCT_SUCCESS:
        draft.isNewProductAdded = action.response.isNewProductAdded;
        draft.msg = action.response.msg;
        return draft;
      case RESET_MSGS:
        draft.isDeleted=false;
        draft.isNewProductAdded=false;
        draft.isProductUpdated=false;
        draft.msg="";
        return draft;
      case EDIT_PRODUCT:
        let productArr=state.products.products;
        console.log("ep "+action.id+" : "+action.newTitle);
        for(let i=0;i<productArr.length;i++){
          if(productArr[i].id==action.id){
            productArr[i].title=action.newTitle;
          }
        }
        console.log("pA ",productArr);
        draft.products.products=productArr;
        return draft;
      case EDIT_PRODUCT_SUCCESS:
        console.log("eps >>",action.response);
        draft.isProductUpdated = action.response.isProductUpdated
        draft.msg = action.response.msg;
        return draft;
    }
  });

export default productsListReducer;
