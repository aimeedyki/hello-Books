import React from 'react';
import { shallow, mount } from 'enzyme';
import { mockStore } from '../../../__mocks__/mockConfig';
import ConnectedUserTransactions,
{ UserTransactions } from '../../../components/Dashboard/UserTransactions';

const confirmTransaction = () => Promise.resolve(true);
const displayAllTransactions = jest.fn();
const displayConfirmedTransactions = jest.fn();
const displayUnconfirmedTransactions = jest.fn();
const user = {
  admin: true
};
const transactions = [{
  username: 'aimee',
  transactionId: 'ndknk',
  amount: 2000,
  transactionType: 'subscription',
  id: 1,
  confirmed: false,
  level: { type: 'rookie' }
},
{
  username: 'ray',
  transactionId: 'ndknk218',
  amount: 500,
  transactionType: 'surcharge',
  id: 2,
  confirmed: false,
  level: { type: 'bookworm' }
}
];
const error = '';
const props = {
  displayAllTransactions,
  displayConfirmedTransactions,
  displayUnconfirmedTransactions,
  transactions,
  error
};
const store = mockStore({
  authReducer: user, userReducer: { transactions, error }
});

const setUp = () => shallow(<UserTransactions { ...props } />);

describe('Connected UserTransactions component', () => {
  test('it should mount without crashing', () => {
    const wrapper = shallow(< ConnectedUserTransactions store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

describe('UserTransactions component', () => {
  test('it should mount without crashing', () => {
    const wrapper = setUp();
    expect(wrapper.length).toBe(1);
  });
  test('it should call reset state when new props are added', () => {
    const newTransaction = [{
      username: 'aimee',
      transactionId: 'ndknk',
      amount: 2000,
      transactionType: 'subscription',
      id: 1,
      confirmed: false,
      level: { type: 'rookie' }
    },
    {
      username: 'ray',
      transactionId: 'ndknk218',
      amount: 500,
      transactionType: 'surcharge',
      id: 2,
      confirmed: true,
      level: { type: 'bookworm' }
    },
    {
      username: 'raymond',
      transactionId: 'ndxsknk8',
      amount: 5000,
      transactionType: 'surcharge',
      id: 3,
      confirmed: false,
      level: { type: 'bookworm' }
    }];
    const wrapper = mount(<UserTransactions { ...props } />);
    wrapper.setProps({ transactions: newTransaction });
    wrapper.find('#confirm-1').simulate('click');
    wrapper.find('#confirm-3').simulate('click');
    expect(wrapper.length).toBe(1);
  });
  test(`should call handleFilter when there is a change in the select 
  to display all transactions`, () => {
      const wrapper = setUp();
      const handleFilterSpy = jest.spyOn(
        wrapper.instance(), 'handleFilter'
      );
      const event = {
        preventDefault: jest.fn(),
        target: { value: 'all' }
      };
      wrapper.instance().handleFilter(event);
      expect(handleFilterSpy).toHaveBeenCalledTimes(1);
      expect(props.displayAllTransactions).toHaveBeenCalled();
    });
  test(`should call handleFilter when there is a change in the select 
    to display confirmed transactions`, () => {
      const wrapper = setUp();
      const handleFilterSpy = jest.spyOn(
        wrapper.instance(), 'handleFilter'
      );
      const event = {
        preventDefault: jest.fn(),
        target: { value: 'confirmed' }
      };
      wrapper.instance().handleFilter(event);
      expect(handleFilterSpy).toHaveBeenCalledTimes(1);
      expect(props.displayConfirmedTransactions).toHaveBeenCalled();
    });
  test(`should call handleFilter when there is a change in the select 
      to display all transactions`, () => {
      const wrapper = setUp();
      const handleFilterSpy = jest.spyOn(
        wrapper.instance(), 'handleFilter'
      );
      const event = {
        preventDefault: jest.fn(),
        target: { value: 'unconfirmed' }
      };
      wrapper.instance().handleFilter(event);
      expect(handleFilterSpy).toHaveBeenCalledTimes(1);
      expect(props.displayUnconfirmedTransactions).toHaveBeenCalled();
    });
});
