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
import { Slab } from 'util/calculator';
import { slabLongType } from '../../data/mockup-data';

//Groups need to be loaded from DB, created by admin
const GroupName = 'Slab';
const Groups = R.find(R.propEq('type', GroupName))(ProductGroups);

const SlabProductDetail = forwardRef(
  ({ area, area_index, register, errors }, ref) => {
    const ItemCalculation = area => {
      console.log(area);
      // console.log(area);
      // console.log(group.products.map(i => i.name));

      let result = 0;
      result = Slab.getSlabs(area.A, area.B);
      return result;
    };

    const getSlabProductType = long => {
      // console.log(Groups.groups);
      let _slabTypes = [];
      Groups.groups.map((group, i) => {
        // console.log(group);
        if (group.index === 'แผ่นพื้นคอนกรีต') {
          // console.log(group.products);
          _slabTypes = group.products.filter(_s => _s.long === long);
        }
      });
      console.log(_slabTypes);
      console.log(Groups.groups);
      let result = Groups.groups.products.map(_s => {
        return _s.name;
      });
      // console.log(result);
      return result;
    };

    return (
      <div key={area_index}>
        <div className="flex  border border-gray-500 bg-blue-400 p-2 rounded-t-md">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <div className="mx-2 text-2xl font-bold">Area No. {area.no} </div>
            </div>
            <div className="flex flex-row">
              {area.data.A ? (
                <div className="mx-3"> A = {area.data.A} m.</div>
              ) : (
                <div></div>
              )}
              {area.data.B ? (
                <div className="mx-3"> B = {area.data.B} m.</div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
        <div className="border border-gray-500  rounded-b-md">
          {Groups.groups.map((group, i) => {
            return (
              <div
                className="flex flex-row my-2 py-2 px-4 items-center "
                key={i}
              >
                <div className="w-3/12"> {group.text} </div>
                <div className="w-1/12"> ยาว </div>
                <div className="w-1/12">
                  <TextInput
                    name={`${area.no}` + '_length_' + `${group.index}`}
                    register={register}
                    defaultValue={area.data.B}
                  />
                </div>
                <div className="w-1/12 "> เมตร </div>
                <div className="w-1/6"> จำนวนเหล็กเส้น </div>
                <div className="w-3/12 mx-3 ">
                  <Select
                    name={`${area.no}` + '_product_' + `${group.index}`}
                    register={register({
                      validate: {
                        notEmpty: value => value !== '',
                      },
                    })}
                    defaultText="จำนวนเหล็กเส้น"
                    options={group.products.map(i => i.name)}
                  />
                </div>
                <div className=" w-1/12 mx-3">
                  <TextInput
                    name={`${area.no}` + '_amount_' + `${group.index}`}
                    register={register}
                    defaultValue={ItemCalculation(area.data)}
                  />
                </div>
                <div className="w-1/6"> แผ่น</div>
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
  }
);

const PreQuatation = ({ slabs, addOrder }) => {
  const [slabsData, setSlabsData] = useState([]);
  const { register, handleSubmit, watch, errors } = useForm();

  useEffect(() => {
    setSlabsData(slabs);
  }, [slabs]);

  function SheetCalculation() {
    // console.log('shhet calculation');
    return 10;
  }
  const addToCartClick = data => {
    console.log(' add cart click');
    console.log(data);
    let prodType = Groups.type;
    let _tempOrder = {};
    let _orders = [];
    let _slabs = [...slabsData];
    let _no = 0;
    let _prod = '';
    let _type = '';

    R.keys(data).map(key => {
      _no = parseInt(key.substring(0, key.indexOf('_')));
      _slabs.map(slab =>
        parseInt(slab.no) === _no ? (_type = slab.type) : ''
      );
      let _temp = { no: _no, type: _type ? _type : '', products: [] };
      if (!R.contains(_temp, _orders)) _orders.push(_temp);
    });

    R.keys(data).map(_prodKey => {
      if (R.contains('product', _prodKey)) {
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
                length = ' ขนาด ' + data[_lengthKey] + ' เมตร ';
                _tempOrder['length'] = data[_lengthKey];
              }
            });

            _tempOrder['name'] = length + ' เหล็ก ' + _prod;
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
                  onClick={() => navigate('/slab/customerdata')}
                  type="button"
                  label="Back"
                />
              </div>
              <div className="flex items-center text-3xl">แผ่นพื้นคอนกรีต</div>
              <div className="flex w-auto">
                <Button type="button" label="Next" />
              </div>
            </div>
            <div className="mt-3">
              <form onSubmit={handleSubmit(addToCartClick)}>
                <div>
                  {slabsData.map((slab, slab_index) => {
                    return (
                      <SlabProductDetail
                        area={slab}
                        area_index={slab_index}
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
  slabs: PropTypes.array,
};

PreQuatation.defaultProps = { slabs: [], addOrder: () => {} };

const mapDispatchToProps = dispatch => {
  return {
    addOrder: orders => dispatch(actions.addOrder(orders)),
  };
};

const mapStateToProps = state => ({ slabs: state.Customer.slabs });

export default connect(mapStateToProps, mapDispatchToProps)(PreQuatation);
