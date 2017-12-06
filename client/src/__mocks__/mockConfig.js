import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

export const middlewares = [thunk];
export const mockStore = configureMockStore(middlewares);

export const mock = new MockAdapter(axios);
