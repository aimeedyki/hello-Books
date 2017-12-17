import React from 'react';
import { shallow } from 'enzyme';

import NotFound from '../../components/NotFound';

describe('NotFound component', () => {
  test('should mount without crashing', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.length).toBe(1);
  });
  test('should contain a page not found message', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find('h1').text()).toBe('404 - Page Not Found');
  });
});
