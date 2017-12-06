import React from 'react';
import { shallow } from 'enzyme';

import TopNav from '../../../components/Common/TopNav';

describe('TopNav component', () => {
  test('should mount without crashing', () => {
    const wrapper = shallow(<TopNav />);
    expect(wrapper.length).toBe(1);
  });
});
