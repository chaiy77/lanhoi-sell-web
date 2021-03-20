import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { connect } from 'react-redux';
import Layout from '../components/layout';
import lanhoi from 'images/lanhoi.png';

const ShoppingCartPage = ({ cart }) => {
  console.log(cart);
  return (
    <Layout>
      <h1>shopping cart</h1>
    </Layout>
  );
};

ShoppingCartPage.propsTypes = {
  cart: PropTypes.array,
};

const mapStateToProps = state => ({ cart: state.ShoppingCart });

export default connect(mapStateToProps)(ShoppingCartPage);
