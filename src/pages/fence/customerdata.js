import React, { useState, useEffect, forwardRef } from 'react';
import Layout from 'components/layout';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from 'data/reducers/customer';
import { useForm, Controller } from 'react-hook-form';
import { Button, Select, Checkbox } from 'components/common';
import { navigate } from 'gatsby';
import { ProductGroups } from 'data/mockup-data';

const GroupName = 'Fence';
const Groups = R.find(R.propEq('type', GroupName))(ProductGroups);

const FenceDataInput = forwardRef(
  ({ i, register, fencesData, setValue }, ref) => {
    const dataInputStyle =
      'w-2/5 shadow appearance-none border rounded py-1 px-2 mx-5 ' +
      'text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

    const [hasBeam, setHasBeam] = useState(false);
    const [hasJoin, setHasJoin] = useState(false);

    const setJoin = e => {
      setHasJoin(e);
    };
    const setBeam = e => {
      setHasBeam(e);
    };

    useEffect(() => {
      // console.log('set new roofValue', roofValue);
      // valueChange(i, roofValue);
      // console.log(Groups);
      // console.log('useEffect : ', fencesData);
      if (!R.isEmpty(fencesData)) {
        setValue('A_' + `${i}`, fencesData.data.A);
        setValue('B_' + `${i}`, fencesData.data.B.toFixed(2) + ' เมตร');
        setValue('beam_' + `${i}`, fencesData.data.beam);
        setValue('join_' + `${i}`, fencesData.data.join);
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
                  <div className="w-3/12">ความยาวรั้ว :</div>
                  <input
                    name={'A_' + `${i}`}
                    type="text"
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
                <div className="flex flex-row mt-2 ">
                  <div className="w-3/12">ความสูง :</div>
                  <Select
                    name={'B_' + `${i}`}
                    // defaultValue={roofData.B}

                    // disabled={!needB}

                    register={register({
                      validate: {
                        notEmpty: value => value !== '',
                      },
                    })}
                    options={[
                      '1.25 เมตร',
                      '1.50 เมตร',
                      '1.75 เมตร',
                      '2.00 เมตร',
                    ]}
                    // onChange={e => {
                    //   handleValueChange(e, 'B');
                    // }}
                  />
                </div>
                <div className=" flex flex-row  mt-3 ml-6 ">
                  <Checkbox
                    name={'beam_' + `${i}`}
                    register={register}
                    value={hasBeam}
                    onCheck={e => setBeam(e)}
                  />
                  <div className="w-full">ความสูงรวมคานคอดิน</div>
                </div>
                <div className=" flex flex-row  mt-3 ml-6 ">
                  <Checkbox
                    name={'join_' + `${i}`}
                    register={register}
                    value={hasJoin}
                    onCheck={e => setJoin(e)}
                  />
                  <div className="w-full">เชื่อมต่อกับกำแพงอื่น</div>
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
            i={i + 1}
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
          i="1"
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
            let _data =
              typeof data[k] === 'string'
                ? data[k].match(/[+-]?\d+(\.\d+)?/g)[0] * 1.0
                : data[k] * 1;

            console.log(_data);

            _fence['data'][_temp] = _data;
          }
        });
        _fenceData.push(_fence);
      }
    });
    console.log(_fenceData);
    setFenceData(_fenceData);
    navigate('fence/prequatation');
  };

  return (
    <Layout
      renderContent={() => {
        return (
          <div className="sm:w-full md:w-5/6 xl:w-1/2">
            <form onSubmit={handleSubmit(handleNext)}>
              <div className="flex flex-row justify-between items-center">
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
              {Fences}

              <div className="text-red-700 border-red-400 mt-4 py-2 px-4">
                {Object.keys(errors).length > 0 &&
                  'There are errors, dimensions must be number and great than 0.'}
              </div>
            </form>
            <div className="flex w-full">
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
