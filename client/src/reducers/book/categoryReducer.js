import {
  ADD_CATEGORY,
  GET_CATEGORIES,
  EDIT_CATEGORY,
  DELETE_CATEGORY
} from '../../actions/types';

const initialState = {
  category: [],
  categories: []
};

/** reducers for book components
 * @export
 * @param {*} [state=initialState]
 * @param {*} action
 * @returns {*} state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return [
        ...state.categories, action.category
      ];
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case EDIT_CATEGORY:
      return [...state.categories.filter(category =>
        category.id !== action.category.id), action.category];
    case DELETE_CATEGORY:
      return [...state.categories.filter(category =>
        category.id !== action.payload)];
    default:
      return state;
  }
};
