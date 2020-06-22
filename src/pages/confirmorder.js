import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { connect } from 'react-redux';
import Layout from '../components/layout';
import lanhoi from 'images/lanhoi.png';

const ConfirmOrderPage = ({ orders }) => {
  useEffect(() => {
    console.log('order list :', { orders });
  }, [orders]);
  return (
    <Layout
      renderContent={() => {
        return (
          <div className="sm:w-full md:w-5/6 xl:w-1/2">
            <div>Product List</div>
            <div></div>
          </div>
        );
      }}
    />
  );
};

ConfirmOrderPage.propsTypes = {
  orders: PropTypes.array,
};

ConfirmOrderPage.defaultProps = { orders: [] };

const mapStateToProps = state => ({ orders: state.Orders.orders });

export default connect(mapStateToProps)(ConfirmOrderPage);
