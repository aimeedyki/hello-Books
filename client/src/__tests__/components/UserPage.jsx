import React from 'react';
import { shallow } from 'enzyme';
import { mock, mockStore } from '../../__mocks__/mockConfig';
import ConnectedUserPage, { UserPage } from '../../components/UserPage';

const user = {
  name: 'james',
  level: 'rookie',
  email: 'james@yahoo.com',
  profilePic: 'james.jpg',
  admin: false
};
const authenticated = true;
const props = { authenticated, user, match: { path: '/path' } };
const store = mockStore({ authReducer: user, authenticated });
describe('Connected UserPage component', () => {
  test('it should mount without crashing', () => {
    const wrapper = shallow(< ConnectedUserPage store={store}/>);
    expect(wrapper.length).toBe(1);
  });
});

describe('UserPage component', () => {
  test('it should mount without crashing for a rookie user', () => {
    const wrapper = shallow(< UserPage {...props}/>);
    expect(wrapper.length).toBe(1);
  });
  test('it should mount without crashing for a bookworm user', () => {
    user.level = 'bookworm';
    const wrapper = shallow(< UserPage {...props}/>);
    expect(wrapper.length).toBe(1);
  });
  test('it should mount without crashing for a voracious user', () => {
    user.level = 'voracious';
    const wrapper = shallow(< UserPage {...props}/>);
    expect(wrapper.length).toBe(1);
  });
  test('it should mount without crashing for a user when level did not load',
    () => {
      user.level = '';
      const wrapper = shallow(< UserPage {...props}/>);
      expect(wrapper.length).toBe(1);
    });
  test('it should mount without crashing for a user without image', () => {
    user.profilePic = '';
    const wrapper = shallow(< UserPage {...props}/>);
    expect(wrapper.length).toBe(1);
  });
  test('it should mount without crashing for an admin user', () => {
    user.admin = true;
    const wrapper = shallow(< UserPage {...props}/>);
    expect(wrapper.length).toBe(1);
  });
});
