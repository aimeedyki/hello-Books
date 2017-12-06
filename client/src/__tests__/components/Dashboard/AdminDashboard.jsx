import React from 'react';
import { shallow } from 'enzyme';

import AdminDashboard from '../../../components/Dashboard/AdminDashboard';

describe('AdminDashboard component', () => {
  test('should mount without crashing', () => {
    const wrapper = shallow(<AdminDashboard />);
    expect(wrapper.length).toBe(1);
  });
});
