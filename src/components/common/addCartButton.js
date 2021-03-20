import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Button from './button';
import { actions } from 'data/reducers/cart';

const AddCartButton = ({ item, addItemToCart }) => {
  return <Button label="add cart" onClick={() => addItemToCart(item)} />;
};

AddCartButton.propsType = {
  item: PropTypes.object,
  addItemToCart: PropTypes.func,
};

AddCartButton.defaultProps = {
  item: {},
  addItemToCart: () => {},
};

const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: item => dispatch(actions.addItemToCart(item)),
  };
};

export default connect(null, mapDispatchToProps)(AddCartButton);
