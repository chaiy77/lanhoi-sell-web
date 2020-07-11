import React, { useState, useEffect, forwardRef } from 'react';
import Layout from 'components/layout';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from 'data/reducers/customer';
import { useForm, Controller } from 'react-hook-form';
import { Button, Select, Checkbox } from 'components/common';

const FenceDataInput = forwardRef(
  ({ i, register, fencesData, setValue }, ref) => {
    const dataInputStyle =
      'w-2/5 shadow appearance-none border rounded py-1 px-2 mx-5 ' +
      'text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

    useEffect(() => {
      // console.log('set new roofValue', roofValue);
      // valueChange(i, roofValue);
      console.log('useEffect : ', fencesData);
      if (!R.isEmpty(fencesData)) {
        setValue('A_' + `${i}`, fencesData.data.A);
      }
    }, [fencesData]);

    return (
      <div className="mt-2 border rounded p-5">
        <div>Fence No. {i}</div>
        <div className="flex justify-center items-center ">
          <div className="flex flex-col  justify-center items-center">
            <div className="flex flex-row flex-wrap  ">
              <div className="flex flex-col  ">
                <div className="flex flex-row mt-2 ">
                  <div className="">ความยาวรั้ว :</div>
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
                  <div className="">เมตร</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

FenceDataInput.propsType = {
  i: PropTypes.number,
  register: PropTypes.func,
  fencesData: PropTypes.object,
  setValue: PropTypes.func,
};

FenceDataInput.defaultProps = {
  i: 1,
  register: () => {},
  setValue: () => {},
  fencesData: {
    no: 1,
    data: {
      A: 0,
      B: 0,
    },
  },
};

const FenceDataComponent = ({ fenceData, setFenceData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    errors,
  } = useForm();
  const [Fences, setFences] = useState([]);

  useEffect(() => {
    console.log(fenceData);
    if (fenceData && fenceData.length > 0) {
      const _fences = fenceData.map((fence, i) => {
        return (
          <FenceDataInput
            no={i + 1}
            key={i + 1}
            register={register}
            fencesData={fence}
            setValue={setValue}
            control={control}
          />
        );
      });
      setFences(_fences);
    } else {
      const _fence = (
        <FenceDataInput
          no="1"
          key="1"
          register={register}
          setValue={setValue}
          control={control}
        />
      );
      setFences(fence => fence.concat(_fence));
    }
  }, [fenceData]);

  const addNewFence = () => {
    const _fence = [...Fences];
    setFences(fence =>
      fence.concat(
        <FenceDataInput
          i={_fence.length + 1}
          key={`${_fence.length + 1}`}
          register={register}
          setValue={setValue}
          control={control}
        />
      )
    );
  };

  const handleNext = data => {
    console.log('next :', data);
    let _fenceData = [];
    Object.keys(data).map((keyName, idx) => {
      //roof no.
      let _fence = {};
      let _no = R.split('_', keyName)[1];
      //roof type
      _fence['no'] = _no;
      _fence['data'] = {};
      // console.log(_no);
      // console.log(_type);
      if (typeof R.find(R.propEq('no', _no))(_fenceData) === 'undefined') {
        // console.log(_area);
        Object.keys(data).map((k, i) => {
          if (R.contains(_no, k)) {
            let _temp = R.split('_', k)[0];
            let _data = data[k] * 1;

            _fence['data'][_temp] = _data;
          }
        });
        _fenceData.push(_fence);
      }
    });
    console.log(_fenceData);
    setFenceData(_fenceData);
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
                <div className="flex w-auto">
                  <Button type="submit" label="Next" />
                </div>
              </div>
              {Fences}

              <div className="text-red-700 border-red-400 mt-4 py-2 px-4">
                {Object.keys(errors).length > 0 &&
                  'There are errors, dimensions must be number and great than 0.'}
              </div>
            </form>
            <div className="flex w-full mx-5">
              <Button onClick={() => addNewFence()} label="Add Fence" />
            </div>
          </div>
        );
      }}
    ></Layout>
  );
};

FenceDataComponent.propsTypes = {
  setFenceData: PropTypes.func,
  fenceData: PropTypes.array,
};

FenceDataComponent.defaultProps = {
  setFenceData: () => {},
  fenceData: [],
};

const mapDispatchToProps = dispatch => {
  return {
    setFenceData: fence => dispatch(actions.setFence(fence)),
  };
};

const mapStateToProps = state => ({ fenceData: state.Customer.fences });

export default connect(mapStateToProps, mapDispatchToProps)(FenceDataComponent);
