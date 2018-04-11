import {
  ADD_CATEGORY,
  GET_CATEGORIES,
  EDIT_CATEGORY,
  DELETE_CATEGORY
} from '../../actions/types';
import categoryReducer from '../../reducers/book/categoryReducer';

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

describe('book reducer', () => {
  test('should return initial state when there is no action', () => {
    expect(categoryReducer(state, {})).toEqual(state);
  });

  test('should return new category when action type is ADD_CATEGORY', () => {
    action.type = ADD_CATEGORY;
    expect(categoryReducer(state, action)).toEqual(newCategories);
  });

  test('should return all categories when action type is GET_CATEGORIES',
    () => {
      action.type = GET_CATEGORIES;
      action.payload = newCategories;
      expect(categoryReducer(state, action).categories).toEqual(newCategories);
    });

  test('should return edited category when action type is EDIT_CATEGORY',
    () => {
      action.type = EDIT_CATEGORY;
      state.categories = newCategories;
      expect(categoryReducer(state, action)).toEqual(newCategories);
    });

  test('should remove category when action type is DELETE_CATEGORY', () => {
    action.type = DELETE_CATEGORY;
    action.payload = 1;
    expect(categoryReducer(state, action)).toEqual([action.category]);
  });
});
