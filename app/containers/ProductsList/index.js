/**
 *
 * ProductsList
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectProductsList from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { fetchProducts } from './actions';

export function ProductsList(props) {
  useInjectReducer({ key: 'productsList', reducer });
  useInjectSaga({ key: 'productsList', saga });
  useEffect(() => {
    if (
      props.productsList &&
      props.productsList.products &&
      props.productsList.products.length === 0
    ) {
      props.fetchProducts();
    }
    console.log(props);
  }, [props.productsList.products]);
  const productsList = props.productsList.products;
  console.log('product >> indexjs >> ', productsList);
  return (
    <div>
      <Helmet>
        <title>ProductsList</title>
        <meta name="description" content="Description of ProductsList" />
      </Helmet>
      <FormattedMessage {...messages.header} />
      <div>
        {productsList.products &&
          productsList.products.length > 0 &&
          productsList.products.map((item, index) => (
            <p key={index}>{item.title}</p>
          ))}
      </div>
    </div>
  );
}

ProductsList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fetchProducts: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  productsList: makeSelectProductsList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchProducts: () => dispatch(fetchProducts()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProductsList);
