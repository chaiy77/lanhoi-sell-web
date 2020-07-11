import React, { useState, useEffect, forwardRef } from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { Button, Select, Checkbox } from 'components/common';
import Layout from 'components/layout';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';
import { actions } from 'data/reducers/customer';

import { RoofTypes } from 'data/mockup-data';
import lanhoi from 'images/lanhoi.png';

const RoofDataIput = forwardRef(
  ({ i, valueChange, register, roofData, setValue }, ref) => {
    const [needA, setNeedA] = useState(true);
    const [needB, setNeedB] = useState(true);
    const [needC, setNeedC] = useState(true);
    const [roofTypes, setRoofTypes] = useState([]);

    useEffect(() => {
      // console.log('set new roofValue', roofValue);
      // valueChange(i, roofValue);
      console.log('useEffect : ', roofData);
      if (!R.isEmpty(roofData)) {
        console.log(roofData.data);
        setValue('A_' + `${i}`, roofData.data.A);
        setValue('B_' + `${i}`, roofData.data.B);
        setValue('C_' + `${i}`, roofData.data.C);
        setValue('pDist_' + `${i}`, roofData.data.pDist);
        // setValue('topCover_' + `${i}`, true);
        // setValue('endCurve_' + `${i}`, true);
      }
    }, [roofData]);

    //set rooftype for select
    useEffect(() => {
      const _roofTypes = RoofTypes.map(r => r.name);
      // console.log('roof types :', _roofTypes);
      setRoofTypes(_roofTypes);
    }, [RoofTypes]);

    const setInputInitValue = () => {
      setValue('A_' + `${i}`, 0);
      setValue('B_' + `${i}`, 0);
      setValue('C_' + `${i}`, 0);
      setValue('pDist_' + `${i}`, 0);
      setValue('topCover_' + `${i}`, false);
      setValue('endCurve_' + `${i}`, false);
    };
    const changeRoofType = e => {
      console.log(e.target.value);
      const _type = e.target.value;
      // const _roofValue = { ...roofValue };
      if (_type) {
        let _roofType = R.find(R.propEq('name', _type))(RoofTypes);
        setNeedA(_roofType.needA);
        setNeedB(_roofType.needB);
        setNeedC(_roofType.needC);
        // _roofValue.type = _type;
        // setRoofValue(_roofValue);
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
              <div className="flex px-5">
                <Select
                  options={roofTypes}
                  name={'no_' + `${i}`}
                  register={register}
                  onChange={e => changeRoofType(e)}
                  defaultValue={roofData.type}
                />
              </div>
            </div>
            <div className="flex border w-2/5  my-5">
              <img src={lanhoi} className="w-full h-full" />
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
                    // onChange={e => {
                    //   handleValueChange(e, 'A');
                    // }}
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
                    // onChange={e => {
                    //   handleValueChange(e, 'B');
                    // }}
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
                                parseFloat(value) > 0;
                              },
                            },
                          })
                    }
                    // onChange={e => {
                    //   handleValueChange(e, 'C');
                    // }}
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
                    // onChange={e => {
                    //   handleValueChange(e, 'pDist');
                    // }}
                  />
                </div>
                <div className="flex flex-row mt-3">
                  <div className="w-20">ครอบจั่ว :</div>
                  <Checkbox
                    name={'topCover_' + `${i}`}
                    register={register}
                    value={roofData.data.topCover}
                  />
                </div>

                <div className=" flex flex-row  mt-3 ">
                  <div className="w-20">ย้ำโค้ง :</div>
                  <Checkbox
                    name={'endCurve_' + `${i}`}
                    register={register}
                    value={roofData.data.endCurve}
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
    type: '',
    data: {
      A: 0,
      B: 0,
      C: 0,
      pDist: 0,
      topCover: false,
      endCurve: false,
    },
  },
};

