import { combineReducers } from 'redux';
import nodes from './nodesReducer';
import nodesById from './nodesByIdReducer';
import bookmarked from './bookmarkedReducer';
import stateHistory from './stateHistoryReducer';

const rootReducer = combineReducers({
  nodes,
  bookmarked,
  nodesById,
  stateHistory,
});

export default rootReducer;
