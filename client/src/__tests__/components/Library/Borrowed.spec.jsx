import React from 'react';
import { shallow } from 'enzyme';
import { mockStore } from '../../../__mocks__/mockConfig';
import ConnectedBorrowed,
{ Borrowed } from '../../../components/Library/Borrowed';

const getHistory = jest.fn();
const histories = '';
const user = {
  admin: true
};
const newHistories = [{
  book: { title: 'a book' },
  expected: 'a date',
  createdAt: 'a date',
  returnedDate: 'a date'
}];
const pagination = {
  pageCount: 3,
  page: 2,
};
const props = { getHistory, pagination };
const store = mockStore({
  authReducer: user, userReducer: { histories, pagination }
});

const setUp = () => shallow(<Borrowed { ...props } />);

describe('Connected Borrowed component', () => {
  test('it should mount without crashing', () => {
    const wrapper = shallow(< ConnectedBorrowed store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

describe('Borrowed component', () => {
  test('it should mount without crashing', () => {
    const wrapper = setUp();
    expect(wrapper.length).toBe(1);
  });
  test('it should call display history when new props are added', () => {
    const wrapper = shallow(<Borrowed { ...props } />);
    wrapper.setProps({ histories: newHistories });
    expect(wrapper.length).toBe(1);
  });
  test('should call an instance of getNewPage function', () => {
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
  test('should call an instance of getNextPage function', () => {
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
  test('should call an instance of getPreviousPage function', () => {
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
});
