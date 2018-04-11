import React from 'react';
import { shallow } from 'enzyme';
import { mock, mockStore } from '../../../__mocks__/mockConfig';
import ConnectedChangeLevel,
{ ChangeLevel } from '../../../components/Profile/ChangeLevel';

const errorMessage = '';
const user = {
  name: 'james',
  level: 'rookie',
  email: 'james@yahoo.com',
  profilePic: 'james.jpg',
  admin: false,
  levelId: 1
};
const changeLevel = jest.fn(() => Promise.resolve(true));
const clearErrorMessage = jest.fn();
const push = jest.fn();

const store = mockStore({
  authReducer: { error: errorMessage },
  userReducer: user
});

const props = {
  errorMessage,
  user,
  changeLevel,
  clearErrorMessage,
  history: { push }
};
const setUp = () => shallow(<ChangeLevel { ...props } />);

describe('Connected ChangeLevel component', () => {
  test('it should mount without crashing', () => {
    const wrapper = shallow(< ConnectedChangeLevel store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

describe('ChangeLevel component', () => {
  test('it should mount without crashing', () => {
    const wrapper = setUp();
    expect(wrapper.length).toBeDefined();
  });
  test('should call handleChange when there is a change in any field', () => {
    const wrapper = setUp();
    const handleChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleChange'
    );
    const event = {
      preventDefault: jest.fn(),
      target: { name: 'levelId', value: 1 }
    };
    wrapper.instance().handleChange(event);
    expect(handleChangeSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.instance().state.levelId).toBe(1);
  });
  test('it should call renderAlert when there is an error', () => {
    const wrapper = shallow(<ChangeLevel { ...props } />);
    wrapper.setProps({ errorMessage: 'nextProps error' });
    const alertSpy = jest.spyOn(
      wrapper.instance(), 'renderAlert'
    );
    wrapper.instance().renderAlert();
    expect(alertSpy).toHaveBeenCalled();
  });
  test('should not change level if levelId is the same', () => {
    const wrapper = setUp();
    wrapper.setState({ newLevelId: 1 });
    const handleLevelSpy = jest.spyOn(
      wrapper.instance(), 'handleFormSubmit'
    );
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().handleFormSubmit(event);
    expect(handleLevelSpy).toHaveBeenCalledTimes(1);
    expect(props.changeLevel).not.toHaveBeenCalled();
  });
  test('should call changeLevel user when form is submited', () => {
    const wrapper = setUp();
    wrapper.setState({ newLevelId: 2 });
    const handleLevelSpy = jest.spyOn(
      wrapper.instance(), 'handleFormSubmit'
    );
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().handleFormSubmit(event);
    expect(handleLevelSpy).toHaveBeenCalledTimes(1);
    expect(props.changeLevel).toHaveBeenCalled();
  });

  test('it should move to the profile page when the close page link is clicked',
    () => {
      const wrapper = setUp();
      const closePageSpy = jest.spyOn(
        props.history, 'push'
      );
      wrapper.find('#close').simulate('click');
      expect(closePageSpy).toHaveBeenCalled();
    });
});
