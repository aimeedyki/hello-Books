import {
  ADD_CATEGORY,
  GET_CATEGORIES,
  EDIT_CATEGORY,
  DELETE_CATEGORY
} from '../../actions/types';
import categoryReducer from '../../reducers/book/categoryReducer';

describe('book reducer', () => {
  test('should handle different action types correctly', () => {
    const action = {
      payload: 'an error',
      category: {
        id: 2,
        name: 'some category'
      }
    };

    const state = {
      categories: [{
        id: 1,
        name: 'a category'
      }]
    };
    const newCategories = [{
      id: 1,
      name: 'a category'
    }, {
      id: 2,
      name: 'some category'
    }];
    action.type = ADD_CATEGORY;
    expect(categoryReducer(state, action)).toEqual(newCategories);

    action.type = GET_CATEGORIES;
    action.payload = newCategories;
    expect(categoryReducer(state, action).categories).toEqual(newCategories);

    action.type = EDIT_CATEGORY;
    state.categories = newCategories;
    expect(categoryReducer(state, action)).toEqual(newCategories);

    action.type = DELETE_CATEGORY;
    action.payload = 1;
    expect(categoryReducer(state, action)).toEqual([action.category]);
  });
});
