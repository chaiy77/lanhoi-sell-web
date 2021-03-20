import React from 'react';
import PropTypes, { object } from 'prop-types';

const _columns = [
  {
    Header: 'No',
    accessor: 'no',
    style: '',
  },
  {
    Header: 'Product',
    accessor: 'product',
    style: '',
  },
];

const _data = [
  { no: '', product: 'test 1' },
  { no: 2, product: 'test 2', style: '' },
  { no: '', product: 'test 3', style: '' },
  { no: 4, product: 'test 4', style: '' },
];

const Table = ({ columns, data }) => {
  console.log(columns);
  return (
    <div className="flex">
      <div className="flex flex-row ">
        {columns.map(column => {
          return (
            <div className="flex flex-col">
              <div className=" font-bold px-5 py-2 border ">
                {column.Header}
              </div>
              {data.map(d => {
                {
                  return (
                    <div className={`${d.style}` ? `${d.style}` : ''}>
                      <div className="table-cell px-5 py-2 ">
                        {d[`${column.accessor}`]}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
};

Table.defaultProps = {
  columns: _columns,
  data: _data,
};

export default Table;
