import React from 'react';
import { shallow, mount } from 'enzyme';
import { mockStore } from '../../../__mocks__/mockConfig';
import ConnectedLibrary,
{ Library } from '../../../components/Library/Library';


const user = {
  admin: true
};
const props = {
  user
};
const store = mockStore({
  authReducer: user
});

const setUp = () => shallow(<Library { ...props } />);

describe('Connected Library component', () => {
  test('it should mount without crashing', () => {
    const wrapper = shallow(< ConnectedLibrary store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

describe('Librarycomponent', () => {
  test('it should mount without crashing', () => {
    const wrapper = setUp();
    expect(wrapper.length).toBe(1);
  });
});
