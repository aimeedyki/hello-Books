import React from 'react';
import { shallow, mount } from 'enzyme';
import { mockStore } from '../../../__mocks__/mockConfig';
import ConnectedAllBooks,
{ AllBooks } from '../../../components/Library/AllBooks';


const getBooks = jest.fn();
const user = {
  admin: true
};
const clearSearchError = jest.fn();
const searchBooks = jest.fn();
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
  id: 2,
  title: 'the title',
  image: '',
  author: 'an author',
  description: 'a description',
  quantity: 10,
  category: { name: 'this category' }

}];
const error = '';
const props = {
  getBooks,
  pagination,
  clearSearchError,
  searchBooks,
  error,
  books
};
const store = mockStore({
  bookReducer: { searchError: error, books, error },
  authReducer: user
});

const setUp = () => shallow(<AllBooks { ...props } />);

describe('Connected AllBooks component', () => {
  test('it should mount without crashing', () => {
    const wrapper = shallow(< ConnectedAllBooks store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

describe('AllBookscomponent', () => {
  test('it should mount without crashing', () => {
    const wrapper = setUp();
    expect(wrapper.length).toBe(1);
  });
  test('it should mount the pagination components', () => {
    props.books = '';
    const wrapper = shallow(<AllBooks { ...props } />);
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
  test('should call searchLibrary gets called', () => {
    const wrapper = setUp();
    const searchLibrarySpy = jest.spyOn(
      wrapper.instance(), 'searchLibrary'
    );
    const event = {
      preventDefault: jest.fn(),
      target: { value: 'break' }
    };
    wrapper.instance().searchLibrary(event);
    expect(searchLibrarySpy).toHaveBeenCalledTimes(1);
  });
  test('should return all books if search length is less than 2', () => {
    const wrapper = setUp();
    const searchLibrarySpy = jest.spyOn(
      wrapper.instance(), 'searchLibrary'
    );
    const event = {
      preventDefault: jest.fn(),
      target: { value: 'b' }
    };
    wrapper.instance().searchLibrary(event);
    expect(searchLibrarySpy).toHaveBeenCalledTimes(1);
  });
  test('should call submitSearch user when form is submited', () => {
    const wrapper = setUp();
    const submitSearchSpy = jest.spyOn(
      wrapper.instance(), 'submitSearch'
    );
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().submitSearch(event);
    expect(submitSearchSpy).toHaveBeenCalledTimes(1);
  });
});
