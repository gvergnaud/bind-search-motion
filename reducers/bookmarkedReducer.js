import {
  BOOKMARK_NODE,
  UNBOOKMARK_NODE,
} from '../actions';

export default function bookmarkedReducer(state = [], action) {
  switch (action.type) {
    case BOOKMARK_NODE:
      return [
        {
          nodeId: action.node.id,
          createAt: Date.now()
        },
        ...state,
      ];

    case UNBOOKMARK_NODE:
      return state;

    default:
      return state;
  }
}
