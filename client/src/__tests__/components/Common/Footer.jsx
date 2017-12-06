import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../../../components/Common/Footer';

describe('Footer component', () => {
  test('should mount without crashing', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.length).toBe(1);
  });
});
