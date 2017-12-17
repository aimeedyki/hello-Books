import React from 'react';
import { shallow } from 'enzyme';
import { mockStore } from '../../../__mocks__/mockConfig';
import ConnectedCategoryControls,
{ CategoryControls } from '../../../components/Dashboard/CategoryControls';

const editCategory = () => Promise.resolve(true);
const deleteCategory = () => Promise.resolve(true);

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
    wrapper.find('#edit-1').simulate('click');
    wrapper.find('#cancel-1').simulate('click');
    wrapper.find('#submit-1').simulate('click');
    wrapper.find('#delete-1').simulate('click');
  });
  test('should call updateForm when there is a change in a field', () => {
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
  });
  test('it should call reset state when new props are added', () => {
    const newCategories = [
      { id: 1, name: 'romance' },
      { id: 2, name: 'thriller' }, { id: 3, name: 'mystery' }];
    const wrapper = shallow(<CategoryControls { ...props } />);
    wrapper.setProps({ categories: newCategories });
    expect(wrapper.length).toBe(1);
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
