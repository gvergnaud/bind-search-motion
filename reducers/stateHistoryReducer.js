import {
  REVERT_HISTORY,
  RECEIVE_NODES,
} from '../actions';

export default function stateHistoryReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_NODES:
      return {
        [Date.now()]: [
          ...action.propositions.map(proposition => ({
            isCenter: false,
            nodeId: proposition.node.id,
            pertinence: proposition.pertinence,
          })),
          {
            isCenter: true,
            pertinence: 1,
            nodeId: action.node.id,
          },
        ],
        ...state,
      };

    default:
      return state;
  }
}
