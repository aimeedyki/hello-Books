import React from 'react';
import { shallow } from 'enzyme';

import About from '../../components/About';

describe('App component', () => {
  test('should mount', () => {
    const wrapper = shallow(<About />);
    expect(wrapper.length).toBe(1);
  });
});
