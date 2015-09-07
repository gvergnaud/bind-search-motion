import fetch from 'isomorphic-fetch';
import getFakeApiResponse from '../utils/getFakeApiResponse';
import getEclosionApiResponse from '../utils/getEclosionApiResponse';

export const REQUEST_NODES = 'REQUEST_NODES';
export const RECEIVE_NODES = 'RECEIVE_NODES';
export const SELECT_NODE = 'SELECT_NODE';
export const REVERT_HISTORY = 'REVERT_HISTORY';

export function revertHistory(state) {
  return {
    type: REVERT_HISTORY,
    state,
  };
}

function selectNode(node) {
  return {
    type: SELECT_NODE,
    node
  };
}

function requestNodes(node) {
  return {
    type: REQUEST_NODES,
    node
  };
}

function receiveNodes(node, res) {
  return {
    type: RECEIVE_NODES,
    node: node,
    propositions: res.propositions,
    receivedAt: Date.now()
  };
}

export function search(node) {
  return dispatch => {
    dispatch( requestNodes(node) );
    return getEclosionApiResponse(node)
      .then(res => dispatch(receiveNodes(node, res)));
  };
}
