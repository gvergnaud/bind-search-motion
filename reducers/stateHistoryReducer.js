import {
  REVERT_HISTORY,
  RECEIVE_NODES,
} from '../actions';

const historyLimit = 10;

export default function stateHistoryReducer(history = {}, action) {
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
        ...getLimitedHistory(history, historyLimit),
      };

    default:
      return history;
  }
}

function getLimitedHistory(history, limit) {
  return Object.keys(history)
   .sort((a, b) => a < b)
   .filter((timestamp, index) => index < limit)
   .reduce((acc, timestamp) => {
     acc[timestamp] = history[timestamp];
     return acc;
   }, {});
}
