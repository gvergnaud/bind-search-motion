import {
  SELECT_NODE,
  REQUEST_NODES,
  RECEIVE_NODES,
} from '../actions';

export default function nodesReducer(state = [], action) {
  switch (action.type) {
    case REQUEST_NODES:
      return [
        {
          isCenter: true,
          pertinence: 1,
          nodeId: action.node.id,
        }
      ];

    case RECEIVE_NODES:
      return [
        ...action.propositions.map(proposition => ({
          isCenter: false,
          nodeId: proposition.node.id,
          pertinence: proposition.pertinence,
        })),
        ...state,
      ];

    default:
      return state;
  }
}
