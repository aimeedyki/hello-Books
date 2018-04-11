import React from 'react';
import { shallow } from 'enzyme';
import { mockStore } from '../../../__mocks__/mockConfig';
import ConnectedSideNav, { SideNav } from '../../../components/Common/SideNav';

const user = {
  name: 'james',
  email: 'james@yahoo.com',
  level: 'rookie',
  profilePic: 'james.jpg',
  admin: false
};
const getCategories = jest.fn();
const categories = [{ id: 1, name: 'romance' }, { id: 2, name: 'thriller' }];
const authenticated = true;
const props = {
  authenticated,
  getCategories,
  categories,
  user,
  name: 'james',
  email: 'james@yahoo.com',
  match: { path: '/path' }
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
  test('it should contain user details', () => {
    const wrapper = shallow(< SideNav {...props} />);
    expect(wrapper.find('.email').text()).toBe('james@yahoo.com');
    expect(wrapper.find('.name').text()).toBe('Hello james!');
  });
  test('it should have 5 NavLinks for a regular user', () => {
    const wrapper = shallow(< SideNav {...props} />);
    expect(wrapper.find('NavLink').length).toBe(5);
  });
  test('it should have 6 NavLinks for an admin user', () => {
    user.admin = true;
    const wrapper = shallow(< SideNav {...props} />);
    expect(wrapper.find('NavLink').length).toBe(6);
  });
  test('it should have called getcategories when it mounted', () => {
    const wrapper = shallow(< SideNav {...props} />);
    expect(props.getCategories).toHaveBeenCalled();
  });
});
