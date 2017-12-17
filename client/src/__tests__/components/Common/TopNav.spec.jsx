import React from 'react';
import { shallow } from 'enzyme';

import TopNav from '../../../components/Common/TopNav';

describe('TopNav component', () => {
  test('should mount without crashing', () => {
    const wrapper = shallow(<TopNav />);
    expect(wrapper.length).toBe(1);
  });
  test('should contain navigation links when it renders', () => {
    const wrapper = shallow(<TopNav />);
    expect(wrapper.find('Link').length).toBe(2);
  });
  test('should contain level icon image when it renders', () => {
    const wrapper = shallow(<TopNav />);
    expect(wrapper.find('img').length).toBe(1);
  });
  test('should contain library name when it renders', () => {
    const wrapper = shallow(<TopNav />);
    expect(wrapper.find('nav b').text()).toBe('Booksville');
  });
});
