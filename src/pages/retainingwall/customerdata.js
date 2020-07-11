import React, { useState, useEffect, forwardRef } from 'react';
import Layout from 'components/layout';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from 'data/reducers/customer';
import { useForm, Controller } from 'react-hook-form';
import { Button, Select, Checkbox } from 'components/common';

const WallDataInput = forwardRef(
  ({ i, register, wallsData, setValue }, ref) => {
    const dataInputStyle =
      'w-2/5 shadow appearance-none border rounded py-1 px-2 mx-5 ' +
      'text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

    useEffect(() => {
      // console.log('set new roofValue', roofValue);
      // valueChange(i, roofValue);
      console.log('useEffect : ', wallsData);
      if (!R.isEmpty(wallsData)) {
        setValue('A_' + `${i}`, wallsData.data.A);
      }
    }, [wallsData]);

    return (
      <div className="mt-2 border rounded p-5">
        <div>Wall No. {i}</div>
        <div className="flex justify-center items-center ">
          <div className="flex flex-col  justify-center items-center">
            <div className="flex flex-row flex-wrap  ">
              <div className="flex flex-col  ">
                <div className="flex flex-row mt-2 ">
                  <div className="">ความยาว :</div>
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

WallDataInput.propsType = {
  i: PropTypes.number,
  register: PropTypes.func,
  wallsData: PropTypes.object,
  setValue: PropTypes.func,
};

WallDataInput.defaultProps = {
  i: 1,
  register: () => {},
  setValue: () => {},
  wallsData: {
    no: 1,
    data: {
      A: 0,
      B: 0,
    },
  },
};

const WallDataComponent = ({ wallData, setWallData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    errors,
  } = useForm();
  const [Walls, setWalls] = useState([]);

  useEffect(() => {
    if (wallData && wallData.length > 0) {
      const _walls = wallData.map((wall, i) => {
        return (
          <WallDataInput
            no={i + 1}
            key={i + 1}
            register={register}
            wallsData={wall}
            setValue={setValue}
            control={control}
          />
        );
      });
      setWalls(_walls);
    } else {
      const _wall = (
        <WallDataInput
          no="1"
          key="1"
          register={register}
          setValue={setValue}
          control={control}
        />
      );
      setWalls(wall => wall.concat(_wall));
    }
  }, [wallData]);

  const addNewWall = () => {
    const _wall = [...Walls];
    setWalls(wall =>
      wall.concat(
        <WallDataInput
          i={_wall.length + 1}
          key={`${_wall.length + 1}`}
          register={register}
          setValue={setValue}
          control={control}
        />
      )
    );
  };

  const handleNext = data => {
    console.log('next :', data);
    let _wallData = [];
    Object.keys(data).map((keyName, idx) => {
      //roof no.
      let _wall = {};
      let _no = R.split('_', keyName)[1];
      //roof type
      _wall['no'] = _no;
      _wall['data'] = {};
      // console.log(_no);
      // console.log(_type);
      if (typeof R.find(R.propEq('no', _no))(_wallData) === 'undefined') {
        // console.log(_area);
        Object.keys(data).map((k, i) => {
          if (R.contains(_no, k)) {
            let _temp = R.split('_', k)[0];
            let _data = data[k] * 1;

            _wall['data'][_temp] = _data;
          }
        });
        _wallData.push(_wall);
      }
    });
    console.log(_wallData);
    setWallData(_areaData);
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
              {Walls}

              <div className="text-red-700 border-red-400 mt-4 py-2 px-4">
                {Object.keys(errors).length > 0 &&
                  'There are errors, dimensions must be number and great than 0.'}
              </div>
            </form>
            <div className="flex w-full mx-5">
              <Button onClick={() => addNewWall()} label="Add Wall" />
            </div>
          </div>
        );
      }}
    ></Layout>
  );
};

WallDataComponent.propsTypes = {
  setWallData: PropTypes.func,
  wallData: PropTypes.array,
};

WallDataComponent.defaultProps = {
  setWallData: () => {},
  wallData: [],
};

const mapDispatchToProps = dispatch => {
  return {
    setWallData: wall => dispatch(actions.setWall(wall)),
  };
};

const mapStateToProps = state => ({ wallData: state.Customer.walls });

export default connect(mapStateToProps, mapDispatchToProps)(WallDataComponent);
