import React from 'react';
import { shallow } from 'enzyme';

import NotFound from '../../components/NotFound';

describe('NotFound component', () => {
  test('should mount', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.length).toBe(1);
  });
});
