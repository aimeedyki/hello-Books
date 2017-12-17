import React from 'react';
import { shallow } from 'enzyme';

import SearchBar from '../../../components/Common/SearchBar';

describe('SearchBar component', () => {
  test('should mount without crashing', () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.length).toBe(1);
  });
});
