import React, { forwardRef, useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';
import { actions } from 'data/reducers/order';
import { useForm } from 'react-hook-form';
import * as R from 'ramda';
import Layout from 'components/layout';
import PropTypes from 'prop-types';
import { Select, TextInput, Button } from 'components/common';
import {
  ProductGroups,
  getProductUnit,
  getProductPrice,
} from 'data/mockup-data';
// import { Pile } from 'util/calculator';

//Groups need to be loaded from DB, created by admin
const GroupName = 'Pile';
const Groups = R.find(R.propEq('type', GroupName))(ProductGroups);

const PileProductDetail = forwardRef(
  ({ area, area_index, register, errors }, ref) => {
    return (
      <div key={area_index}>
        <div className="flex  border border-gray-500 bg-blue-400 p-2 rounded-t-md">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <div className="mx-2 text-2xl font-bold">Area No. {area.no} </div>
            </div>
          </div>
        </div>
        <div className="border border-gray-500  rounded-b-md">
          {Groups.groups.map((group, i) => {
            console.log(area.data);
            if (group.index === 'pile') {
              return (
                <div className="flex flex-row my-2 py-2 px-4 " key={i}>
                  <div className="w-1/6"> {group.text} </div>

                  <div className="w-3/6 mx-3 ">
                    <Select
                      name={`${area.no}` + '_product_' + `${group.index}`}
                      register={register}
                      options={
                        area.data.shoe
                          ? group.products
                              .map(i => i.name)
                              .filter(i => i.includes('หัวชู'))
                          : group.products
                              .map(i => i.name)
                              .filter(i => !i.includes('หัวชู'))
                      }
                    />
                  </div>
                  <div className=" w-1/6 mx-3 pr-3">
                    <input
                      type="text"
                      className="w-full shadow appearance-none border rounded py-1 px-1 mx-2 pr-4
                                text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name={`${area.no}` + '_amount_' + `${group.index}`}
                      ref={register}
                      defaultValue={`${area.data.A}`}
                    />
                  </div>
                  <div className="w-1/6">{group.unit}</div>
                </div>
              );
            } else {
              if (area.data.dowel) {
                return (
                  <div className="flex flex-row my-2 py-2 px-2 " key={i}>
                    <div className="w-1/6 pl-2"> - {group.text} </div>
                    <div className="w-3/6 mx-2">
                      <div className="flex flex-row">
                        <div className="w-1/6 ">ขนาด</div>
                        <div className="w-1/2">
                          <Select
                            name={
                              `${area.no}` +
                              '_addon_' +
                              `${group.index}` +
                              '_diameter'
                            }
                            register={register}
                            options={[
                              '12 mm.',
                              '16 mm.',
                              '20 mm.',
                              '25 mm.',
                              '28 mm.',
                            ]}
                          />
                        </div>
                        <div className="w-1/4 ml-4">ยาว (m.)</div>
                        <div className="w-1/4">
                          <input
                            type="text"
                            className="w-full shadow appearance-none border rounded py-1 px-1 mx-2 pr-4
                                      text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name={
                              `${area.no}` +
                              '_addon_' +
                              `${group.index}` +
                              '_long'
                            }
                            defaultValue={0}
                            ref={register}
                          />
                        </div>
                      </div>
                    </div>
                    <div className=" w-1/6 mx-3 pr-3">
                      <input
                        type="text"
                        className="w-full shadow appearance-none border rounded py-1 px-1 mx-2 mr-2
                      text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name={
                          `${area.no}` +
                          '_addon_' +
                          `${group.index}` +
                          '_amount'
                        }
                        ref={register}
                        defaultValue={`${area.data.D1}`}
                      />
                    </div>
                    <div className="w-1/6">{group.unit}</div>
                  </div>
                );
              }
            }
          })}
        </div>
        <div className="text-red-700 border-red-400 mt-1 mb-3 py-2 px-4">
          {Object.keys(errors).length > 0 &&
            'There are some error, empty product OR unit'}
        </div>
      </div>
    );
  }
);

const PilePreQuatation = ({ areas, addOrder }) => {
  const [areaData, setRoofsData] = useState([]);
  const { register, handleSubmit, watch, errors } = useForm();

  useEffect(() => {
    console.log(areas);
    setRoofsData(areas);
  }, [areas]);

  const getPrice = (type, product) => {
    return getProductPrice(type, product);
  };

  const getDowelPrice = dowel => {
    return 111;
  };

  const addToCartClick = data => {
    // console.log(' add cart click');
    // console.log(data);
    let prodType = Groups.type;
    let prodText = Groups.text;
    let _tempOrder = {};
    let _orders = [];
    let _areas = [...areaData];
    let _no = 0;
    let _prod = '';
    let _type = '';

    R.keys(data).map(key => {
      _no = parseInt(key.substring(0, key.indexOf('_')));
      _areas.map(area =>
        parseInt(area.no) === _no ? (_type = area.type) : ''
      );
      let _temp = { no: _no, type: _type ? _type : '', products: [] };
      if (!R.contains(_temp, _orders)) _orders.push(_temp);
    });

    R.keys(data).map(_prodKey => {
      //   // console.log(_prodKey);
      if (R.contains('product', _prodKey)) {
        _tempOrder = {};
        _tempOrder['addon'] = '';

        let _noProd = parseInt(R.split('_', _prodKey)[0]);
        let _pGroup = R.split('_', _prodKey)[2];
        _prod = data[_prodKey];

        R.keys(data).map(_amountKey => {
          let _noUnit = parseInt(R.split('_', _amountKey)[0]);
          if (
            R.contains('amount', _amountKey) &&
            R.contains(_pGroup, _amountKey) &&
            _noProd === _noUnit
          ) {
            _tempOrder['name'] = _prod;
            _tempOrder['amount'] = data[_amountKey];
            _tempOrder['price'] = getPrice(prodType, _prod);
            _tempOrder['unit'] = getProductUnit(prodType, _prod);
            _tempOrder['index'] = R.split('_', _amountKey)[2];
          }
        });
        let dowel = {};
        R.keys(data).map(_addonKey => {
          let _noUnit = parseInt(R.split('_', _addonKey)[0]);
          if (
            _noProd === _noUnit &&
            R.contains('addon', _addonKey) &&
            R.split('_', _addonKey)[2] === 'dowel'
          ) {
            // console.log(R.split('_', _amountKey)[2]);
            // console.log(R.split('_', _addonKey)[3]);
            // Dowel

            let dowel = {};

            if (R.split('_', _addonKey)[3] === 'diameter')
              _tempOrder['addon'] =
                _tempOrder['addon'] + 'โดเวล &#8709 ' + data[_addonKey];
            dowel['diameter'] = data[_addonKey];

            if (R.split('_', _addonKey)[3] === 'long')
              _tempOrder['addon'] =
                _tempOrder['addon'] + ' ยาว ' + data[_addonKey] + ' เมตร';
            dowel['long'] = data[_addonKey];

            if (R.split('_', _addonKey)[3] === 'amount')
              _tempOrder['addon'] =
                _tempOrder['addon'] + ' จำนวน ' + data[_addonKey] + ' เส้น';
            dowel['amount'] = data[_addonKey];
          }
        });
        _tempOrder['price'] = _tempOrder['price'] + getDowelPrice(dowel);

        _orders.map((order, i) => {
          if (order.no === _noProd) {
            _orders[i]['products'].push(_tempOrder);
          }
        });
      }
      //console.log('_order :', _orders);
    });
    let order = { group: GroupName, areas: _orders, text: prodText };
    console.log(order);
    addOrder(order);
    navigate('confirmorder');
  };

  return (
    <Layout
      renderContent={() => {
        return (
          <div className="sm:w-full md:w-5/6 xl:w-1/2">
            <div className="flex flex-row justify-between">
              <div>
                <Button
                  onClick={() => navigate('/pile/customerdata')}
                  type="button"
                  label="Back"
                />
              </div>
              <div className="flex items-center text-3xl">เสาเข็ม</div>
              <div className="flex w-auto">
                <Button type="button" label="Next" />
              </div>
            </div>
            <div className="mt-3">
              <form onSubmit={handleSubmit(addToCartClick)}>
                <div>
                  {areaData.map((area, area_index) => {
                    return (
                      <PileProductDetail
                        area={area}
                        area_index={area_index}
                        register={register}
                        errors={errors}
                      />
                    );
                  })}
                </div>
                <div>
                  {/* <AddCartButton item={itemTest} /> */}
                  <Button label="Add to Cart" type="submit" />
                </div>
              </form>
            </div>
          </div>
        );
      }}
    ></Layout>
  );
};

PilePreQuatation.propTypes = {
  addOrder: PropTypes.func,
  areas: PropTypes.array,
};

PilePreQuatation.defaultProps = { areas: [], addOrder: () => {} };

const mapDispatchToProps = dispatch => {
  return {
    addOrder: orders => dispatch(actions.addOrder(orders)),
  };
};

const mapStateToProps = state => ({ areas: state.Customer.piles });

export default connect(mapStateToProps, mapDispatchToProps)(PilePreQuatation);
// export default ConcretePreQuatation;
