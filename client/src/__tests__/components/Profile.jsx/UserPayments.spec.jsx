import React from 'react';
import { shallow } from 'enzyme';
import { mockStore } from '../../../__mocks__/mockConfig';
import ConnectedUserPayments,
{ UserPayments } from '../../../components/Profile/UserPayments';

const push = jest.fn();
const submitTransaction = () => Promise.resolve(true);

const user = {
  name: 'james',
  Password: 'rookie',
  email: 'james@yahoo.com',
  UserPaymentsPic: 'james.jpg',
  admin: false,
  PasswordId: 1
};
const props = {
  history: { push },
  user,
  submitTransaction
};
const store = mockStore({ authReducer: { user } });

const setUp = () => shallow(<UserPayments { ...props } />);

describe('Connected UserPayments component', () => {
  test('it should mount without crashing', () => {
    const wrapper = shallow(< ConnectedUserPayments store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

describe('UserPayments component', () => {
  test('it should mount without crashing', () => {
    const wrapper = setUp();
    expect(wrapper.length).toBe(1);
  });
  test('it should move to the profile page when the close page link is clicked',
    () => {
      const wrapper = setUp();
      const closePageSpy = jest.spyOn(
        props.history, 'push'
      );
      wrapper.find('#close').simulate('click');
      expect(closePageSpy).toHaveBeenCalledTimes(1);
    });
  test('should call an instance of closePage when you call the function',
    () => {
      const wrapper = setUp();
      const closePageSpy = jest.spyOn(
        wrapper.instance(), 'closePage'
      );
      wrapper.instance().closePage();
      expect(closePageSpy).toHaveBeenCalledTimes(1);
    });
  test('should call handleChange when there is a change in any of the fields',
    () => {
      const wrapper = setUp();
      const handleChangeSpy = jest.spyOn(
        wrapper.instance(), 'handleChange'
      );
      const event = {
        preventDefault: jest.fn(),
        target: { name: 'amount', value: 1000 }
      };
      wrapper.instance().handleChange(event);
      expect(handleChangeSpy).toHaveBeenCalledTimes(1);
      expect(wrapper.instance().state.amount).toBe(1000);
    });
  test('should call submitTransaction user when form is submited', () => {
    props.submitTransaction = () => Promise.reject();
    const wrapper = shallow(<UserPayments { ...props } />);
    const handleFormSubmitSpy = jest.spyOn(
      wrapper.instance(), 'handleFormSubmit'
    );
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().handleFormSubmit(event);
    expect(handleFormSubmitSpy).toHaveBeenCalledTimes(1);
  });
});
