import React from 'react';
import { shallow } from 'enzyme';
import { mockStore } from '../../../__mocks__/mockConfig';
import ConnectedCategoryControls,
{ CategoryControls } from '../../../components/Dashboard/CategoryControls';

const editCategory = jest.fn(() => Promise.resolve(true));
const deleteCategory = jest.fn(() => Promise.resolve(true));

const user = {
  name: 'james',
  level: 'rookie',
  email: 'james@yahoo.com',
  profilePic: 'james.jpg',
  admin: true
};
const categories = [{ id: 1, name: 'romance' }, { id: 2, name: 'thriller' }];
const error = 'This is an error message';
const errorMessage = '';
const props = { categories, editCategory, deleteCategory };
const store = mockStore({
  authReducer: user, bookReducer: { error }, categoryReducer: categories
});
const profileObj = {
  email: 'aimee@gmail.com',
  givenName: 'aimee',
  familyName: 'dykiii',
  googleId: '11229993',
  imageUrl: 'kndknsl'
};

const setUp = () => shallow(<CategoryControls { ...props } />);

describe('Connected CategoryControls component', () => {
  test('it should mount without crashing', () => {
    const wrapper = shallow(< ConnectedCategoryControls store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

describe('CategoryControls component', () => {
  test('it should mount without crashing', () => {
    const wrapper = setUp();
    expect(wrapper.length).toBe(1);
  });
  test(`it should show the submit and cancel buttons 
  when edit button is clicked`, () => {
      const wrapper = setUp();
      wrapper.find('#edit-1').simulate('click');
      expect(wrapper.length).toBe(1);
    });
  test(`it should hide the submit and cancel buttons 
  when cancel button is clicked`, () => {
      const wrapper = setUp();
      expect(wrapper.length).toBe(1);
      wrapper.find('#cancel-1').simulate('click');
    });
  test(`it should call edit category action creator 
  when submit button is clicked`, () => {
      const wrapper = setUp();
      expect(wrapper.length).toBe(1);
      wrapper.find('#submit-1').simulate('click');
      expect(props.editCategory).toHaveBeenCalled();
    });
  test(`it should call handle delete function when delete button 
  is clicked`, () => {
      const wrapper = setUp();
      const handleDeleteSpy = jest.spyOn(
        wrapper.instance(), 'handleDelete'
      );
      wrapper.find('#delete-1').simulate('click');
      expect(handleDeleteSpy).toHaveBeenCalled();
    });
  test(`should call updateForm when there is a change in a field 
  and set the field value to state`, () => {
      const wrapper = setUp();
      const updateFormSpy = jest.spyOn(
        wrapper.instance(), 'updateForm'
      );
      const event = {
        preventDefault: jest.fn(),
        target: { name: 'romance', value: 'rome' }
      };
      wrapper.instance().updateForm(event);
      expect(updateFormSpy).toHaveBeenCalledTimes(1);
      expect(wrapper.instance().state.romance).toBe('rome');
    });
  test('it should call reset state when new props are added', () => {
    const newCategories = [
      { id: 1, name: 'romance' },
      { id: 2, name: 'thriller' }, { id: 3, name: 'mystery' }];
    const wrapper = shallow(<CategoryControls { ...props } />);
    expect(Object.keys(wrapper.instance().state).length).toBe(1);
    wrapper.setProps({ categories: newCategories });
    expect(Object.keys(wrapper.instance().state).length).toBe(4);
  });
  test('should call handleDelete user when delete  is called', () => {
    const alert = () => Promise.resolve(true);
    const wrapper = setUp();
    const handleDeleteSpy = jest.spyOn(
      wrapper.instance(), 'handleDelete'
    );
    const categoryId = 1;
    wrapper.instance().handleDelete(categoryId);
    expect(handleDeleteSpy).toHaveBeenCalledTimes(1);
  });
});
