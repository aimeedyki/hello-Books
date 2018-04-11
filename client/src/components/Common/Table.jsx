import React from 'react';

/** @description dynamically maps the table's row
   *
   * @param { string } heading
   * @param { number } index
   * @param { array } header 
   *
   * @returns { JSX } JSX
   */
const row = (heading, index, header) =>
  <tr key={`tr-${index}`}>
    {header.map((info, rowIndex) =>
      <td key={`trc-${rowIndex}`}>
        {heading[info.prop]}
      </td>
    )}
  </tr>;

/** @description returns the table
   *
   * @param { object } props
   *
   * @returns { JSX } JSX
   */
export default ({ record, header }) =>
  <table className='striped centered table' >
    <thead>
      <tr>
        {header.map((heading, index) =>
          <th key={`thc-${index}`}>
            {heading.name}
          </th>
        )}
      </tr>
    </thead>
    <tbody>
      {record.map((heading, index) => row(heading, index, header))}
    </tbody>
  </table>;
