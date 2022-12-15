/**
 *
 * ProductsList
 *
 */

import React, { memo, useEffect,useState } from 'react';
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
import { deleteProduct, fetchProducts } from './actions';

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
  }, [props.productsList.products,props.productsList.isDeleted]);

  const productsList = props.productsList.products;
  const handleDelete = async (id)=>{
    await props.deleteProduct(id);
    console.log(props);
    if(props.productsList.isDeleted){
      window.alert(props.productsList.msg)
    }
  }
  console.log("at line 47 productsList >>> ",productsList);
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
            <div key={index}>
              <p>
                {item.title} &nbsp;
                <button onClick={() => handleDelete(item.id)}>X</button>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

ProductsList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fetchProducts: PropTypes.func,
  props: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  productsList: makeSelectProductsList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchProducts: () => dispatch(fetchProducts()),
    deleteProduct: id => dispatch(deleteProduct(id)),
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
