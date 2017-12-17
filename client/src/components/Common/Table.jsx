import React from 'react';

const row = (heading, index, header) =>
  <tr key={`tr-${index}`}>
    {header.map((info, rowIndex) =>
      <td key={`trc-${rowIndex}`}>
        {heading[info.prop]}
      </td>
    )}
  </tr>;

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
