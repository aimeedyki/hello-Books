import React from 'react';
import { shallow } from 'enzyme';
import { mockStore } from '../../../__mocks__/mockConfig';
import ConnectedBook,
{ Book } from '../../../components/Library/Book';

const deleteBook = () => Promise.resolve(true);
const borrowBook = () => Promise.resolve(true);
const getBooks = jest.fn();
const user = {
  admin: true
};
const error = '';
const props = {
  deleteBook,
  getBooks,
  borrowBook,
  user,
  id: 1,
  title: 'a title',
  image: 'asdf.jpg',
  author: 'an author',
  description: 'a description',
  quantity: 10,
  category: { name: 'a category' }
};
const store = mockStore({
  bookReducer: { error },
  authReducer: user
});

const setUp = () => shallow(<Book { ...props } />);

describe('Connected Book component', () => {
  test('it should mount without crashing', () => {
    const wrapper = shallow(< ConnectedBook store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

describe('Bookcomponent', () => {
  test('it should mount without crashing', () => {
    const wrapper = setUp();
    wrapper.find('#rent').simulate('click');
    expect(wrapper.length).toBe(1);
  });
  test('should call an instance of the handleDelete function', () => {
    const wrapper = setUp();
    const handleDeleteSpy = jest.spyOn(
      wrapper.instance(), 'handleDelete'
    );
    wrapper.instance().handleDelete();
    expect(handleDeleteSpy).toHaveBeenCalledTimes(1);
  });
  test('should call an instance of the refresh function', () => {
    const wrapper = setUp();
    const refreshSpy = jest.spyOn(
      wrapper.instance(), 'refresh'
    );
    wrapper.instance().refresh();
    expect(refreshSpy).toHaveBeenCalledTimes(1);
  });
  test('should call an instance of the borrow function', () => {
    const wrapper = setUp();
    const borrowSpy = jest.spyOn(
      wrapper.instance(), 'borrow'
    );
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().borrow();
    expect(borrowSpy).toHaveBeenCalledTimes(1);
  });
});
