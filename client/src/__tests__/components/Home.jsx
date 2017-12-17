import React from 'react';
import { shallow } from 'enzyme';

import Home from '../../components/Home';

describe('Home component', () => {
  test('should mount', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.length).toBe(1);
  });
});
