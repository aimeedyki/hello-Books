import React from 'react';
import { shallow } from 'enzyme';
import { mockStore } from '../../../__mocks__/mockConfig';
import ConnectedAddBook,
{ AddBook } from '../../../components/Library/AddBook';

const addBook = jest.fn(() => Promise.resolve(true));
const clearErrorMessage = jest.fn();
const imageUpload = jest.fn(() => ({ end: jest.fn((err, res) => { }) }));
const getCategories = jest.fn();
const categories = [{ id: 1, name: 'romance' }, { id: 2, name: 'thriller' }];

const errorMessage = '';
const props = {
  imageUpload,
  errorMessage,
  categories,
  getCategories,
  clearErrorMessage,
  addBook
};
const store = mockStore({
  bookReducer: { error: errorMessage, },
  categoryReducer: categories
});

const setUp = () => shallow(<AddBook { ...props } />);

describe('Connected AddBook component', () => {
  test('it should mount without crashing', () => {
    const wrapper = shallow(< ConnectedAddBook store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

describe('AddBookcomponent', () => {
  test('it should mount without crashing', () => {
    const wrapper = setUp();
    expect(wrapper.length).toBe(1);
  });
  test('it should contain heading for add book page', () => {
    const wrapper = setUp();
    expect(wrapper.find('h5').text()).toBe('Add A New Book');
  });
  test(`should call handleChange when there is a change in any field 
  and set its value to state`, () => {
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
      expect(wrapper.instance().state.title).toBe('a book');
    });

  test(`should call imageChange when there is a book image file 
  and set its value to the state key, imageFile`,
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
      expect(wrapper.instance().state.imageFile).toBe('a book');
    });

  test(`should call categorySelect when there is a change in select 
  ands et its value to the state state key, categoryId`, () => {
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
      expect(wrapper.instance().state.categoryId).toBe(1);
    });

  test('it should call renderAlert when there is a change in error props',
    () => {
      const wrapper = shallow(<AddBook { ...props } />);
      wrapper.setProps({ errorMessage: 'nextProps error' });
      expect(wrapper.length).toBe(1);
      expect(props.clearErrorMessage).toHaveBeenCalled();
    });

  test('should call addBook user when form is submited', () => {
    const wrapper = setUp();
    const handleFormSubmitSpy = jest.spyOn(
      wrapper.instance(), 'handleFormSubmit'
    );
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().handleFormSubmit(event);
    expect(handleFormSubmitSpy).toHaveBeenCalledTimes(1);
    expect(props.addBook).toHaveBeenCalled();
  });
});
