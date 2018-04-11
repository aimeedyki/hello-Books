import React from 'react';
import { render } from 'react-dom';
import { shallow } from 'enzyme';

import { refreshToken } from '../../src/index';
import App from '../components/App';

jest.mock('react-dom', () => ({ render: jest.fn() }));

const decodedToken = { exp: Date.now() };
describe('index component', () => {
  test('it renders without crashing', () => {
    const div = document.createElement('div');
    render(<App />, div);
    global.document.getElementById = id => id === 'main' && div;
    expect(render).toHaveBeenCalledWith(<App />, div);
  });
});
