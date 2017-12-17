import React from 'react';
import { render } from 'react-dom';
import { shallow } from 'enzyme';

import refreshToken from '../../src/index';
import App from '../components/App';
import * as authAction from '../actions/authAction';

jest.mock('react-dom', () => ({ render: jest.fn() }));

describe('index component', () => {
  test('it renders without crashing', () => {
    const div = document.createElement('div');
    render(<App />, div);
    global.document.getElementById = id => id === 'main' && div;
    expect(render).toHaveBeenCalledWith(<App />, div);
  });
  test('it sets token in local storage to Authorization header', () => {
    localStorage.__STORE__.token = 'someToken';
    expect(localStorage.__STORE__.token).toBe('someToken');
    authAction.setAuthorizationToken = jest.fn();
    const authSpy = jest.spyOn(authAction, 'setAuthorizationToken');
    refreshToken();
    expect(authSpy)
      .toHaveBeenCalledWith(localStorage.__STORE__.token);
  });
});
