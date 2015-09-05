import {
  SELECT_NODE,
  REQUEST_NODES,
  RECEIVE_NODES,
} from '../actions';

export default function nodesByIdReducer(state = {}, action) {
  switch (action.type) {
    case REQUEST_NODES:
      return {
        [action.node.id]: action.node,
        ...state,
      };

    case RECEIVE_NODES:
      return {
        [action.node.id]: action.node,
        ...action.propositions.reduce((acc, proposition) => {
          acc[proposition.node.id] = proposition.node;
          return acc;
        }, {}),
        ...state,
      };

    default:
      return state;
  }
}
