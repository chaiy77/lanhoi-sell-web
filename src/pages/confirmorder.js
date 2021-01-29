import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Link, navigate } from 'gatsby';
import html2canvas from 'html2canvas';
import { connect } from 'react-redux';
import Layout from '../components/layout';
import { ConfirmTable, ConfirmReactTable, Button } from 'components/common';
import lanhoi from 'images/lanhoi.png';
import { ProductGroups } from 'data/mockup-data';

//use html2canvas to save + download image
//https://stackoverflow.com/questions/44343931/save-image-with-html2canvas-pure-javascript
//https://stackoverflow.com/questions/61187850/export-html-area-as-image-with-html2canvas

const columns = [
  {
    Header: 'No',
    accessor: 'no',
  },
  {
    Header: 'รายการ',
    accessor: 'product',
    //use "dangerouslySetInnerHTML" for html tag in cell
    Cell: row => <div dangerouslySetInnerHTML={{ __html: row.value }} />,
  },
  {
    Header: 'จำนวน',
    accessor: 'amount',
  },
  {
    Header: 'ราคา/หน่วย',
    accessor: 'price',
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
const mOrder = orders => {
  // const _mOrder = MockOrders;
  const _mOrder = orders;
  console.log(_mOrder);
  const _data = [];
  let _idx = 0;
  let _sum = 0;
  R.keys(_mOrder).map(group => {
    //Add Product group to table's data

    if (R.has('areas', _mOrder[group])) {
      let groupText = R.find(R.propEq('type', group))(ProductGroups).text;
      // console.log(groupText);
      _mOrder[group]['areas'].map(area => {
        area.type
          ? _data.push({
              no: '',
              product:
                `${groupText}` + ' : No ' + `${area.no}` + ' ' + `${area.type}`,
              type: 'group',
            })
          : _data.push({
              no: '',
              product: `${groupText}` + ' : No ' + `${area.no}`,
              type: 'group',
            });
        console.log(area);
        area.products.map(prod => {
          _idx = _idx + 1;
          console.log(prod.index);
          if (prod.index === 'Metalsheet') {
            // console.log('index = metalsheet');
            _data.push({
              no: _idx,
              product: prod.name,
              amount: prod.amount,
              price: Math.floor(prod.price * prod.length),
              unit: prod.unit,
              total: prod.price * prod.length * prod.amount,
              type: 'product',
            });
          } else if (prod.index === 'slab') {
            console.log('index = slab');
            console.log(prod);

            _data.push({
              no: _idx,
              product: prod.name,
              amount: prod.amount,
              price: Math.floor(prod.price * prod.length),
              unit: prod.unit,
              total: prod.price * prod.length * prod.amount,
              type: 'product',
            });
          } else if (prod.index === '') {
          } else {
            let _pName =
              typeof prod.addon !== 'undefined'
                ? prod.name +
                  '<br> <div style="padding-left:8px; font-size:0.8em"> -' +
                  prod.addon +
                  '</div>'
                : prod.name;
            _data.push({
              no: _idx,
              product: _pName,

              amount: prod.amount,
              price: prod.price,
              unit: prod.unit,
              total: prod.price * prod.amount,
              type: 'product',
            });
          }
          _sum = _sum + prod.price * prod.amount;
        });
      });
    }
  });
  //Add Summary to Table
  let _summary = { no: _idx + 1, total: _sum, type: 'summary' };
  _data.push(_summary);
  console.log(_data);
  return _data;
};

const ConfirmOrderPage = ({ orders }) => {
  const [orderData, setOrderData] = useState([]);
  const orderTableRef = useRef();

  useEffect(() => {
    console.log('order list :', { orders });
    setOrderData(mOrder(orders));
  }, [orders]);

  // https://github.com/niklasvh/html2canvas/issues/1878
  const printDocument = domElement => {
    html2canvas(domElement, {
      scrollX: 0,
      scrollY: -window.scrollY,
    })
      .then(canvas => document.body.appendChild(canvas))
      .then(canvas => {
        var link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = '1.jpg';
        document.body.appendChild(link);

        //simulate click
        link.click();

        //remove the link when done
        document.body.removeChild(link);
      });
  };

  return (
    <Layout
      renderContent={() => {
        return (
          // <ConfirmTable />
          <div className="sm:w-full md:w-5/6 xl:w-1/2">
            <div>Product List</div>
            <div className="w-full mt-5" id="id-orderTable">
              <ConfirmReactTable columns={columns} data={orderData} />
            </div>
            <div className="flex flex-row mt-5 justify-between">
              <div className="w-1/4">
                <Button
                  label="Choose More"
                  onClick={() => navigate('/products')}
                ></Button>
              </div>
              <div className="w-1/4">
                <Button
                  label="Save"
                  onClick={() =>
                    printDocument(document.getElementById('id-orderTable'))
                  }
                ></Button>
              </div>
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
