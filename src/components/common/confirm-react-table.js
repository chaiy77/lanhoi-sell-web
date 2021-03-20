import React, { useState } from 'react';
import { useTable } from 'react-table';

const ConfirmTable = ({ columns, data }) => {
  const [isBoldText, setBoldText] = useState(false);

  const {
    getTableProps,
    getTableBodyProps,
    footers,
    headers,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  const ProductGroupTableRow = () => {
    return;
  };

  return (
    <div>
      <table {...getTableProps()} className="w-full">
        <thead>
          <tr className="bg-green-400">
            {headers.map(column => (
              <th
                className="border px-4 py-2 font-normal text-base"
                {...column.getHeaderProps()}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowIdx) => {
            prepareRow(row);

            let _isRenderGroup = true;
            let _isRenderSum = true;
            return (
              <tr
                className={
                  row.original.type === 'group'
                    ? 'font-bold border-gray-900 border-t-4 text-xl'
                    : ''
                }
                {...row.getRowProps()}
              >
                {row.cells.map((cell, i) => {
                  // console.log(row.original);
                  if (row.original.type === 'group' && _isRenderGroup) {
                    _isRenderGroup = false;
                    return (
                      <td
                        colSpan={headers.length}
                        className="border px-4 py-2"
                        {...cell.getCellProps()}
                      >
                        {row.original.product}
                      </td>
                    );
                  }

                  if (row.original.type === 'product') {
                    // console.log(cell.column, cell.column.id === 'total');
                    return (
                      <td
                        className="border px-4 py-2 "
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  }

                  if (row.original.type === 'summary') {
                    // console.log(cell.column.id, cell.column.id === 'total');
                    if (_isRenderSum) {
                      _isRenderSum = false;
                      return (
                        <td
                          colSpan={headers.length - 1}
                          className="border-gray-900 px-4 py-2 font-bold text-right border-t-4 border-b-4"
                          {...cell.getCellProps()}
                        >
                          Summary
                        </td>
                      );
                    }
                    if (cell.column.id === 'total') {
                      // console.log('total');
                      return (
                        <td
                          className="border-gray-900 px-4 py-2 border-t-4 border-b-4"
                          {...cell.getCellProps()}
                        >
                          {cell.render('Cell')}
                        </td>
                      );
                    }
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ConfirmTable;
