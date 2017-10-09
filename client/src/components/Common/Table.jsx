/* eslint-disable no-unused-vars */
import React from 'react';

const row = (heading, index, header) =>
  <tr key={`tr-${index}`}>
    {header.map((info, rowIndex) =>
      <td key={`trc-${rowIndex}`}>
        {heading[info.prop]}
      </td>
    )}
  </tr>;

export default ({ data, header }) =>
  <table className='striped responsive-table centered' >
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
      {data.map((heading, index) => row(heading, index, header))}
    </tbody>
  </table>;