const CustomerData = ({ setRoofArea, roofDatas }) => {
  const [RoofAreas, setRoofAreas] = useState([]);
  const [NewRoofArea, addNewRoof] = useState([]);
  const [RoofValue, setRoofValue] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    errors,
  } = useForm();

  useEffect(() => {
    if (roofDatas && roofDatas.length > 0) {
      let _roofs = roofDatas.map((roof, i) => {
        return (
          <RoofDataIput
            i={i + 1}
            key={i + 1}
            //valueChange={roofValueChange}
            roofData={roof}
            register={register}
            setValue={setValue}
            control={control}
          />
        );
      });
      setRoofAreas(_roofs);
    } else {
      let _roofs = (
        <RoofDataIput
          i={1}
          key="1"
          //valueChange={roofValueChange}
          register={register}
          setValue={setValue}
          control={control}
        />
      );
      setRoofAreas(_roofs);
    }
  }, [roofDatas]);

  const handleNext = data => {
    // console.log(RoofValue);
    console.log('data:', data);
    let _roofData = [];
    Object.keys(data).map((keyName, idx) => {
      if (R.contains('no', keyName)) {
        //roof no.
        let _roof = {};
        let _no = R.split('_', keyName)[1];
        //roof type
        let _type = data[keyName];
        _roof['no'] = _no;
        _roof['type'] = _type;
        _roof['data'] = {};
        // console.log(_no);
        // console.log(_type);
        console.log(_roof);
        Object.keys(data).map((k, i) => {
          if (R.contains(_no, k) && !R.contains('no', k)) {
            let _temp = R.split('_', k)[0];
            let _data = typeof data[k] !== 'boolean' ? data[k] * 1 : data[k];

            _roof['data'][_temp] = _data;
          }
        });
        _roofData.push(_roof);
      }
    });
    console.log(_roofData);

    //add roof data to redux
    // setRoofArea(RoofValue);
    setRoofArea(_roofData);
    navigate('metalsheet/prequatation');
  };

  const addRoofArea = () => {
    const _area = [...NewRoofArea];
    const _i = _area.length + 2;
    addNewRoof(area =>
      area.concat(
        <RoofDataIput
          i={_i}
          key={_i}
          //valueChange={roofValueChange}
          register={register}
          setValue={setValue}
          control={control}
        />
      )
    );
  };

  // const RoofsDataComponent = () => {
  //   console.log('call roof data component');
  //   if (roofDatas && roofDatas.length > 0) {
  //     console.log('roof data commpoent');
  //     console.log(roofDatas);
  //     return roofDatas.map((roof, i) => {
  //       console.log('add roof component');
  //       return (
  //         <RoofDataIput
  //           i={i + 1}
  //           key={i + 1}
  //           //valueChange={roofValueChange}
  //           roofData={roof}
  //           register={register}
  //           setValue={setValue}
  //         />
  //       );
  //     });
  //   } else {
  //     return (
  //       <RoofDataIput
  //         i={1}
  //         key="1"
  //         //valueChange={roofValueChange}
  //         register={register}
  //         setValue={setValue}
  //       />
  //     );
  //   }
  // };

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
                <div className="flex w-auto">
                  <Button type="submit" label="Next" />
                </div>
              </div>
              {RoofAreas}
              {NewRoofArea}
              <div className="text-red-700 border-red-400 mt-4 py-2 px-4">
                {Object.keys(errors).length > 0 &&
                  'There are errors, dimensions must be number and great than 0.'}
              </div>
            </form>
            <div className="flex w-full mx-5">
              <Button onClick={() => addRoofArea()} label="Add Roof" />
            </div>
          </div>
        );
      }}
    ></Layout>
  );
};

CustomerData.propTypes = {
  setRoofArea: PropTypes.func,
  roofData: PropTypes.array,
};

CustomerData.defaultProps = {
  setRoofArea: () => {},
  roofDatas: [],
};

const mapDispatchToProps = dispatch => {
  return {
    setRoofArea: areas => dispatch(actions.setRoof(areas)),
  };
};

const mapStateToProps = state => ({ roofDatas: state.Customer.roofs });

export default connect(mapStateToProps, mapDispatchToProps)(CustomerData);
