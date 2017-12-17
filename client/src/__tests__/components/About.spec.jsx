import React from 'react';
import { shallow } from 'enzyme';

import About from '../../components/About';

describe('App component', () => {
  test('should mount', () => {
    const wrapper = shallow(<About />);
    expect(wrapper.length).toBe(1);
    expect(wrapper.getElement().type).toBe('div');
  });
  test('it should contain library name', () => {
    const wrapper = shallow(<About />);
    expect(wrapper.find('#home h5').text())
      .toBe('Welcome to Booksville, home for book lovers.');
  });
});
