import React from 'react';
import { shallow } from 'enzyme';

import AdminDashboard from '../../../components/Dashboard/AdminDashboard';

describe('AdminDashboard component', () => {
  test('should mount without crashing', () => {
    const wrapper = shallow(<AdminDashboard />);
    expect(wrapper.length).toBe(1);
  });
  test('should contain heading when page renders', () => {
    const wrapper = shallow(<AdminDashboard />);
    expect(wrapper.find('.greeting h5').text()).toBe('User Activities');
  });
  test('should contain CategoryControls component when page renders', () => {
    const wrapper = shallow(<AdminDashboard />);
    expect(wrapper.find('Connect(withRouter(CategoryControls))')
      .length).toBe(1);
  });
  test('should contain UserTransactions component when page renders', () => {
    const wrapper = shallow(<AdminDashboard />);
    expect(wrapper.find('Connect(UserTransactions)')
      .length).toBe(1);
  });
  test('should contain UserActivity component when page renders', () => {
    const wrapper = shallow(<AdminDashboard />);
    expect(wrapper.find('Connect(UserActivity)')
      .length).toBe(1);
  });
});
