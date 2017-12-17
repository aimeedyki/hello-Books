import React from 'react';
import { shallow } from 'enzyme';
import { mock, mockStore } from '../../__mocks__/mockConfig';
import ConnectedUserPage, { UserPage } from '../../components/UserPage';
import rookie from '../../assets/images/rookie.jpg';
import bookworm from '../../assets/images/bookworm.png';
import voracious from '../../assets/images/voracious.jpg';
import adminImage from '../../assets/images/admin.jpg';
import noPicture from '../../assets/images/profile.jpeg';

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
  test('it should display a rookie icon for a rookie user', () => {
    const wrapper = shallow(< UserPage {...props}/>);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.instance().setLevelIcon()).toBe(rookie);
  });
  test('it should display a bookworm icon for a bookworm user', () => {
    user.level = 'bookworm';
    const wrapper = shallow(< UserPage {...props}/>);
    expect(wrapper.length).toBe(1);
    expect(wrapper.instance().setLevelIcon()).toBe(bookworm);
  });
  test('it should display a voracious icon for a voracious user', () => {
    user.level = 'voracious';
    const wrapper = shallow(< UserPage {...props}/>);
    expect(wrapper.length).toBe(1);
    expect(wrapper.instance().setLevelIcon()).toBe(voracious);
  });
  test('it should display a generic icon for a user when level did not load',
    () => {
      user.level = '';
      const wrapper = shallow(< UserPage {...props}/>);
      expect(wrapper.length).toBe(1);
      expect(wrapper.instance().setLevelIcon()).toBe(noPicture);
    });
  test('it should display a generic icon for a user without image', () => {
    user.profilePic = '';
    const wrapper = shallow(< UserPage {...props}/>);
    expect(wrapper.length).toBe(1);
    expect(wrapper.instance().setLevelIcon()).toBe(noPicture);
  });
  test('it should display an admin icon for an admin user', () => {
    user.admin = true;
    const wrapper = shallow(< UserPage {...props}/>);
    expect(wrapper.length).toBe(1);
    expect(wrapper.instance().setLevelIcon()).toEqual(adminImage);
  });
  test('it should render a footer component', () => {
    const wrapper = shallow(< UserPage {...props}/>);
    expect(wrapper.find('Footer').length).toBe(1);
  });
  test('it should render a SideNav component', () => {
    const wrapper = shallow(< UserPage {...props}/>);
    expect(wrapper.find('Connect(withRouter(SideNav))').length).toBe(1);
  });
});
