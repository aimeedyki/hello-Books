import React from 'react';
import { shallow } from 'enzyme';
import { mockStore } from '../../../__mocks__/mockConfig';
import ConnectedEditBook,
{ EditBook } from '../../../components/Library/EditBook';

const modifyBook = () => Promise.resolve(true);
const clearErrorMessage = jest.fn();
const imageUpload = jest.fn(() => ({ end: jest.fn((err, res) => { }) }));
const categories = [{ id: 1, name: 'romance' }, { id: 2, name: 'thriller' }];
const getCategories = jest.fn();
const getABook = jest.fn();
const book = {
  id: 1,
  title: 'the title',
  image: '',
  author: 'an author',
  description: 'a description',
  quantity: 10,
  category: { name: 'this category' }

};

const errorMessage = '';
const props = {
  imageUpload,
  errorMessage,
  categories,
  getABook,
  book,
  getCategories,
  location: { pathname: '/effgr/2/dff' },
  clearErrorMessage,
  modifyBook
};
const store = mockStore({
  bookReducer: { error: errorMessage, },
  categoryReducer: { categories }
});

const setUp = () => shallow(<EditBook { ...props } />);

describe('Connected EditBook component', () => {
  test('it should mount without crashing', () => {
    const wrapper = shallow(< ConnectedEditBook store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

describe('EditBookcomponent', () => {
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
      target: { name: 'title', value: 'a book' }
    };
    wrapper.instance().handleChange(event);
    expect(handleChangeSpy).toHaveBeenCalledTimes(1);
  });
  test('should call imageChange when there is a book image file',
    () => {
      const wrapper = setUp();
      const imageChangeSpy = jest.spyOn(
        wrapper.instance(), 'imageChange'
      );
      const event = {
        target: { files: ['a book'] }
      };
      wrapper.instance().imageChange(event);
      expect(imageChangeSpy).toHaveBeenCalledTimes(1);
    });
  test('should call categorySelect when there is a change in select', () => {
    const wrapper = setUp();
    const categorySelectSpy = jest.spyOn(
      wrapper.instance(), 'categorySelect'
    );
    const event = {
      preventDefault: jest.fn(),
      target: { value: 1 }
    };
    wrapper.instance().categorySelect(event);
    expect(categorySelectSpy).toHaveBeenCalledTimes(1);
  });
  test('it should call renderAlert when there is a change in props', () => {
    const wrapper = shallow(<EditBook { ...props } />);
    wrapper.setProps({ errorMessage: 'nextProps error' });
    expect(wrapper.length).toBe(1);
  });
  test('should call modifyBook user when form is submited', () => {
    const wrapper = setUp();
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
