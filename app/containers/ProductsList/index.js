/**
 *
 * ProductsList
 *
 */

import React, { memo, useEffect, useRef,useState } from 'react';
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
import { addProduct, deleteProduct, editProduct, fetchProducts, resetMsgs } from './actions';

export function ProductsList(props) {
  useInjectReducer({ key: 'productsList', reducer });
  useInjectSaga({ key: 'productsList', saga });
  const [showEdit,setShowEdit] = useState(false);
  const [toggleId,setToggleId] = useState(null);
  const addInput = useRef(null);
  const editInput = useRef(null);
  useEffect(() => {
    if (
      props.productsList &&
      props.productsList.products &&
      props.productsList.products.length === 0
    ) {
      props.fetchProducts();
    }
    if(props.productsList.isNewProductAdded) {
      window.alert(props.productsList.msg);
      props.resetMsgs();
    }else if (props.productsList.isDeleted) {
      window.alert(props.productsList.msg);
      props.resetMsgs();
    }else if(props.productsList.isProductUpdated){
      window.alert(props.productsList.msg);
      props.resetMsgs();
    }
  }, [props.productsList.products,props.productsList.isDeleted,props.productsList.isNewProductAdded,props.productsList.isProductUpdated]);

  const productsList = props.productsList.products;
  const handleDelete = async id => {
    await props.deleteProduct(id);
    console.log(props);
  };
  const handleAddProduct = () => {
    const { value } = addInput.current;
    console.log(value);
    props.addProduct(value);
  };
  const handleCancel=()=>{
    setShowEdit(false);
  }
  const handleEdit=(id)=>{
    let value = editInput.current.value;
    props.editProduct(id,value);
    setShowEdit(!showEdit)

  }
  const handleShowToggle=(id)=>{
    setToggleId(id);
    setShowEdit(!showEdit); 
  }
  console.log('at line 47 productsList >>> ', productsList);
  return (
    <div>
      <Helmet>
        <title>ProductsList</title>
        <meta name="description" content="Description of ProductsList" />
      </Helmet>
      <FormattedMessage {...messages.header} />
      <div>
        <div>
          <input
            type="text"
            placeholder="Enter Title to add in the list"
            ref={addInput}
          />
          &nbsp;
          <button onClick={() => handleAddProduct()}>Add Product</button>
        </div>
        {productsList.products &&
          productsList.products.length > 0 &&
          productsList.products.map((item, index) => (
            <div key={index}>
              <p>{!showEdit && <>
                {item.title} &nbsp;
                <button onClick={() => handleDelete(item.id)}>X</button>
                &nbsp;
                <button onClick={()=>handleShowToggle(item.id)}>✍</button>
                </>}
                {showEdit && toggleId==item.id && <>
                <input type={"text"} placeholder={item.title} ref={editInput}  />
                &nbsp;
                <button onClick={() => handleEdit(item.id)}>Edit</button>
                &nbsp;
                <button onClick={() => handleCancel()}>Cancel</button>
                </>}
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
    addProduct: title => dispatch(addProduct(title)),
    resetMsgs:()=>dispatch(resetMsgs()),
    editProduct:(id,newTitle)=>dispatch(editProduct({id,newTitle}))
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
