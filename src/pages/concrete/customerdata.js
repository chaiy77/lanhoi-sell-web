import React, { useState, useEffect, forwardRef } from 'react';
import Layout from 'components/layout';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from 'data/reducers/customer';

import { useForm, Controller } from 'react-hook-form';
import { Button, Select, Checkbox } from 'components/common';
import { navigate } from 'gatsby';
import { concreteUseType, ProductGroups } from 'data/mockup-data';

const GroupName = 'Concrete';
const Groups = R.find(R.propEq('type', GroupName))(ProductGroups);

const AreaDataInput = forwardRef(
  ({ i, valueChange, register, areaData, setValue }, ref) => {
    const dataInputStyle =
      'w-4/6 shadow appearance-none border rounded py-1 px-2 mx-5 ' +
      ' text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

    const [useTypes, setUseTypes] = useState([]);

    useEffect(() => {
      // console.log('set new roofValue', roofValue);
      // valueChange(i, roofValue);
      console.log('useEffect : ', areaData);
      if (!R.isEmpty(areaData)) {
        setValue('A_' + `${i}`, areaData.data.A);
        setValue('B_' + `${i}`, areaData.data.B);
        setValue('C_' + `${i}`, areaData.data.C);
      }
    }, [areaData]);

    useEffect(() => {
      const _useTypes = concreteUseType.map(c => c.name);
      console.log('concrete used types :', _useTypes);
      setUseTypes(_useTypes);
    }, []);

    return (
      <div className="mt-2 border rounded p-5">
        <div>Area No. {i}</div>
        <div className="flex justify-center items-center ">
          <div className="flex flex-col  justify-center items-center">
            <div className="flex flex-row ">
              <div>การใช้งาน</div>
              <div className="flex px-5">
                <Select
                  // options={roofTypes}
                  name={'no_' + `${i}`}
                  register={register}
                  // onChange={e => changeRoofType(e)}
                  options={useTypes}
                />
              </div>
            </div>

            <div className="flex flex-row flex-wrap  ">
              <div className="flex flex-col  ">
                <div className="flex flex-row mt-2 ">
                  <div className="w-1/6">กว้าง :</div>

                  <input
                    name={'A_' + `${i}`}
                    // defaultValue={roofData.A}
                    type="text"
                    // disabled={!needA}
                    className={dataInputStyle}
                    ref={register({
                      validate: {
                        positiveNumber: value => parseFloat(value) > 0,
                      },
                    })}
                    // onChange={e => {
                    //   handleValueChange(e, 'A');
                    // }}
                  />

                  <div className="w-1/6">เมตร</div>
                </div>

                <div className="flex flex-row mt-2 ">
                  <div className="w-1/6">ยาว :</div>
                  <input
                    name={'B_' + `${i}`}
                    // defaultValue={roofData.B}
                    type="text"
                    // disabled={!needB}
                    className={dataInputStyle}
                    ref={register({
                      validate: {
                        positiveNumber: value => parseFloat(value) > 0,
                      },
                    })}
                    // onChange={e => {
                    //   handleValueChange(e, 'B');
                    // }}
                  />
                  <div className="w-1/6">เมตร</div>
                </div>
                <div className="flex flex-row mt-2 ">
                  <div className="w-1/6">หนา :</div>
                  <input
                    name={'C_' + `${i}`}
                    // defaultValue={roofData.C}
                    type="text"
                    // disabled={!needC}
                    className={dataInputStyle}
                    ref={register({
                      validate: {
                        positiveNumber: value => {
                          parseFloat(value) > 0;
                        },
                      },
                    })}
                    // onChange={e => {
                    //   handleValueChange(e, 'C');
                    // }}
                  />
                  <div className="w-1/6">เมตร</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

AreaDataInput.propsType = {
  i: PropTypes.number,
  valueChange: PropTypes.func,
  register: PropTypes.func,
  areaData: PropTypes.object,
  setValue: PropTypes.func,
};

AreaDataInput.defaultProps = {
  i: 1,
  valueChange: () => {},
  register: () => {},
  setValue: () => {},
  areaData: {
    no: 1,
    type: '',
    data: {
      A: 0,
      B: 0,
      C: 0,
    },
  },
};

const ConcreteDataComponent = ({ areaData, setConcreteData }) => {
  const [Areas, setAreas] = useState([]);
  // const [NewArea, addNewArea] = useState([]);

  useEffect(() => {
    if (areaData && areaData.length > 0) {
      const _areas = areaData.map((area, i) => {
        return (
          <AreaDataInput
            i={i + 1}
            key={i + 1}
            register={register}
            areaData={area}
            setValue={setValue}
            control={control}
          />
        );
      });
      setAreas(_areas);
    } else {
      const _area = (
        <AreaDataInput
          i="1"
          key="1"
          register={register}
          setValue={setValue}
          control={control}
        />
      );
      setAreas(area => area.concat(_area));
    }
  }, [areaData]);

  const addNewArea = () => {
    const _area = [...Areas];

    setAreas(area =>
      area.concat(
        <AreaDataInput
          i={_area.length + 1}
          key={`${_area.length + 1}`}
          register={register}
          setValue={setValue}
          control={control}
        />
      )
    );
  };

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    errors,
  } = useForm();

  const handleNext = data => {
    console.log('data :', data);
    let _areaData = [];
    Object.keys(data).map((keyName, idx) => {
      if (R.contains('no', keyName)) {
        //roof no.
        let _area = {};
        let _no = R.split('_', keyName)[1];
        //roof type
        let _type = data[keyName];
        _area['no'] = _no;
        _area['type'] = _type;
        _area['data'] = {};
        // console.log(_no);
        // console.log(_type);
        console.log(_area);
        Object.keys(data).map((k, i) => {
          if (R.contains(_no, k) && !R.contains('no', k)) {
            let _temp = R.split('_', k)[0];
            let _data = data[k] * 1;

            _area['data'][_temp] = _data;
          }
        });
        _areaData.push(_area);
      }
    });
    console.log(_areaData);
    setConcreteData(_areaData);
    navigate('concrete/prequatation');
  };

  return (
    <Layout
      renderContent={() => {
        return (
          <div className="sm:w-full md:w-5/6 xl:w-1/2">
            <form onSubmit={handleSubmit(handleNext)}>
              <div className="flex flex-row justify-between">
                <div>
                  <Button
                    onClick={() => navigate('/products')}
                    type="button"
                    label="Back"
                  />
                </div>
                <div className="flex items-center text-3xl">{Groups.text}</div>
                <div className="flex w-auto">
                  <Button type="submit" label="Next" />
                </div>
              </div>
              {Areas}
              {/* {RoofAreas}
              {NewRoofArea} */}
              <div className="text-red-700 border-red-400 mt-4 py-2 px-4">
                {Object.keys(errors).length > 0 &&
                  'There are errors, dimensions must be number and great than 0.'}
              </div>
            </form>
            <div className="flex w-full mx-5">
              <Button onClick={() => addNewArea()} label="Add Area" />
            </div>
          </div>
        );
      }}
    ></Layout>
  );
};

ConcreteDataComponent.propsTypes = {
  setAreaData: PropTypes.func,
  areaData: PropTypes.array,
};

ConcreteDataComponent.defaultProps = {
  setAreaData: () => {},
  areaData: [],
};

const mapDispatchToProps = dispatch => {
  return {
    setConcreteData: areas => dispatch(actions.setConcrete(areas)),
  };
};

const mapStateToProps = state => ({ areaData: state.Customer.concrete });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConcreteDataComponent);
