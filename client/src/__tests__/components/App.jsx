import React from 'react';
import { shallow } from 'enzyme';

import App from '../../components/App';

describe('App component', () => {
  test('should mount', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.length).toBe(1);
  });
});
