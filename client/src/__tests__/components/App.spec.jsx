import React from 'react';
import { shallow } from 'enzyme';

import App from '../../components/App';

describe('App component', () => {
  test('should mount without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.length).toBe(1);
  });
  test('should contain routes to the userpage and home components',
    () => {
      const wrapper = shallow(<App />);
      expect(wrapper.find('Route').length).toBe(2);
    });
});
