import React from 'react';
import { shallow } from 'enzyme';

import SearchBar from '../../../components/Common/SearchBar';

describe('SearchBar component', () => {
  test('should mount without crashing', () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.length).toBe(1);
  });
  test('should contain an inpput field when it renders', () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.find('input').length).toBe(1);
  });
});
