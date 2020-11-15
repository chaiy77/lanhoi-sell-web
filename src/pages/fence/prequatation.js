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
  getProductPrice,
  getProductUnit,
} from 'data/mockup-data';
import { Fence } from 'util/calculator';

//Groups need to be loaded from DB, created by admin
const GroupName = 'รั้วคอนกรีต';
const Groups = R.find(R.propEq('type', GroupName))(ProductGroups);

const FenceProductDetail = forwardRef(
  ({ area, area_index, register, errors }, ref) => {
    const ItemCalculation = (group, area) => {
      // onsole.log('shhet calculation');
      console.log(area);
      console.log(group);
      // console.log(area);
      // console.log(group.products.map(i => i.name));

      let result = 0;
      if (group.index === 'แผ่นรั้ว')
        result = Fence.getFenceSheets(area.data.B, area.data.A);
      if (group.index === 'เสารั้ว')
        result = Fence.getFenceColumns(area.data.A);
      console.log(result);
      return result;
    };

    return (
      <div key={area_index}>
        <div className="flex  border border-gray-500 bg-blue-400 p-2 rounded-t-md">
          <div className="flex flex-row items-end ">
            <div className="mx-2 text-2xl font-bold">Area No. {area.no} </div>
            <div className="mx-3 mb-1"> ยาว = {area.data.A}</div>
            <div className="mx-3 mb-1 "> สูง = {area.data.B}</div>
          </div>
        </div>
        <div className="border border-gray-500  rounded-b-md">
          {Groups.groups.map((group, i) => {
            // console.log(area.data.A);
            return (
              <div className="flex flex-row my-2 py-2 px-4 " key={i}>
                <div className="w-1/6"> {group.text} </div>
                <div className="w-3/6 mx-3 ">
                  <Select
                    name={`${area.no}` + '_product_' + `${group.index}`}
                    register={register({
                      validate: {
                        notEmpty: value => value !== '',
                      },
                    })}
                    options={group.products.map(i => i.name)}
                  />
                </div>
                <div className=" w-1/6 mx-3">
                  <TextInput
                    name={`${area.no}` + '_amount_' + `${group.index}`}
                    register={register}
                    defaultValue={ItemCalculation(group, area)}
                  />
                </div>
                <div className="w-1/6"> {group.unit}</div>
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

const FencePreQuatation = ({ areas, addOrder }) => {
  const [areaData, setRoofsData] = useState([]);
  const { register, handleSubmit, watch, errors } = useForm();

  useEffect(() => {
    console.log(areas);
    setRoofsData(areas);
  }, [areas]);

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
    console.log(_orders);

    R.keys(data).map(_prodKey => {
      if (R.contains('product', _prodKey)) {
        _tempOrder = {};
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
            _tempOrder['price'] = getProductPrice(prodType, _prod);
            _tempOrder['unit'] = getProductUnit(prodType, _prod);
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
    // console.log(order);
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
                  onClick={() => navigate('/fence/customerdata')}
                  type="button"
                  label="Back"
                />
              </div>
              <div className="flex items-center text-3xl">รั้วคอนกรีต</div>
              <div className="flex w-auto">
                <Button type="button" label="Next" />
              </div>
            </div>
            <div className="mt-3">
              <form onSubmit={handleSubmit(addToCartClick)}>
                <div>
                  {areaData.map((area, area_index) => {
                    return (
                      <FenceProductDetail
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

FencePreQuatation.propTypes = {
  addOrder: PropTypes.func,
  areas: PropTypes.array,
};

FencePreQuatation.defaultProps = { areas: [], addOrder: () => {} };

const mapDispatchToProps = dispatch => {
  return {
    addOrder: orders => dispatch(actions.addOrder(orders)),
  };
};

const mapStateToProps = state => ({ areas: state.Customer.fences });

export default connect(mapStateToProps, mapDispatchToProps)(FencePreQuatation);
// export default ConcretePreQuatation;
