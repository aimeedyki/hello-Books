import React from 'react';
import { shallow } from 'enzyme';

import Button from '../../../components/Common/Button';

describe('Button component', () => {
  test('should mount without crashing', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.length).toBe(1);
  });
});
