import React, { forwardRef, useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as R from 'ramda';
import Layout from 'components/layout';
import PropTypes, { object } from 'prop-types';
import { Select, TextInput, AddCartButton, Button } from 'components/common';
import { ProductGroups } from 'data/mockup-data';
import { actions } from 'data/reducers/customer';

//Groups need to be loaded from DB, created by admin
const Groups = R.find(R.propEq('type', 'MetalSheet'))(ProductGroups);
const itemTest = { name: 'test' };

const RoofProductDetail = forwardRef(
  ({ roof, roof_index, register, errors }, ref) => {
    return (
      <div key={roof_index}>
        <div className="flex  border border-gray-500 bg-blue-400 p-2 rounded-t-md">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <div className="mx-2">Area No. {roof.no} </div>
              <div className="mx-3">{roof.type}</div>
            </div>
            <div className="flex flex-row">
              {roof.data.A ? (
                <div className="mx-3"> A = {roof.data.A} m.</div>
              ) : (
                <div></div>
              )}
              {roof.data.B ? (
                <div className="mx-3"> B = {roof.data.B} m.</div>
              ) : (
                <div></div>
              )}
              {roof.data.C ? (
                <div className="mx-3"> C = {roof.data.C} m.</div>
              ) : (
                <div></div>
              )}
              {roof.data.pDist ? (
                <div className="mx-3"> ระยะแป = {roof.data.pDist} m.</div>
              ) : (
                <div></div>
              )}
              {roof.data.topCover ? (
                <div className="mx-3"> ครอบจั่ว </div>
              ) : (
                <div></div>
              )}
              {roof.data.endCurve ? (
                <div className="mx-3"> ย้ำโค้ง </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
        <div className="border border-gray-500  rounded-b-md">
          {Groups.groups.map((group, i) => {
            return (
              <div className="flex flex-row my-2 py-2 px-4 " key={i}>
                <div className="w-1/6"> {group} </div>
                <div className="w-3/6 mx-3 ">
                  <Select
                    name={`${roof.no}` + '_product_' + `${group}`}
                    register={register}
                    // onChange={e =>
                    //   changeItemList(
                    //     e,
                    //     group,
                    //     roof.no,
                    //     'product'
                    //   )
                    // }
                  />
                </div>
                <div className=" w-1/6 mx-3">
                  <TextInput
                    name={`${roof.no}` + '_unit_' + `${group}`}
                    register={register}
                    defaultValue={() => SheetCalculation()}
                    // onChange={e =>
                    //   changeItemList(e, group, roof.no, 'unit')
                    // }
                  />
                </div>
                <div className="w-1/6"> units</div>
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

const PreQuatation = ({ roofs, setRoofArea }) => {
  const [roofsData, setRoofsData] = useState([]);
  const { register, handleSubmit, watch, errors } = useForm();

  useEffect(() => {
    setRoofsData(roofs);
  }, [roofs]);

  function SheetCalculation() {
    console.log('shhet calculation');
    return 10;
  }
  const addToCartClick = data => {
    // console.log(' add cart click');
    console.log(data);
    // let prodType = Groups.groups;
    // // console.log(prodType);
    // let _temp = {};
    // let _orders = [];
    // let _roofs = [...roofsData];
    // let _no = 0;

    // _roofs.map(roof => {
    //   _orders = [];
    //   prodType.map(_type => {
    //     console.log(_type);
    //     console.log('*******', _type, '**********');
    //     _temp = { type: _type };
    //     R.keys(data).map(_prod => {
    //       _no = parseInt(_prod.substring(0, _prod.indexOf('_')));
    //       if (_prod.search(_type) > 0 && roof.no === _no) {
    //         console.log('*******', _prod, '**********');
    //         //set name/sku of product
    //         if (_prod.search('product') > 0 && data[_prod] !== '') {
    //           _temp['name'] = data[_prod];
    //         }

    //         //set amount of product
    //         if (
    //           _prod.search('unit') > 0 &&
    //           data[_prod] !== '' &&
    //           data[_prod] * 1 > 0
    //         ) {
    //           console.log(_type, data[_prod]);
    //           _temp['amount'] = data[_prod];
    //         }

    //         if (R.both(R.has('name'), R.has('amount'))(_temp)) {
    //           console.log(_temp);
    //           _orders.push(_temp);
    //           roof['orders'] = _orders;
    //           // console.log('ROOFS : ', _roofs);
    //         }
    //       }
    //     });
    //   });
    // });
    // setRoofArea(_roofs);
  };

  return (
    <Layout
      renderContent={() => {
        return (
          <div className="sm:w-full md:w-5/6 xl:w-1/2">
            <div className="flex flex-row justify-between">
              <div>
                <Button
                  onClick={() => navigate('/metalsheet/customerdata')}
                  type="button"
                  label="Back"
                />
              </div>
              <div className="flex items-center">Metal Sheet</div>
              <Button
                // to="/metalsheet/prequatation"
                type="button"
                label="Next"
              />
            </div>
            <div className="mt-3">
              <form onSubmit={handleSubmit(addToCartClick)}>
                <div>
                  {roofsData.map((roof, roof_index) => {
                    console.log(roof, roof_index);
                    return (
                      <RoofProductDetail
                        roof={roof}
                        roof_index={roof_index}
                        register={register}
                        errors={errors}
                      />
                    );
                    // const roofType = roof.type !== '' ? roof.type : null;
                    // const A = roof.data.A !== 0 ? roof.data.A : null;
                    // const B = roof.data.B !== 0 ? roof.data.B : null;
                    // const C = roof.data.C !== 0 ? roof.data.C : null;
                    // const pDist =
                    //   roof.data.pDist !== 0 ? roof.data.pDist : null;
                    // const topCover = roof.data.topCover;
                    // const endCurve = roof.data.endCurve;
                    // return (
                    //   <div key={roof_index}>
                    //     <div className="flex  border border-gray-500 bg-blue-400 p-2 rounded-t-md">
                    //       <div className="flex flex-col">
                    //         <div className="flex flex-row">
                    //           <div className="mx-2">Area No. {roof.no} </div>
                    //           <div className="mx-3">{roofType}</div>
                    //         </div>
                    //         <div className="flex flex-row">
                    //           {A ? (
                    //             <div className="mx-3"> A = {A} m.</div>
                    //           ) : (
                    //             <div></div>
                    //           )}
                    //           {B ? (
                    //             <div className="mx-3"> B = {B} m.</div>
                    //           ) : (
                    //             <div></div>
                    //           )}
                    //           {C ? (
                    //             <div className="mx-3"> C = {C} m.</div>
                    //           ) : (
                    //             <div></div>
                    //           )}
                    //           {pDist ? (
                    //             <div className="mx-3"> ระยะแป = {pDist} m.</div>
                    //           ) : (
                    //             <div></div>
                    //           )}
                    //           {topCover ? (
                    //             <div className="mx-3"> ครอบจั่ว </div>
                    //           ) : (
                    //             <div></div>
                    //           )}
                    //           {endCurve ? (
                    //             <div className="mx-3"> ย้ำโค้ง </div>
                    //           ) : (
                    //             <div></div>
                    //           )}
                    //         </div>
                    //       </div>
                    //     </div>
                    //     <div className="border border-gray-500  rounded-b-md">
                    //       {Groups.groups.map((group, i) => {
                    //         return (
                    //           <div
                    //             className="flex flex-row my-2 py-2 px-4 "
                    //             key={i}
                    //           >
                    //             <div className="w-1/6"> {group} </div>
                    //             <div className="w-3/6 mx-3 ">
                    //               <Select
                    //                 name={
                    //                   `${roof.no}` + '_product_' + `${group}`
                    //                 }
                    //                 register={register}
                    //                 // onChange={e =>
                    //                 //   changeItemList(
                    //                 //     e,
                    //                 //     group,
                    //                 //     roof.no,
                    //                 //     'product'
                    //                 //   )
                    //                 // }
                    //               />
                    //             </div>
                    //             <div className=" w-1/6 mx-3">
                    //               <TextInput
                    //                 name={`${roof.no}` + '_unit_' + `${group}`}
                    //                 register={register}
                    //                 defaultValue={() => SheetCalculation()}
                    //                 // onChange={e =>
                    //                 //   changeItemList(e, group, roof.no, 'unit')
                    //                 // }
                    //               />
                    //             </div>
                    //             <div className="w-1/6"> units</div>
                    //           </div>
                    //         );
                    //       })}
                    //     </div>
                    //     <div className="text-red-700 border-red-400 mt-1 mb-3 py-2 px-4">
                    //       {Object.keys(errors).length > 0 &&
                    //         'There are some error, empty product OR unit'}
                    //     </div>
                    //   </div>
                    // );
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

PreQuatation.propTypes = {
  setRoofArea: PropTypes.func,
  roofs: PropTypes.array,
};

PreQuatation.defaultProps = { roofs: [], setRoofArea: () => {} };

const mapDispatchToProps = dispatch => {
  return {
    setRoofArea: areas => dispatch(actions.setRoof(areas)),
  };
};

const mapStateToProps = state => ({ roofs: state.Customer.roofs });

export default connect(mapStateToProps, mapDispatchToProps)(PreQuatation);
