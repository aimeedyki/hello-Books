import React from 'react';
import { shallow } from 'enzyme';

import Loader from '../../../components/Common/Loader';

describe('Loader component', () => {
  test('should mount without crashing', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper.length).toBe(1);
  });
});
