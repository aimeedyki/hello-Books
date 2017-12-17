import React from 'react';
import { shallow } from 'enzyme';

import Home from '../../components/Home';

describe('Home component', () => {
  test('should mount without crashing', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.length).toBe(1);
  });
  test('should have a navigation bar', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('nav').length).toBe(1);
  });
  test('should have navigation links', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('Link').length).toBe(3);
  });
  test('it should contain library name', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('#logo-container h4').text()).toBe('Booksville');
  });
  test('it should contain a home image', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('img').length).toBe(1);
  });
});
