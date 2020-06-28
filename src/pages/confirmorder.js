import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Link } from 'gatsby';
import { connect } from 'react-redux';
import Layout from '../components/layout';
import { ConfirmTable, ConfirmReactTable, Button } from 'components/common';
import lanhoi from 'images/lanhoi.png';
import { MockOrders } from 'data/mockup-data';

const columns = [
  {
    Header: 'No',
    accessor: 'no',
  },
  { Header: 'รายการ', accessor: 'product' },
  {
    Header: 'จำนวน',
    accessor: 'amount',
  },
  {
    Header: 'ราคา/หน่วย',
    accessor: 'unitPrice',
  },
  {
    Header: 'หน่วย',
    accessor: 'unit',
  },
  {
    Header: 'รวม',
    accessor: 'total',
  },
];

// const data = [
//   { no: '', product: 'test 1' },
//   { no: 1, product: 'test 2' },
// ];
const mOrder = () => {
  const _mOrder = MockOrders;
  console.log(_mOrder);
  const _data = [];
  let _idx = 0;
  R.keys(_mOrder).map(group => {
    //Add Product group to table's data
    _mOrder[group]['areas'].map(area => {
      area.type
        ? _data.push({
            no: '',
            product:
              `${group}` + ' : No ' + `${area.no}` + ' ' + `${area.type}`,
            type: 'group',
          })
        : _data.push({
            no: '',
            product: `${group}` + ' : No ' + `${area.no}`,
            type: 'group',
          });
      // console.log(R.mergeAll(area.products));
      let _products = R.mergeAll(area.products);

      //Set Produt 's datas to Table
      R.keys(_products).map(prodName => {
        _idx = _idx + 1;
        // console.log(prodName, ':', _products[prodName]);
        _data.push({
          no: _idx,
          product: prodName,
          amount: _products[prodName],
          type: 'product',
        });
      });
    });
  });
  //Add Summary to Table
  let _summary = { no: _idx + 1, total: 1230, type: 'summary' };
  _data.push(_summary);

  console.log(_data);
  return _data;
};

const ConfirmOrderPage = ({ orders }) => {
  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    console.log('order list :', { orders });
    setOrderData(mOrder());
  }, [orders]);

  return (
    <Layout
      renderContent={() => {
        return (
          // <ConfirmTable />
          <div className="sm:w-full md:w-5/6 xl:w-1/2">
            <div>Product List</div>
            <div className="mt-5">
              <ConfirmReactTable columns={columns} data={orderData} />
            </div>
            <div className="flex flex-row mt-5 justify-between">
              <Button label="Choose More"></Button>
              <Button label="Next"></Button>
            </div>
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

const mapStateToProps = state => ({ orders: state.Orders });

export default connect(mapStateToProps)(ConfirmOrderPage);
