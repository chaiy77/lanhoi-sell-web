import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as R from 'ramda';
import Layout from 'components/layout';
import PropTypes, { object } from 'prop-types';
import { Select, TextInput, AddCartButton, Button } from 'components/common';
import { ProductGroups } from 'data/mockup-data';

//Groups need to be loaded from DB, created by admin
const Groups = R.find(R.propEq('type', 'MetalSheet'))(ProductGroups);
const itemTest = { name: 'test' };

const PreQuatation = ({ roofs }) => {
  const [itemList, setItemList] = useState([]);
  const { register, handleSubmit, watch, errors } = useForm();

  function SheetCalculation(w, h) {
    console.log(w);
    return 10;
  }

  const changeItemList = (e, group, area, type) => {
    // console.log('change item');
    // console.log(e.target.value);
    // console.log(group, area, type);
    // const value = e.target.value;
    // let _roofs = [...roofs];
    // const _areaIndex = R.findIndex(R.propEq('no', area))(_roofs);
    // console.log(_areaIndex);
    // const _product = R.merge(R.find(R.propEq('no', area))(_roofs), {
    //   [group]: value,
    // });
    // console.log(_product);
    // _roofs[_areaIndex] = _product;
    // console.log(_roofs);
  };

  const addToCartClick = data => {
    console.log(' add cart click');
    console.log(data);
    let prodType = Groups.groups;
    console.log(prodType);
    let _temp = {};
    let _orders = [];
    let _dataTemp;
    let _roofs = [...roofs];
    let _no = 0;

    _roofs.map(roof => {
      _orders = [];
      prodType.map(_type => {
        console.log(_type);
        console.log('*******', _type, '**********');
        _temp = { type: _type };
        R.keys(data).map(_prod => {
          _no = parseInt(_prod.substring(0, _prod.indexOf('_')));
          if (_prod.search(_type) > 0 && roof.no === _no) {
            console.log('*******', _prod, '**********');
            //set name/sku of product
            if (_prod.search('product') > 0 && data[_prod] !== '') {
              _temp['name'] = data[_prod];
            }

            //set amount of product
            if (
              _prod.search('unit') > 0 &&
              data[_prod] !== '' &&
              data[_prod] * 1 > 0
            ) {
              console.log(_type, data[_prod]);
              _temp['amount'] = data[_prod];
            }

            if (R.both(R.has('name'), R.has('amount'))(_temp)) {
              console.log(_temp);
              _orders.push(_temp);
              roof['orders'] = _orders;
              // _orders.push(_temp);
              // _roofs.map((area, idx) => {
              //   if (area.no === _no) area['orders'] = _orders;
              // });
              console.log('ROOFS : ', _roofs);
            }
          }
        });

        // if (R.both(R.has('name'), R.has('amount'))(_temp)) {
        //   _orders.push(_temp);
        //   roof['orders'] = _orders;
        //   // _roofs.map((area, idx) => {
        //   //   if (area.no === _no) area['orders'] = _orders;
        //   // });
        //   console.log(_roofs);
        // }
      });
    });
  };

  return (
    <Layout
      renderContent={() => {
        return (
          <div className="sm:w-full md:w-5/6 xl:w-1/2">
            <form onSubmit={handleSubmit(addToCartClick)}>
              <div className="flex items-center">Metal Sheet</div>
              <div>
                {roofs.map((area, area_index) => {
                  const w = area.wide;
                  const l = area.long;
                  return (
                    <div key={area_index}>
                      <div className="flex flex-row border border-gray-500 bg-blue-400 p-2 rounded-t-md">
                        <div className="mx-2">Area No. {area.no} </div>
                        <div className="mx-3"> Wide = {w} m.</div>
                        <div className="mx-3"> long = {l} m.</div>
                      </div>
                      <div className="border border-gray-500  rounded-b-md">
                        {Groups.groups.map((group, i) => {
                          return (
                            <div
                              className="flex flex-row my-2 py-2 px-4 "
                              key={i}
                            >
                              <div className="w-1/6"> {group} </div>
                              <div className="w-3/6 mx-3 ">
                                <Select
                                  name={`${area.no}` + '_product_' + `${group}`}
                                  register={register}
                                  onChange={e =>
                                    changeItemList(e, group, area.no, 'product')
                                  }
                                />
                              </div>
                              <div className=" w-1/6 mx-3">
                                <TextInput
                                  name={`${area.no}` + '_unit_' + `${group}`}
                                  register={register}
                                  text="xxx"
                                  onChange={e =>
                                    changeItemList(e, group, area.no, 'unit')
                                  }
                                />
                              </div>
                              <div className="w-1/6"> units</div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="text-red-700 border-red-400 mt-1 mb-3 py-2 px-4">
                        {Object.keys(errors).length > 0 &&
                          'There are some error, empty product OR unit'}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div>
                {/* <AddCartButton item={itemTest} /> */}
                <Button label="Add to Cart" type="submit" />
              </div>
            </form>
          </div>
        );
      }}
    ></Layout>
  );
};

PreQuatation.propTypes = {
  roofs: PropTypes.arrayOf(
    PropTypes.shape({
      no: PropTypes.number,
      wide: PropTypes.number,
      long: PropTypes.number,
    })
  ),
};

PreQuatation.defaultProps = {};

const mapStateToProps = state => ({ roofs: state.Customer.roofs });

export default connect(mapStateToProps, null)(PreQuatation);
