import React from 'react';
import { shallow, mount } from 'enzyme';
import { mockStore } from '../../../__mocks__/mockConfig';
import ConnectedOutstanding,
{ Outstanding } from '../../../components/Library/Outstanding';

const getOutstanding = jest.fn();
const returnBook = () => Promise.resolve(true);
const errorMessage = '';
const notReturned = '';
const user = {
  admin: true
};
const newHistories = [{
  id: 1,
  book: { title: 'a book' },
  expected: new Date().getTime(),
  createdAt: new Date().getTime(),
  returnedDate: null
}];
const pagination = {
  pageCount: 3,
  page: 2,
};
const props = { getOutstanding, returnBook, pagination, errorMessage };
const store = mockStore({
  bookReducer: {
    error: errorMessage
  },
  userReducer: {
    notReturned: {
      histories: notReturned,
      pagination
    }
  }
});

const setUp = () => shallow(<Outstanding { ...props } />);

describe('Connected Outstanding component', () => {
  test('it should mount without crashing', () => {
    const wrapper = shallow(< ConnectedOutstanding store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

describe('Outstanding component', () => {
  test('it should mount without crashing', () => {
    const wrapper = setUp();
    expect(wrapper.length).toBe(1);
  });
  test('it should call reset state when new props are added', () => {
    const wrapper = mount(<Outstanding { ...props } />);
    wrapper.setProps({ notReturned: newHistories });
    wrapper.find('#return-1').simulate('click');
    expect(wrapper.length).toBe(1);
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
  test('should call refresh gets called', () => {
    const wrapper = setUp();
    const refreshSpy = jest.spyOn(
      wrapper.instance(), 'refresh'
    );
    wrapper.instance().refresh();
    expect(refreshSpy).toHaveBeenCalledTimes(1);
  });
});
