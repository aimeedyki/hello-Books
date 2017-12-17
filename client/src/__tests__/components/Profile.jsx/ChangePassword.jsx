import React from 'react';
import { shallow } from 'enzyme';
import { mock, mockStore } from '../../../__mocks__/mockConfig';
import ConnectedChangePassword,
{ ChangePassword } from '../../../components/Profile/ChangePassword';

const errorMessage = '';
const user = {
  name: 'james',
  Password: 'rookie',
  email: 'james@yahoo.com',
  profilePic: 'james.jpg',
  admin: false,
  PasswordId: 1
};
const passwordChange = () => Promise.resolve(true);
const clearErrorMessage = jest.fn();
const push = jest.fn();

const store = mockStore({
  authReducer: user,
  userReducer: { error: errorMessage }
});

const props = {
  errorMessage,
  user,
  passwordChange,
  clearErrorMessage,
  history: { push }
};
const setUp = () => shallow(<ChangePassword { ...props } />);

describe('Connected ChangePassword component', () => {
  test('it should mount without crashing', () => {
    const wrapper = shallow(< ConnectedChangePassword store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

describe('ChangePassword component', () => {
  test('it should mount without crashing', () => {
    const wrapper = setUp();
    expect(wrapper.length).toBe(1);
  });
  test('should call handleChange when there is a change in a fields', () => {
    const wrapper = setUp();
    const handleChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleChange'
    );
    const event = {
      preventDefault: jest.fn(),
      target: { name: 'newPassword', value: 'hiheyho' }
    };
    wrapper.instance().handleChange(event);
    expect(handleChangeSpy).toHaveBeenCalledTimes(1);
  });
  test('should call changePassword user when form is submited', () => {
    const wrapper = setUp();
    wrapper.setState({
      newPassword: 'password',
      confirmNewPassword: 'password'
    });
    const handlePasswordSpy = jest.spyOn(
      wrapper.instance(), 'handleFormSubmit'
    );
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().handleFormSubmit(event);
    expect(handlePasswordSpy).toHaveBeenCalledTimes(1);
  });
  test('should call changePassword user when form is submited but fails',
    () => {
      props.passwordChange = () => Promise.reject();
      const wrapper = shallow(<ChangePassword { ...props } />);
      wrapper.setState({
        newPassword: 'password',
        confirmNewPassword: 'password'
      });
      const handlePasswordSpy = jest.spyOn(
        wrapper.instance(), 'handleFormSubmit'
      );
      const event = {
        preventDefault: jest.fn(),
      };
      wrapper.instance().handleFormSubmit(event);
      expect(handlePasswordSpy).toHaveBeenCalledTimes(1);
    });
  test('should not change Password if both passwords are not the same', () => {
    const wrapper = setUp();
    wrapper.setState({
      newPassword: 'password',
      confirmNewPassword: 'passworrd'
    });
    const handlePasswordSpy = jest.spyOn(
      wrapper.instance(), 'handleFormSubmit'
    );
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().handleFormSubmit(event);
    expect(handlePasswordSpy).toHaveBeenCalledTimes(1);
  });
  test('should call closePage when you want to go back', () => {
    const wrapper = setUp();
    const closePageSpy = jest.spyOn(
      wrapper.instance(), 'closePage'
    );
    wrapper.instance().closePage();
    expect(closePageSpy).toHaveBeenCalledTimes(1);
  });
});
