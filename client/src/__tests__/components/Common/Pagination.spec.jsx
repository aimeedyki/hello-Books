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
    expect(wrapper.length).toBe(1);
  });
  test('should go to a previous page when previous button is clicked', () => {
    const wrapper = shallow(<Pagination {...props} />);
    wrapper.find('#previous').simulate('click');
    expect(props.previousPage).toHaveBeenCalled();
  });
  test('should go to a new page when a new page is clicked', () => {
    const wrapper = shallow(<Pagination {...props} />);
    wrapper.find('#new3').simulate('click');
    expect(props.newPage).toHaveBeenCalled();
  });
  test('should go to the next page when next button is clicked', () => {
    const wrapper = shallow(<Pagination {...props} />);
    wrapper.find('#next').simulate('click');
    expect(wrapper.length).toBe(1);
    expect(props.nextPage).toHaveBeenCalled();
  });

  test('previous button should be disabled when the page number is 1', () => {
    props.currentPage = 1;
    const wrapper = shallow(<Pagination {...props} />);
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('.disabled').text()).toBe('chevron_left');
  });
  test('next button should be disabled when the page number is 3', () => {
    props.currentPage = 3;
    const wrapper = shallow(<Pagination {...props} />);
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('.disabled').text()).toBe('chevron_right');
  });
});
