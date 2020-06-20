import React, { useState, useEffect, forwardRef } from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Button, Select, Checkbox } from 'components/common';
import Layout from 'components/layout';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';
import { actions } from 'data/reducers/customer';

import { RoofTypes } from 'data/mockup-data';
import lanhoi from 'images/lanhoi.png';

const RoofDataIput = forwardRef(
  ({ i, valueChange, register, roofData, setValue }, ref) => {
    const [roofValue, setRoofValue] = useState({
      no: i,
      type: '',
      A: 0,
      B: 0,
      C: 0,
      pDist: 0,
      topCover: false,
      endCurve: false,
    });
    const [needA, setNeedA] = useState(true);
    const [needB, setNeedB] = useState(true);
    const [needC, setNeedC] = useState(true);
    const [roofTypes, setRoofTypes] = useState([]);

    useEffect(() => {
      console.log('set new roofValue', roofValue);
      valueChange(i, roofValue);
      console.log(roofData);
    }, [roofValue]);

    useEffect(() => {
      const _roofTypes = RoofTypes.map(r => r.name);
      console.log('roof types :', _roofTypes);
      setRoofTypes(_roofTypes);
    }, [RoofTypes]);

    const setInputInitValue = () => {
      setValue('A_' + `${i}`, 0);
      setValue('B_' + `${i}`, 0);
      setValue('C_' + `${i}`, 0);
      setValue('pDist_' + `${i}`, 0);
      setValue('topCover' + `${i}`, false);
      setValue('endCurve' + `${i}`, false);
    };

    const handleValueChange = (e, side) => {
      // e.preventDefault();
      const _roofValue = { ...roofValue };
      // side === 'wide'
      //   ? (_roofValue.wide = value * 1)
      //   : (_roofValue.long = value * 1);
      if (side === 'A') _roofValue.A = e.target.value * 1;
      if (side === 'B') _roofValue.B = e.target.value * 1;
      if (side === 'C') _roofValue.C = e.target.value * 1;
      if (side === 'pDist') _roofValue.pDist = e.target.value * 1;
      if (side === 'topCover') _roofValue.topCover = e;
      if (side === 'endCurve') _roofValue.endCurve = e;
      setRoofValue(_roofValue);
    };

    const changeRoofType = e => {
      const _type = e.target.value;
      const _roofValue = { ...roofValue };
      if (_type) {
        let _roofType = R.find(R.propEq('name', _type))(RoofTypes);
        setNeedA(_roofType.needA);
        setNeedB(_roofType.needB);
        setNeedC(_roofType.needC);
        _roofValue.type = _type;
        setRoofValue(_roofValue);
        setInputInitValue();
      }
    };

    const dataInputStyle =
      'w-4/6 shadow appearance-none border rounded py-1 px-2 mx-5 ' +
      ' text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

    const pDistInputStyle =
      'w-3/6 shadow appearance-none border rounded py-1 px-2' +
      ' text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

    return (
      <div className="mt-2 border rounded p-5">
        <div>Area No. {i}</div>
        <div className="flex justify-center items-center ">
          <div className="flex flex-col  justify-center items-center">
            <div className="flex flex-row ">
              <div>รูปแบบหลังคา</div>
              <Select
                name={'no' + `${i}`}
                onChange={e => changeRoofType(e)}
                options={roofTypes}
                register={register}
              />
            </div>
            <div className="flex ">
              <img src={lanhoi} />
            </div>
            <div className="flex flex-row flex-wrap  ">
              <div className="flex flex-col  sm:w-full md:w-1/2 xl:w-1/2 ">
                <div className="flex flex-row mt-2">
                  <div className="">A :</div>
                  <input
                    name={'A_' + `${i}`}
                    defaultValue={roofData.A}
                    type="text"
                    disabled={!needA}
                    className={dataInputStyle}
                    ref={
                      !needA
                        ? register
                        : register({
                            validate: {
                              positiveNumber: value => parseFloat(value) > 0,
                            },
                          })
                    }
                    onChange={e => {
                      handleValueChange(e, 'A');
                    }}
                  />
                </div>

                <div className="flex flex-row mt-2 ">
                  <div>B :</div>
                  <input
                    name={'B_' + `${i}`}
                    defaultValue={roofData.B}
                    type="text"
                    disabled={!needB}
                    className={dataInputStyle}
                    ref={
                      !needB
                        ? register
                        : register({
                            validate: {
                              positiveNumber: value => parseFloat(value) > 0,
                            },
                          })
                    }
                    onChange={e => {
                      handleValueChange(e, 'B');
                    }}
                  />
                </div>
                <div className="flex flex-row mt-2 ">
                  <div>C :</div>
                  <input
                    name={'C_' + `${i}`}
                    defaultValue={roofData.C}
                    type="text"
                    disabled={!needC}
                    className={dataInputStyle}
                    ref={
                      !needC
                        ? register
                        : register({
                            validate: {
                              positiveNumber: value => {
                                console.log(value);
                                parseFloat(value) > 0;
                              },
                            },
                          })
                    }
                    onChange={e => {
                      handleValueChange(e, 'C');
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:w-full md:w-1/2 xl:w-1/2">
                <div className="flex flex-row mt-2">
                  <div className="w-20">ระยะแป :</div>
                  <input
                    name={'pDist_' + `${i}`}
                    defaultValue={roofData.pDist}
                    type="text"
                    className={pDistInputStyle}
                    ref={register({
                      validate: {
                        positiveNumber: value => parseFloat(value) > 0,
                      },
                    })}
                    onChange={e => {
                      handleValueChange(e, 'pDist');
                    }}
                  />
                </div>
                <div className="flex flex-row mt-3">
                  <div className="w-20">ครอบจั่ว :</div>
                  <Checkbox
                    name={'topCover' + `${i}`}
                    onCheck={e => {
                      handleValueChange(e, 'topCover');
                    }}
                    register={register}
                  />
                </div>
                <div className=" flex flex-row  mt-3 ">
                  <div className="w-20">ย้ำโค้ง :</div>

                  <Checkbox
                    name={'endCurve' + `${i}`}
                    onCheck={e => {
                      handleValueChange(e, 'endCurve');
                    }}
                    register={register}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

RoofDataIput.propsType = {
  i: PropTypes.number,
  valueChange: PropTypes.func,
  register: PropTypes.func,
  roofData: PropTypes.object,
  setValue: PropTypes.func,
};

RoofDataIput.defaultProps = {
  i: 1,
  valueChange: () => {},
  register: () => {},
  setValue: () => {},
  roofData: {
    no: 1,
    A: 0,
    B: 0,
    C: 0,
    pDist: 0,
    topCover: false,
    endCurve: false,
    type: '',
  },
};

const CustomerData = ({ setRoofArea, roofs }) => {
  const [RoofArea, addRoof] = useState([]);
  const [RoofValue, setRoofValue] = useState([]);
  const { register, handleSubmit, setValue, watch, errors } = useForm();

  const handleNext = data => {
    console.log(RoofValue);
    console.log('data:', data);
    //add roof data to redux
    setRoofArea(RoofValue);
    //navigate('metalsheet/prequatation');
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

    console.log(_roofValue);
    setRoofValue(_roofValue);
  };

  const addRoofArea = () => {
    const _area = [...RoofArea];
    const _i = _area.length + 2;
    addRoof(area =>
      area.concat(
        <RoofDataIput
          i={_i}
          key={_i}
          //valueChange={roofValueChange}
          register={register}
          setValue={setValue}
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
          <RoofDataIput
            i={i + 1}
            key={i + 1}
            //valueChange={roofValueChange}
            roofData={roof}
            register={register}
            setValue={setValue}
          />
        );
      });
    } else {
      return (
        <RoofDataIput
          i={1}
          key="1"
          //valueChange={roofValueChange}
          register={register}
          setValue={setValue}
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
