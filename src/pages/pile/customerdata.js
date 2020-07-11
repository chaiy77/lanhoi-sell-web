import React, { useState, useEffect, forwardRef } from 'react';
import Layout from 'components/layout';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from 'data/reducers/customer';
import { useForm, Controller } from 'react-hook-form';
import { Button, Select, Checkbox } from 'components/common';

const PileDataInput = forwardRef(
  ({ i, register, pilesData, setValue }, ref) => {
    const dataInputStyle =
      'w-2/5 shadow appearance-none border rounded py-1 px-2 mx-5 ' +
      'text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

    useEffect(() => {
      // console.log('set new roofValue', roofValue);
      // valueChange(i, roofValue);
      console.log('useEffect : ', pilesData);
      if (!R.isEmpty(pilesData)) {
        setValue('A_' + `${i}`, pilesData.data.A);
      }
    }, [pilesData]);

    return (
      <div className="mt-2 border rounded p-5">
        <div>Area No. {i}</div>
        <div className="flex justify-center items-center ">
          <div className="flex flex-col  justify-center items-center">
            <div className="flex flex-row flex-wrap  ">
              <div className="flex flex-col  ">
                <div className="flex flex-row mt-2 ">
                  <div className="">จำนวนเสาเข็ม :</div>
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
                  <div className="">ต้น</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PileDataInput.propsType = {
  i: PropTypes.number,
  register: PropTypes.func,
  pilesData: PropTypes.object,
  setValue: PropTypes.func,
};

PileDataInput.defaultProps = {
  i: 1,
  register: () => {},
  setValue: () => {},
  pilesData: {
    no: 1,
    data: {
      A: 0,
    },
  },
};

const PileDataComponent = ({ pileData, setPileData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    errors,
  } = useForm();
  const [Piles, setPiles] = useState([]);

  useEffect(() => {
    if (pileData && pileData.length > 0) {
      const _piles = pileData.map((pile, i) => {
        return (
          <PileDataInput
            no={i + 1}
            key={i + 1}
            register={register}
            pilesData={pile}
            setValue={setValue}
            control={control}
          />
        );
      });
      setPiles(_piles);
    } else {
      const _pile = (
        <PileDataInput
          no="1"
          key="1"
          register={register}
          setValue={setValue}
          control={control}
        />
      );
      setPiles(pile => pile.concat(_pile));
    }
  }, [pileData]);

  const addNewPile = () => {
    const _pile = [...Piles];
    setPiles(pile =>
      pile.concat(
        <PileDataInput
          i={_pile.length + 1}
          key={`${_pile.length + 1}`}
          register={register}
          setValue={setValue}
          control={control}
        />
      )
    );
  };

  const handleNext = data => {
    console.log('next :', data);
    let _pileData = [];
    Object.keys(data).map((keyName, idx) => {
      //roof no.
      let _pile = {};
      let _no = R.split('_', keyName)[1];
      //roof type
      _pile['no'] = _no;
      _pile['data'] = {};
      // console.log(_no);
      // console.log(_type);
      if (typeof R.find(R.propEq('no', _no))(_pileData) === 'undefined') {
        // console.log(_area);
        Object.keys(data).map((k, i) => {
          if (R.contains(_no, k)) {
            let _temp = R.split('_', k)[0];
            let _data = data[k] * 1;

            _pile['data'][_temp] = _data;
          }
        });
        _pileData.push(_pile);
      }
    });
    console.log(_pileData);
    setPileData(_pileData);
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
              {Piles}

              <div className="text-red-700 border-red-400 mt-4 py-2 px-4">
                {Object.keys(errors).length > 0 &&
                  'There are errors, dimensions must be number and great than 0.'}
              </div>
            </form>
            <div className="flex w-full mx-5">
              <Button onClick={() => addNewPile()} label="Add Pile" />
            </div>
          </div>
        );
      }}
    ></Layout>
  );
};

PileDataComponent.propsTypes = {
  setPileData: PropTypes.func,
  pileData: PropTypes.array,
};

PileDataComponent.defaultProps = {
  setPileData: () => {},
  pileData: [],
};

const mapDispatchToProps = dispatch => {
  return {
    setPileData: pile => dispatch(actions.setPile(pile)),
  };
};

const mapStateToProps = state => ({ pileData: state.Customer.piles });

export default connect(mapStateToProps, mapDispatchToProps)(PileDataComponent);
