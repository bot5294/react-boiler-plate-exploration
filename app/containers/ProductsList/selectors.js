import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the productsList state domain
 */

const selectProductsListDomain = state => state.productsList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProductsList
 */

const makeSelectProductsList = () =>
  createSelector(
    selectProductsListDomain,
    substate => substate,
  );

export default makeSelectProductsList;
export { selectProductsListDomain };
