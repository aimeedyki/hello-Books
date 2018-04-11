import React from 'react';
import { shallow } from 'enzyme';

import Table from '../../../components/Common/Table';

const header = ['number', 'alphabeth'];
const record = ['one', 'a'];
const props = { record, header };
describe('Table component', () => {
  test('should mount without crashing', () => {
    const wrapper = shallow(<Table {...props}/>);
    expect(wrapper.length).toBe(1);
  });
});
