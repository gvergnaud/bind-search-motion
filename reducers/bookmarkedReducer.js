import {
  BOOKMARK,
  UNBOOKMARK,
} from '../actions';

export default function bookmarkedReducer(state = [], action) {
  switch (action.type) {
    case BOOKMARK:
      return [
        {
          nodeId: action.id,
          createAt: Date.now()
        },
        ...state,
      ];

    case UNBOOKMARK:
      return state.filter(item => item.id !== action.id);

    default:
      return state;
  }
}
