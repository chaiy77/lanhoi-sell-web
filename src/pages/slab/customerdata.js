import React, { useState, useEffect, forwardRef } from 'react';
import Layout from 'components/layout';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from 'data/reducers/customer';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { Button, Select, Checkbox } from 'components/common';
// import { slabLogType } from 'data/mockup-data';
import { navigate } from 'gatsby';
import { slabLongType } from '../../data/mockup-data';
import { ProductGroups } from 'data/mockup-data';

const GroupName = 'Slab';
const Groups = R.find(R.propEq('type', GroupName))(ProductGroups);

const AreaDataInput = forwardRef(
  (
    {
      i,
      valueChange,
      register,
      unregister,
      areaData,
      setValue,
      removeArea,
      errors,
    },
    ref
  ) => {
    const [useSLong, setUseSLong] = useState(false);
    const dataInputStyle =
      'w-2/5 shadow appearance-none border rounded py-1 px-2 mx-5 ' +
      'text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

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
      if (useSLong) {
        // console.log('register');
        register('C_' + `${i}`, {
          validate: {
            positiveNumber: value => parseFloat(value) > 0,
          },
          message: 'missing long',
        });
      } else if (!useSLong) {
        // console.log('unregister');
        unregister('C_' + `${i}`);
      }
    }, [useSLong]);

    const useSepecilaLong = e => {
      setValue('C_' + `${i}`, 0);
      setUseSLong(e);
    };
    const remove = i => {
      console.log(i);
      removeArea(i);
    };

    return (
      <div className="flex flex-col mt-2 border rounded p-5">
        <div>Area No. {i}</div>
        <div className="flex justify-center items-center ">
          <div className="flex flex-col  justify-center items-center">
            <div className="flex flex-row flex-wrap  ">
              <div className="flex flex-col  ">
                <div className="flex flex-row mt-2">
                  <div className="w-1/6">A :</div>

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
                  />

                  <div className="">เมตร (หัวแผ่น)</div>
                </div>

                <div className="flex flex-row mt-2 ">
                  <div className="w-1/6">B :</div>
                  <div className="ml-5">
                    <Select
                      name={'B_' + `${i}`}
                      register={register}
                      defaultText="เลือกความยาว"
                      options={slabLongType}
                      disabled={useSLong}
                    />
                  </div>
                  <div className="ml-4">เมตร </div>
                </div>
                <div className=" flex flex-row  mt-3 ">
                  <Checkbox
                    name={'check_' + `${i}`}
                    register={register}
                    value={useSLong}
                    onCheck={e => useSepecilaLong(e)}
                  />
                  <div className="w-20">ยาวพิเศษ :</div>
                  <input
                    name={'C_' + `${i}`}
                    type="text"
                    className="w-3/12 shadow appearance-none border rounded py-1 px-2 mx-5
                    text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    disabled={!useSLong}
                    ref={
                      register({
                        validate: {
                          positiveNumber: value => parseFloat(value) > 0,
                        },
                      })
                      // useSLong
                      //   ? register({
                      //       validate: {
                      //         positiveNumber: value => parseFloat(value) > 0,
                      //       },
                      //     })
                      //   : register
                    }
                  />
                  <div className="ml-4">เมตร </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="w-24">
            {i !== 1 ? (
              <Button
                color="bg-red-500 hover:bg-red-400"
                onClick={() => removeArea(i)}
                label="Remove"
              />
            ) : (
              <div></div>
            )}
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
  unregister: PropTypes.func,
  areaData: PropTypes.object,
  setValue: PropTypes.func,
  removeArea: PropTypes.func,
};

AreaDataInput.defaultProps = {
  i: 1,
  valueChange: () => {},
  register: () => {},
  unregister: () => {},
  setValue: () => {},
  removeArea: () => {},
  areaData: {
    no: 1,
    data: {
      A: 0,
      B: 0,
      C: 0,
    },
  },
};

const SlabDataComponent = ({ areaData, setSlabData }) => {
  const [Areas, setAreas] = useState([]);
  useEffect(() => {
    if (areaData && areaData.length > 0) {
      const _areas = areaData.map((area, i) => {
        if (i > 0) {
          return (
            <AreaDataInput
              no={i + 1}
              key={i + 1}
              register={register}
              unregister={unregister}
              errors={errors}
              areaData={area}
              setValue={setValue}
              control={control}
              removeArea={no => removeArea(no)}
            />
          );
        } else {
          return (
            <AreaDataInput
              no={i + 1}
              key={i + 1}
              register={register}
              unregister={unregister}
              errors={errors}
              areaData={area}
              setValue={setValue}
              control={control}
            />
          );
        }
      });
      setAreas(_areas);
    } else {
      const _area = (
        <AreaDataInput
          no="1"
          key="1"
          register={register}
          unregister={unregister}
          errors={errors}
          setValue={setValue}
          control={control}
        />
      );
      setAreas(area => area.concat(_area));
    }
  }, [areaData]);

  // useEffect(() => {
  //   let _temp = [...Areas];
  //   // console.log(_temp);
  //   // _temp.map(area => {
  //   //   console.log(area);
  //   // });
  //   // let _data = manageData()
  // }, [Areas]);
  const addNewArea = () => {
    const _area = [...Areas];
    setAreas(area =>
      area.concat(
        <AreaDataInput
          i={_area.length + 1}
          key={`${_area.length + 1}`}
          register={register}
          unregister={unregister}
          errors={errors}
          setValue={setValue}
          control={control}
          removeArea={no => removeArea(no)}
        />
      )
    );
    let _temp = [...Areas];
    console.log(_temp);
  };

  const removeArea = no => {
    setAreas(areas => areas.filter((area, index) => index !== no - 1));
  };

  const manageData = data => {
    console.log('data :', data);
    let _areaData = [];
    Object.keys(data).map((keyName, idx) => {
      //roof no.
      let _area = {};
      let _no = R.split('_', keyName)[1];
      //roof type
      _area['no'] = _no;
      _area['data'] = {};
      // console.log(_no);
      // console.log(_type);
      if (typeof R.find(R.propEq('no', _no))(_areaData) === 'undefined') {
        // console.log(_area);
        Object.keys(data).map((k, i) => {
          if (R.contains(_no, k)) {
            let _temp = R.split('_', k)[0];

            let _data = data[k] * 1;
            if (_temp == 'B' && _data !== 0) {
              _area['data']['B'] = _data;
              _area['data']['C'] = 0;
            } else if (_temp == 'C' && _data !== 0) {
              _area['data']['C'] = _data;
              _area['data']['B'] = 0;
            }
            _area['data'][_temp] = _data;
          }
        });
        _areaData.push(_area);
      }
    });
    // console.log(_areaData);
    return _areaData;
  };

  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    control,
    watch,
    errors,
  } = useForm();

  const handleNext = data => {
    // console.log('data :', data);
    let _areaData = manageData(data);
    setSlabData(_areaData);
    navigate('slab/prequatation');
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

const mapDispatchToProps = dispatch => {
  return {
    setSlabData: areas => dispatch(actions.setSlab(areas)),
  };
};

const mapStateToProps = state => ({ areaData: state.Customer.slabs });

export default connect(mapStateToProps, mapDispatchToProps)(SlabDataComponent);

