import React, { useState, useEffect, forwardRef } from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Button } from 'components/common';
import Layout from 'components/layout';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';
import { actions } from 'data/reducers/customer';
// import lanhoi from 'images/lanhoi.png';

const WideLongInput = forwardRef(
  ({ i, valueChange, register, roofData }, ref) => {
    const [roofValue, setRoofValue] = useState({ no: i, wide: 0, long: 0 });

    useEffect(() => {
      valueChange(i, roofValue);
    }, [roofValue]);

    const handleValueChange = (e, side) => {
      e.preventDefault();
      const value = e.target.value;
      const _roofValue = { ...roofValue };
      side === 'wide'
        ? (_roofValue.wide = value * 1)
        : (_roofValue.long = value * 1);
      setRoofValue(_roofValue);
    };

    return (
      <div className="mt-2 border rounded p-5">
        <div>Area No. {i}</div>
        <div className="flex flex-row mt-2">
          <div className="flex w-1/2">
            <div className="flex items-center "> Wide </div>
            <input
              name={'wide_' + `${i}`}
              defaultValue={roofData.wide}
              type="text"
              className={
                ' w-1/2 shadow appearance-none border rounded py-2 px-3 mx-5' +
                ' text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              }
              ref={register({
                validate: {
                  positiveNumber: value => parseFloat(value) > 0,
                },
              })}
              onChange={e => {
                handleValueChange(e, 'wide');
              }}
            />
          </div>
          <div className="flex w-1/2">
            <div className="flex items-center "> Long </div>
            <input
              name={'long_' + `${i}`}
              type="text"
              defaultValue={roofData.long}
              className={
                ' w-1/2 shadow appearance-none border rounded py-2 px-3 mx-5' +
                ' text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              }
              ref={register({
                validate: {
                  positiveNumber: value => parseFloat(value) > 0,
                },
              })}
              onChange={e => {
                handleValueChange(e, 'long');
              }}
            />
            <div className="flex items-center">M.</div>
          </div>
        </div>
      </div>
    );
  }
);

WideLongInput.propsType = {
  i: PropTypes.number,
  valueChange: PropTypes.func,
  register: PropTypes.func,
  roofData: PropTypes.object,
};

WideLongInput.defaultProps = {
  i: 1,
  valueChange: () => {},
  register: () => {},
  roofData: { no: 1, wide: 0, long: 0 },
};

const CustomerData = ({ setRoofArea, roofs }) => {
  const [RoofArea, addRoof] = useState([]);
  const [RoofValue, setRoofValue] = useState([]);
  const { register, handleSubmit, watch, errors } = useForm();

  const handleNext = data => {
    console.log(RoofValue);
    // console.log(data);
    setRoofArea(RoofValue);
    navigate('metalsheet/prequatation');
  };

  useEffect(() => {
    // console.log(roofs);
    if (roofs.length > 0) {
      setRoofValue(roofs);
    }
  }, [roofs]);

  const roofValueChange = (i, value) => {
    const _roofValue = [...RoofValue];
    let _i = 0;

    const _roofIndex = R.findIndex(R.propEq('no', i))(_roofValue);
    _roofIndex === -1
      ? _roofValue.push(value)
      : (_roofValue[_roofIndex] = value);

    setRoofValue(_roofValue);
  };

  const addRoofArea = () => {
    const _area = [...RoofArea];
    const _i = _area.length + 2;
    addRoof(area =>
      area.concat(
        <WideLongInput
          i={_i}
          key={_i}
          valueChange={roofValueChange}
          register={register}
        />
      )
    );
  };

  const RoofsDataComponent = () => {
    // console.log('roof data commpoent');
    // console.log(roofs);
    if (roofs && roofs.length > 0) {
      // console.log(roofs.length);
      return roofs.map((roof, i) => {
        return (
          <WideLongInput
            i={i + 1}
            key={i + 1}
            valueChange={roofValueChange}
            roofData={roof}
            register={register}
          />
        );
      });
    } else {
      return (
        <WideLongInput
          i={1}
          key="1"
          valueChange={roofValueChange}
          register={register}
        />
      );
    }
  };

  return (
    <Layout
      renderContent={() => {
        return (
          <div className="sm:w-full md:w-5/6 xl:w-1/2">
            <form onSubmit={handleSubmit(handleNext)}>
              <div className="flex flex-row justify-between">
                <div className="text-gray-700 text-sm font-bold ">
                  CustomerData
                </div>
                <Button
                  // to="/metalsheet/prequatation"
                  type="submit"
                  label="Next"
                >
                  Next
                </Button>
              </div>
              {RoofsDataComponent()}
              {RoofArea}
              <div className="text-red-700 border-red-400 mt-4 py-2 px-4">
                {Object.keys(errors).length > 0 &&
                  'There are errors, dimensions must be number and great than 0.'}
              </div>
            </form>

            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
              onClick={() => addRoofArea()}
            >
              Add Roof Area
            </button>
          </div>
        );
      }}
    ></Layout>
  );
};

CustomerData.propTypes = {
  setRoofArea: PropTypes.func,
  roofs: PropTypes.array,
};

CustomerData.defaultProps = {
  setRoofArea: () => {},
  roofs: [],
};

const mapDispatchToProps = dispatch => {
  return {
    setRoofArea: areas => dispatch(actions.setRoof(areas)),
  };
};

const mapStateToPProps = state => ({ roofs: state.Customer.roofs });

export default connect(mapStateToPProps, mapDispatchToProps)(CustomerData);
