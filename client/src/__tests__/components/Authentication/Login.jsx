import React from 'react';
import { shallow } from 'enzyme';
import { mock, mockStore } from '../../../__mocks__/mockConfig';
import ConnectedLogin,
{ Login } from '../../../components/Authentication/Login';

const signinUser = () => Promise.resolve(true);
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
  test('should call handleChange when there is a change in a fields', () => {
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
  });
  test('it should call renderAlert when there is a change in props', () => {
    const wrapper = shallow(<Login { ...props } />);
    wrapper.setProps({ errorMessage: 'nextProps error' });
    expect(wrapper.length).toBe(1);
  });
  test('should call login user when form is submited', () => {
    const wrapper = setUp();
    const handleLoginSpy = jest.spyOn(
      wrapper.instance(), 'handleFormSubmit'
    );
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().handleFormSubmit(event);
    expect(handleLoginSpy).toHaveBeenCalledTimes(1);
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
  });
  test('should return error if there is a google login error', () => {
    const wrapper = setUp();
    const handleGoogleLoginSpy = jest.spyOn(
      wrapper.instance(), 'handleGoogleLogin'
    );
    const response = {
      profileObj,
      error: 'i am an error'
    };
    wrapper.instance().handleGoogleLogin(response);
    expect(handleGoogleLoginSpy).toHaveBeenCalledTimes(1);
  });
});
