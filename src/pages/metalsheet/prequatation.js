import React, { useState } from 'react';
import { Link } from 'gatsby';
import { connect } from 'react-redux';
import * as R from 'ramda';
import Layout from 'components/layout';
import PropTypes from 'prop-types';
import { Select, TextInput, AddCartButton, Button } from 'components/common';
import { ProductGroups } from 'data/mockup-data';

const Groups = R.find(R.propEq('type', 'MetalSheet'))(ProductGroups);
const itemTest = { name: 'test' };

const PreQuatation = ({ areas }) => {
  const [itemList, setItemList] = useState([]);

  function SheetCalculation(w, h) {
    console.log(w);
    return 10;
  }

  const changeItemList = (e, group, area) => {
    console.log('change item');
    console.log(e.target.value);
    console.log(group, area);

    const _item = {};
  };

  const handleClick = () => {
    console.log(' add cart click');
  };

  return (
    <Layout
      renderContent={() => {
        return (
          <div className="sm:w-full md:w-5/6 xl:w-1/2">
            <div className="flex items-center">Metal Sheet</div>
            <div>
              {areas.map((area, area_index) => {
                const w = area.wide;
                const l = area.long;
                return (
                  <div key={area_index}>
                    <div className="flex flex-row">
                      <div className="mx-2">Area = {area.number} </div>
                      <div className="mx-2"> Wide = {w}</div>
                      <div className="mx-2"> long = {l}</div>
                    </div>

                    {Groups.groups.map((group, i) => {
                      return (
                        <div className="flex flex-row my-2 " key={i}>
                          <div className="w-1/6"> {group} </div>
                          <div className="w-3/6 mx-3 ">
                            <Select
                              onChange={e =>
                                changeItemList(e, group, area_index)
                              }
                            />
                          </div>
                          <div className=" w-1/6 mx-3">
                            <TextInput text="xxx" onChange={changeItemList} />
                          </div>
                          <div className="w-1/6"> units</div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div>
              {/* <AddCartButton item={itemTest} /> */}
              <Button label="Add to Cart" onClick={handleClick} />
            </div>
          </div>
        );
      }}
    ></Layout>
  );
};

PreQuatation.propTypes = {
  areas: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.number,
      wide: PropTypes.number,
      long: PropTypes.number,
    })
  ),
};

PreQuatation.defaultProps = {
  areas: [{ number: 1, wide: 0, long: 0 }],
};

export default PreQuatation;
