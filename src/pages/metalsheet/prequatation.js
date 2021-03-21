<<<<<<< HEAD
import React, { forwardRef, useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as R from 'ramda';
import Layout from 'components/layout';
import PropTypes, { object } from 'prop-types';
import { Select, TextInput, AddCartButton, Button } from 'components/common';
import {
  ProductGroups,
  getProductPrice,
  getProductUnit,
} from 'data/mockup-data';
import { actions } from 'data/reducers/order';
import { Metalsheet } from 'util/calculator';

//Groups need to be loaded from DB, created by admin
const GroupName = 'Metalsheet';
const Groups = R.find(R.propEq('type', GroupName))(ProductGroups);

const RoofProductDetail = forwardRef(
  ({ roof, roof_index, register, errors }, ref) => {
    const ItemCalculation = (roof, group) => {
      console.log(group);
      // console.log(group.products.map(i => i.name));
      if (group === 'Metalsheet') {
        //console.log(group.products.map(i => i.name));
        const result = Metalsheet.getMetalsheets(
          roof.type,
          roof.data.A,
          roof.data.B,
          roof.data.C
        );
        console.log(result);
        return result;
      }
      if (group === 'Screw') {
        //console.log(group.products.map(i => i.name));
        const result = Metalsheet.getScrews(
          roof.type,
          roof.data.A,
          roof.data.B,
          roof.data.C,
          roof.data.pDist
        );

        return result;
      }
      return 1;
    };

    return (
      <div key={roof_index}>
        <div className="flex  border border-gray-500 bg-blue-400 p-2 rounded-t-md">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <div className="mx-2 text-2xl font-bold">Area No. {roof.no} </div>
              <div className="mx-3 text-2xl font-bold">{roof.type}</div>
            </div>
            <div className="flex flex-row">
              {roof.data.A ? (
                <div className="mx-3"> A = {roof.data.A} m.</div>
              ) : (
                <div></div>
              )}
              {roof.data.B ? (
                <div className="mx-3"> B = {roof.data.B} m.</div>
              ) : (
                <div></div>
              )}
              {roof.data.C ? (
                <div className="mx-3"> C = {roof.data.C} m.</div>
              ) : (
                <div></div>
              )}
              {roof.data.pDist ? (
                <div className="mx-3"> ระยะแป = {roof.data.pDist} m.</div>
              ) : (
                <div></div>
              )}
              {roof.data.topCover ? (
                <div className="mx-3"> ครอบจั่ว </div>
              ) : (
                <div></div>
              )}
              {roof.data.endCurve ? (
                <div className="mx-3"> ย้ำโค้ง </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
        <div className="border border-gray-500  rounded-b-md">
          {Groups.groups.map((group, i) => {
            if (group.index === 'Metalsheet') {
              return (
                <div>
                  <div className="flex flex-row my-2 py-2 px-4 " key={i}>
                    <div className="w-1/6"> {group.text} </div>
                    <div className="w-3/6 mx-3 ">
                      <Select
                        name={`${roof.no}` + '_product_' + `${group.index}`}
                        register={register({
                          validate: {
                            notEmpty: value => value !== '',
                          },
                        })}
                        options={group.products.map(i => i.name)}
                      />
                    </div>
                  </div>
                  <ul className="list-disc px-16">
                    {ItemCalculation(roof, group.index).map((no, i) => {
                      console.log(no);
                      return (
                        <li className="">
                          <div className="flex flex-row pb-2 ml-4 " key={i}>
                            <div className="w-3/12"> ความยาว </div>
                            <div className=" w-3/12 ml-4">
                              <TextInput
                                name={
                                  `${roof.no}` + '_length_' + `${group.index}`
                                }
                                register={register}
                                defaultValue={no.long}
                              />
                            </div>
                            <div className="w-2/12 ml-4">เมตร </div>
                            <div className="w-2/12 ml-16"> จำนวน </div>
                            <div className=" w-3/12 ml-4">
                              <TextInput
                                name={
                                  `${roof.no}` + '_amount_' + `${group.index}`
                                }
                                register={register}
                                defaultValue={no.total}
                              />
                            </div>
                            <div className="w-2/12 ml-4"> {group.unit} </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            } else {
              return (
                <div className="flex flex-row my-2 py-2 px-4 " key={i}>
                  <div className="w-1/6"> {group.text} </div>
                  <div className="w-3/6 mx-3 ">
                    <Select
                      name={`${roof.no}` + '_product_' + `${group.index}`}
                      register={register({
                        validate: {
                          notEmpty: value => value !== '',
                        },
                      })}
                      options={group.products.map(i => i.name)}
                    />
                  </div>
                  <div className=" w-2/12  mx-3">
                    <TextInput
                      name={`${roof.no}` + '_amount_' + `${group.index}`}
                      register={register}
                      defaultValue={ItemCalculation(roof, group.index)}
                    />
                  </div>
                  <div className="w-1/6"> {group.unit} </div>
                </div>
              );
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

const PreQuatation = ({ roofs, addOrder }) => {
  const [roofsData, setRoofsData] = useState([]);
  const { register, handleSubmit, watch, errors } = useForm();

  useEffect(() => {
    setRoofsData(roofs);
  }, [roofs]);

  const addToCartClick = data => {
    console.log(' add cart click');
    console.log(data);
    let prodType = Groups.type;
    let _tempOrder = {};
    let _orders = [];
    let _roofs = [...roofsData];
    let _no = 0;
    let _prod = '';
    let _type = '';

    R.keys(data).map(key => {
      _no = parseInt(key.substring(0, key.indexOf('_')));
      _roofs.map(roof =>
        parseInt(roof.no) === _no ? (_type = roof.type) : ''
      );
      let _temp = { no: _no, type: _type, products: [] };
      if (!R.contains(_temp, _orders)) _orders.push(_temp);
    });

    R.keys(data).map(_prodKey => {
      if (R.contains('product', _prodKey)) {
        // console.log(_prodKey);
        _tempOrder = {};
        let _noProd = parseInt(R.split('_', _prodKey)[0]);
        let _pGroup = R.split('_', _prodKey)[2];

        _prod = data[_prodKey];
        R.keys(data).map(_amountKey => {
          let _noUnit = parseInt(R.split('_', _amountKey)[0]);
          let length = '';
          if (
            R.contains('amount', _amountKey) &&
            R.contains(_pGroup, _amountKey) &&
            _noProd === _noUnit
          ) {
            R.keys(data).map(_lengthKey => {
              if (
                R.contains('length', _lengthKey) &&
                R.contains(_pGroup, _lengthKey) &&
                R.contains(_noUnit, _lengthKey)
              ) {
                length = ' ขนาด ' + data[_lengthKey] + ' เมตร';
                _tempOrder['length'] = data[_lengthKey];
              }
            });

            _tempOrder['name'] = _prod + length;
            _tempOrder['amount'] = data[_amountKey];
            _tempOrder['price'] = getProductPrice(prodType, _prod);
            _tempOrder['unit'] = getProductUnit(prodType, _prod);
            _tempOrder['index'] = R.split('_', _amountKey)[2];
          }
        });

        _orders.map((order, i) => {
          if (order.no === _noProd) {
            _orders[i]['products'].push(_tempOrder);
          }
        });
        // console.log(_orders);
      }
    });
    let order = { group: GroupName, areas: _orders };
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
                  onClick={() => navigate('/metalsheet/customerdata')}
                  type="button"
                  label="Back"
                />
              </div>
              <div className="flex items-center text-3xl">Metalsheet</div>
              <div className="flex w-auto">
                <Button type="button" label="Next" />
              </div>
            </div>
            <div className="mt-3">
              <form onSubmit={handleSubmit(addToCartClick)}>
                <div>
                  {roofsData.map((roof, roof_index) => {
                    return (
                      <RoofProductDetail
                        roof={roof}
                        roof_index={roof_index}
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

PreQuatation.propTypes = {
  addOrder: PropTypes.func,
  roofs: PropTypes.array,
};

PreQuatation.defaultProps = { roofs: [], addOrder: () => {} };

const mapDispatchToProps = dispatch => {
  return {
    addOrder: orders => dispatch(actions.addOrder(orders)),
  };
};

const mapStateToProps = state => ({ roofs: state.Customer.roofs });

export default connect(mapStateToProps, mapDispatchToProps)(PreQuatation);
=======
import React, { forwardRef, useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as R from 'ramda';
import Layout from 'components/layout';
import PropTypes, { object } from 'prop-types';
import { Select, TextInput, AddCartButton, Button } from 'components/common';
import {
  ProductGroups,
  getProductPrice,
  getProductUnit,
} from 'data/mockup-data';
import { actions } from 'data/reducers/order';
import { Metalsheet } from 'util/calculator';

//Groups need to be loaded from DB, created by admin
const GroupName = 'Metalsheet';
const Groups = R.find(R.propEq('type', GroupName))(ProductGroups);

const RoofProductDetail = forwardRef(
  ({ roof, roof_index, register, errors }, ref) => {
    const ItemCalculation = (roof, group) => {
      console.log(group);
      // console.log(group.products.map(i => i.name));
      if (group === 'Metalsheet') {
        //console.log(group.products.map(i => i.name));
        const result = Metalsheet.getMetalsheets(
          roof.type,
          roof.data.A,
          roof.data.B,
          roof.data.C
        );
        console.log(result);
        return result;
      }
      if (group === 'Screw') {
        //console.log(group.products.map(i => i.name));
        const result = Metalsheet.getScrews(
          roof.type,
          roof.data.A,
          roof.data.B,
          roof.data.C,
          roof.data.pDist
        );

        return result;
      }
      return 1;
    };

    return (
      <div key={roof_index}>
        <div className="flex  border border-gray-500 bg-blue-400 p-2 rounded-t-md">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <div className="mx-2 text-2xl font-bold">Area No. {roof.no} </div>
              <div className="mx-3 text-2xl font-bold">{roof.type}</div>
            </div>
            <div className="flex flex-row">
              {roof.data.A ? (
                <div className="mx-3"> A = {roof.data.A} m.</div>
              ) : (
                <div></div>
              )}
              {roof.data.B ? (
                <div className="mx-3"> B = {roof.data.B} m.</div>
              ) : (
                <div></div>
              )}
              {roof.data.C ? (
                <div className="mx-3"> C = {roof.data.C} m.</div>
              ) : (
                <div></div>
              )}
              {roof.data.pDist ? (
                <div className="mx-3"> ระยะแป = {roof.data.pDist} m.</div>
              ) : (
                <div></div>
              )}
              {roof.data.topCover ? (
                <div className="mx-3"> ครอบจั่ว </div>
              ) : (
                <div></div>
              )}
              {roof.data.endCurve ? (
                <div className="mx-3"> ย้ำโค้ง </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
        <div className="border border-gray-500  rounded-b-md">
          {Groups.groups.map((group, i) => {
            if (group.index === 'Metalsheet') {
              return (
                <div>
                  <div className="flex flex-row my-2 py-2 px-4 " key={i}>
                    <div className="w-1/6"> {group.text} </div>
                    <div className="w-3/6 mx-3 ">
                      <Select
                        name={`${roof.no}` + '_product_' + `${group.index}`}
                        register={register({
                          validate: {
                            notEmpty: value => value !== '',
                          },
                        })}
                        options={group.products.map(i => i.name)}
                      />
                    </div>
                  </div>
                  <ul className="list-disc px-16">
                    {ItemCalculation(roof, group.index).map((no, i) => {
                      console.log(no);
                      return (
                        <li className="">
                          <div className="flex flex-row pb-2 ml-4 " key={i}>
                            <div className="w-3/12"> ความยาว </div>
                            <div className=" w-3/12 ml-4">
                              <TextInput
                                name={
                                  `${roof.no}` + '_length_' + `${group.index}`
                                }
                                register={register}
                                defaultValue={no.long}
                              />
                            </div>
                            <div className="w-2/12 ml-4">เมตร </div>
                            <div className="w-2/12 ml-16"> จำนวน </div>
                            <div className=" w-3/12 ml-4">
                              <TextInput
                                name={
                                  `${roof.no}` + '_amount_' + `${group.index}`
                                }
                                register={register}
                                defaultValue={no.total}
                              />
                            </div>
                            <div className="w-2/12 ml-4"> {group.unit} </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            } else {
              return (
                <div className="flex flex-row my-2 py-2 px-4 " key={i}>
                  <div className="w-1/6"> {group.text} </div>
                  <div className="w-3/6 mx-3 ">
                    <Select
                      name={`${roof.no}` + '_product_' + `${group.index}`}
                      register={register({
                        validate: {
                          notEmpty: value => value !== '',
                        },
                      })}
                      options={group.products.map(i => i.name)}
                    />
                  </div>
                  <div className=" w-2/12  mx-3">
                    <TextInput
                      name={`${roof.no}` + '_amount_' + `${group.index}`}
                      register={register}
                      defaultValue={ItemCalculation(roof, group.index)}
                    />
                  </div>
                  <div className="w-1/6"> {group.unit} </div>
                </div>
              );
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

const PreQuatation = ({ roofs, addOrder }) => {
  const [roofsData, setRoofsData] = useState([]);
  const { register, handleSubmit, watch, errors } = useForm();

  useEffect(() => {
    setRoofsData(roofs);
  }, [roofs]);

  const addToCartClick = data => {
    console.log(' add cart click');
    console.log(data);
    let prodType = Groups.type;
    let _tempOrder = {};
    let _orders = [];
    let _roofs = [...roofsData];
    let _no = 0;
    let _prod = '';
    let _type = '';

    R.keys(data).map(key => {
      _no = parseInt(key.substring(0, key.indexOf('_')));
      _roofs.map(roof =>
        parseInt(roof.no) === _no ? (_type = roof.type) : ''
      );
      let _temp = { no: _no, type: _type, products: [] };
      if (!R.contains(_temp, _orders)) _orders.push(_temp);
    });

    R.keys(data).map(_prodKey => {
      if (R.contains('product', _prodKey)) {
        // console.log(_prodKey);
        _tempOrder = {};
        let _noProd = parseInt(R.split('_', _prodKey)[0]);
        let _pGroup = R.split('_', _prodKey)[2];

        _prod = data[_prodKey];
        R.keys(data).map(_amountKey => {
          let _noUnit = parseInt(R.split('_', _amountKey)[0]);
          let length = '';
          if (
            R.contains('amount', _amountKey) &&
            R.contains(_pGroup, _amountKey) &&
            _noProd === _noUnit
          ) {
            R.keys(data).map(_lengthKey => {
              if (
                R.contains('length', _lengthKey) &&
                R.contains(_pGroup, _lengthKey) &&
                R.contains(_noUnit, _lengthKey)
              ) {
                length = ' ขนาด ' + data[_lengthKey] + ' เมตร';
                _tempOrder['length'] = data[_lengthKey];
              }
            });

            _tempOrder['name'] = _prod + length;
            _tempOrder['amount'] = data[_amountKey];
            _tempOrder['price'] = getProductPrice(prodType, _prod);
            _tempOrder['unit'] = getProductUnit(prodType, _prod);
            _tempOrder['index'] = R.split('_', _amountKey)[2];
          }
        });

        _orders.map((order, i) => {
          if (order.no === _noProd) {
            _orders[i]['products'].push(_tempOrder);
          }
        });
        // console.log(_orders);
      }
    });
    let order = { group: GroupName, areas: _orders };
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
                  onClick={() => navigate('/metalsheet/customerdata')}
                  type="button"
                  label="Back"
                />
              </div>
              <div className="flex items-center text-3xl">Metalsheet</div>
              <div className="flex w-auto">
                <Button type="button" label="Next" />
              </div>
            </div>
            <div className="mt-3">
              <form onSubmit={handleSubmit(addToCartClick)}>
                <div>
                  {roofsData.map((roof, roof_index) => {
                    return (
                      <RoofProductDetail
                        roof={roof}
                        roof_index={roof_index}
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

PreQuatation.propTypes = {
  addOrder: PropTypes.func,
  roofs: PropTypes.array,
};

PreQuatation.defaultProps = { roofs: [], addOrder: () => {} };

const mapDispatchToProps = dispatch => {
  return {
    addOrder: orders => dispatch(actions.addOrder(orders)),
  };
};

const mapStateToProps = state => ({ roofs: state.Customer.roofs });

export default connect(mapStateToProps, mapDispatchToProps)(PreQuatation);
>>>>>>> b23ac42965c58d56aa202044243f3a891b98e3cd
