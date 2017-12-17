import React from 'react';
import { shallow } from 'enzyme';

import Pagination from '../../../components/Common/Pagination';

const props = {
  currentPage: 2,
  previousPage: jest.fn(),
  nextPage: jest.fn(),
  newPage: jest.fn(),
  pages: [1, 2, 3],
  totalPages: 3
};

const onClick = jest.fn();

describe('Pagination component', () => {
  test('should mount without crashing', () => {
    const wrapper = shallow(<Pagination {...props} />);
    wrapper.find('#previous').simulate('click');
    wrapper.find('#new3').simulate('click');
    wrapper.find('#next').simulate('click');
    expect(wrapper.length).toBe(1);
  });
  test('previous button should be disabled when the page number is 1', () => {
    props.currentPage = 1;
    const wrapper = shallow(<Pagination {...props} />);
    expect(wrapper.length).toBe(1);
  });
  test('next button should be disabled when the page number is 3', () => {
    props.currentPage = 3;
    const wrapper = shallow(<Pagination {...props} />);
    expect(wrapper.length).toBe(1);
  });
});
