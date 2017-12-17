import React from 'react';
import { shallow } from 'enzyme';

import Button from '../../../components/Common/Button';

const props = {
  label: 'Submit'
};

describe('Button component', () => {
  test('should mount without crashing', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.length).toBe(1);
  });
  test('should contain the label text', () => {
    const wrapper = shallow(<Button {...props} />);
    expect(wrapper.find('button').text()).toBe('Submit');
  });
});
