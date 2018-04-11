import React from 'react';
import { shallow } from 'enzyme';
import { mockStore } from '../../../__mocks__/mockConfig';
import ConnectedProfile,
{ Profile } from '../../../components/Profile/Profile';

const imageUpload = jest.fn(() => ({ end: jest.fn((err, res) => { }) }));
const changePic = jest.fn();
const push = jest.fn();
const errorMessage = '';
const user = {
  name: 'james',
  Password: 'rookie',
  email: 'james@yahoo.com',
  profilePic: 'james.jpg',
  admin: false,
  PasswordId: 1
};
const props = {
  imageUpload,
  errorMessage,
  history: { push },
  user,
  changePic
};
const store = mockStore({ authReducer: { user } });

const setUp = () => shallow(<Profile { ...props } />);

describe('Connected Profile component', () => {
  test('it should mount without crashing', () => {
    const wrapper = shallow(< ConnectedProfile store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

describe('Profilecomponent', () => {
  test('it should mount without crashing', () => {
    const wrapper = setUp();
    expect(wrapper.length).toBe(1);
  });
  test('should display the details of a user', () => {
    const wrapper = setUp();
    expect(wrapper.find('.email-fix').text()).toBe('james@yahoo.com');
    expect(wrapper.find('h5').text()).toBe('james');
  });
  test('should call the setLevelIcon function when it mounts', () => {
    const wrapper = setUp();
    const levelSpy = jest.spyOn(
      wrapper.instance(), 'setLevelIcon'
    );
    const level = 'bookworm';
    wrapper.instance().setLevelIcon(level);
    expect(levelSpy).toHaveBeenCalledTimes(1);
  });
  test(`should call imageChange when there is a profile image file and
  set it to state`,
    () => {
      const wrapper = setUp();
      const imageChangeSpy = jest.spyOn(
        wrapper.instance(), 'imageChange'
      );
      const event = {
        target: { files: ['a photo'] }
      };
      wrapper.instance().imageChange(event);
      expect(imageChangeSpy).toHaveBeenCalledTimes(1);
      expect(wrapper.instance().state.imageFile).toBe('a photo');
    });
  test('should call uploadPic when picture upload form is submited', () => {
    const wrapper = setUp();
    const changePicSpy = jest.spyOn(
      wrapper.instance(), 'uploadPic'
    );
    wrapper.instance().uploadPic();
    expect(changePicSpy).toHaveBeenCalledTimes(1);
  });
  test(`should call the props to change image 
  when picture upload form is submited`, () => {
      const wrapper = setUp();
      const changePicSpy = jest.spyOn(
        props, 'changePic'
      );
      wrapper.find('#send').simulate('click');
      expect(changePicSpy).toHaveBeenCalled();
    });
});
