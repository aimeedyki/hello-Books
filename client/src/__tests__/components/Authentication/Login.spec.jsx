import React from 'react';
import { shallow } from 'enzyme';
import { mock, mockStore } from '../../../__mocks__/mockConfig';
import ConnectedLogin,
{ Login } from '../../../components/Authentication/Login';

const signinUser = jest.fn(() => Promise.resolve(true));
const clearErrorMessage = jest.fn();
const error = 'This is an error message';
const errorMessage = '';
const props = { signinUser, errorMessage, clearErrorMessage };
const state = { username: 'aimee', password: 'password' };
const store = mockStore({ authReducer: { error } });
const profileObj = {
  email: 'aimee@gmail.com',
  givenName: 'aimee',
  familyName: 'dykiii',
  googleId: '11229993',
  imageUrl: 'kndknsl'
};

const setUp = () => shallow(<Login {...state} { ...props } />);

describe('Connected Login component', () => {
  test('it should mount without crashing', () => {
    const wrapper = shallow(< ConnectedLogin store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

describe('Login component', () => {
  test('it should mount without crashing', () => {
    const wrapper = setUp();
    expect(wrapper.length).toBe(1);
  });

  test('it should contain the login greeting', () => {
    const wrapper = setUp();
    expect(wrapper.find('h4').text()).toBe('Welcome back! Login to continue');
  });

  test('it should contain login form', () => {
    const wrapper = setUp();
    expect(wrapper.find('form').length).toBe(1);
  });

  test('should call handleChange when there is a change in any field', () => {
    const wrapper = setUp();
    const handleChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleChange'
    );
    const event = {
      preventDefault: jest.fn(),
      target: { name: 'email', value: 'aimee@yahoo.com' }
    };
    wrapper.instance().handleChange(event);
    expect(handleChangeSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.instance().state.email).toBe('aimee@yahoo.com');
  });

  test('it should display error message when it exists in props', () => {
    const wrapper = shallow(<Login { ...props } />);
    wrapper.setProps({ errorMessage: 'nextProps error' });
    expect(wrapper.length).toBe(1);
    expect(props.clearErrorMessage).toHaveBeenCalled();
  });

  test('should return error if there is a google login error', () => {
    const wrapper = setUp();
    const handleGoogleLoginSpy = jest.spyOn(
      wrapper.instance(), 'handleGoogleLogin'
    );
    const response = {
      error: 'i am an error'
    };
    wrapper.instance().handleGoogleLogin(response);
    expect(handleGoogleLoginSpy).toHaveBeenCalledTimes(1);
    expect(props.signinUser).not.toHaveBeenCalled();
  });

  test('should call handleGoogleLogin google login is used', () => {
    const wrapper = setUp();
    const handleGoogleLoginSpy = jest.spyOn(
      wrapper.instance(), 'handleGoogleLogin'
    );
    const response = {
      profileObj
    };
    wrapper.instance().handleGoogleLogin(response);
    expect(handleGoogleLoginSpy).toHaveBeenCalledTimes(1);
    expect(props.signinUser).toHaveBeenCalled();
  });

  test('should call login user when form is submited', () => {
    const wrapper = setUp();
    const handleLoginSpy = jest.spyOn(
      wrapper.instance(), 'handleFormSubmit'
    );
    const propsLoginSpy = jest.spyOn(
      props, 'signinUser'
    );
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.find('form').simulate('submit', event);
    wrapper.instance().handleFormSubmit(event);
    expect(handleLoginSpy).toHaveBeenCalledTimes(1);
    expect(props.signinUser).toHaveBeenCalled();
  });
});
