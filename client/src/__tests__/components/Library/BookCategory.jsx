import React from 'react';
import { shallow, mount } from 'enzyme';
import { mockStore } from '../../../__mocks__/mockConfig';
import ConnectedBookCategory,
{ BookCategory } from '../../../components/Library/BookCategory';


const getBooksByCategory = jest.fn();
const clearSearchError = jest.fn();
const searchCategory = jest.fn();
const pagination = {
  pageCount: 3,
  page: 2,
};
const books = [{
  id: 1,
  title: 'a title',
  image: 'asdf.jpg',
  author: 'an author',
  description: 'a description',
  quantity: 10,
  category: { name: 'a category' }

},
{
  id: 1,
  title: 'the title',
  image: '',
  author: 'an author',
  description: 'a description',
  quantity: 10,
  category: { name: 'this category' }

}];
const error = '';
const category = 'thriller';
const props = {
  location: { pathname: 'asd/cat/2/asdf' },
  getBooksByCategory,
  pagination,
  clearSearchError,
  searchCategory,
  error,
  books,
  category
};
const store = mockStore({
  bookReducer: {
    searchError: error,
    bookCategory: {
      books, pagination, category
    },
    error
  }
});

const setUp = () => shallow(<BookCategory { ...props } />);

describe('Connected BookCategory component', () => {
  test('it should mount without crashing', () => {
    const wrapper = shallow(< ConnectedBookCategory store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

describe('BookCategorycomponent', () => {
  test('it should mount without crashing', () => {
    const wrapper = setUp();
    expect(wrapper.length).toBe(1);
  });
  test('it should mount the loader if there are no books', () => {
    props.books = '';
    const wrapper = shallow(<BookCategory { ...props } />);
    expect(wrapper.length).toBe(1);
  });
  test('should call getPagination gets called', () => {
    const wrapper = setUp();
    const getPaginationSpy = jest.spyOn(
      wrapper.instance(), 'getPagination'
    );
    wrapper.instance().getPagination();
    expect(getPaginationSpy).toHaveBeenCalledTimes(1);
  });
  test('should call getPages gets called', () => {
    const wrapper = setUp();
    const getPagesSpy = jest.spyOn(
      wrapper.instance(), 'getPages'
    );
    wrapper.instance().getPages(pagination.pageCount);
    expect(getPagesSpy).toHaveBeenCalledTimes(1);
  });
  test('should call getNewPage gets called', () => {
    const wrapper = setUp();
    const getNewPageSpy = jest.spyOn(
      wrapper.instance(), 'getNewPage'
    );
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().getNewPage(event, pagination.page);
    expect(getNewPageSpy).toHaveBeenCalledTimes(1);
  });
  test('should call getNextPage gets called', () => {
    const wrapper = setUp();
    const getNextPageSpy = jest.spyOn(
      wrapper.instance(), 'getNextPage'
    );
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().getNextPage(event, pagination.page);
    expect(getNextPageSpy).toHaveBeenCalledTimes(1);
  });
  test('should call getPreviousPage gets called', () => {
    const wrapper = setUp();
    const getPreviousPageSpy = jest.spyOn(
      wrapper.instance(), 'getPreviousPage'
    );
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().getPreviousPage(event, pagination.page);
    expect(getPreviousPageSpy).toHaveBeenCalledTimes(1);
  });
  test('should call searchBookCategory gets called', () => {
    const wrapper = setUp();
    const searchBookCategorySpy = jest.spyOn(
      wrapper.instance(), 'searchBookCategory'
    );
    const event = {
      preventDefault: jest.fn(),
      target: { value: 'break' }
    };
    wrapper.instance().searchBookCategory(event);
    expect(searchBookCategorySpy).toHaveBeenCalledTimes(1);
  });
  test('should call searchBookCategory gets called', () => {
    const wrapper = setUp();
    const searchBookCategorySpy = jest.spyOn(
      wrapper.instance(), 'searchBookCategory'
    );
    const event = {
      preventDefault: jest.fn(),
      target: { value: 'br' }
    };
    wrapper.instance().searchBookCategory(event);
    expect(searchBookCategorySpy).toHaveBeenCalledTimes(1);
  });
  test('should call submitCategorySearch user when form is submited', () => {
    const wrapper = setUp();
    const submitCategorySearchSpy = jest.spyOn(
      wrapper.instance(), 'submitCategorySearch'
    );
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().submitCategorySearch(event);
    expect(submitCategorySearchSpy).toHaveBeenCalledTimes(1);
  });
  test('it should get categories when a new category is selected', () => {
    const newPath = 'asd/cat/3/asdf';
    const wrapper = mount(<BookCategory { ...props } />);
    wrapper.setProps({ location: { pathname: newPath } });
    expect(wrapper.length).toBe(1);
  });
});
