import React from 'react';
import { shallow } from 'enzyme';
import { mockStore } from '../../../__mocks__/mockConfig';
import ConnectedSideNav, { SideNav } from '../../../components/Common/SideNav';

const user = {
  name: 'james',
  level: 'rookie',
  email: 'james@yahoo.com',
  profilePic: 'james.jpg',
  admin: false
};
const getCategories = jest.fn();
const categories = [{ id: 1, name: 'romance' }, { id: 2, name: 'thriller' }];
const authenticated = true;
const props = {
  authenticated, getCategories, categories, user, match: { path: '/path' }
};
const store = mockStore({
  authReducer: user, authenticated, categoryReducer: categories
});

describe('Connected SideNav component', () => {
  test('it should mount without crashing', () => {
    const wrapper = shallow(< ConnectedSideNav store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
describe('SideNav component', () => {
  test('it should mount without crashing for a rookie user', () => {
    const wrapper = shallow(< SideNav {...props} />);
    expect(wrapper.length).toBe(1);
  });
});
