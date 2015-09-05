import { combineReducers } from 'redux';
import nodes from './nodesReducer';
import nodesById from './nodesByIdReducer';
import bookmarked from './bookmarkedReducer';

const rootReducer = combineReducers({
  nodes,
  bookmarked,
  nodesById,
});

export default rootReducer;
