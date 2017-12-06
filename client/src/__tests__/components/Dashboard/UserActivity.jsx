import React from 'react';
import { shallow } from 'enzyme';
import { mockStore } from '../../../__mocks__/mockConfig';
import ConnectedUserActivity,
{ UserActivity } from '../../../components/Dashboard/UserActivity';

const displayNotification = jest.fn();
const user = {
  admin: true
};
const notifications = {
  user: { username: 'aimee' },
  book: { title: 'a book' },
  action: 'borrowed',
  createdAt: new Date()
};
const props = { displayNotification, notifications };
const store = mockStore({
  authReducer: user, userReducer: notifications
});

const setUp = () => shallow(<UserActivity { ...props } />);

describe('Connected UserActivity component', () => {
  test('it should mount without crashing', () => {
    const wrapper = shallow(< ConnectedUserActivity store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

describe('UserActivity component', () => {
  test('it should mount without crashing', () => {
    const wrapper = setUp();
    expect(wrapper.length).toBe(1);
  });
  test('it should call reset state when new props are added', () => {
    const newNotification = [{
      user: { username: 'aimee' },
      book: { title: 'a book' },
      action: 'borrowed',
      createdAt: 'somedate'
    },
    {
      user: { username: 'aimee' },
      book: { title: 'a book' },
      action: 'return',
      createdAt: 'now'
    }];
    const wrapper = shallow(<UserActivity { ...props } />);
    wrapper.setProps({ notifications: newNotification });
    expect(wrapper.length).toBe(1);
  });
});
