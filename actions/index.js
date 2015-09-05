import fetch from 'isomorphic-fetch';
import getFakeApiResponse from '../utils/getFakeApiResponse';

export const REQUEST_NODES = 'REQUEST_NODES';
export const RECEIVE_NODES = 'RECEIVE_NODES';
export const SELECT_NODE = 'SELECT_NODE';

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
    return getFakeApiResponse(node)
      .then(res => dispatch(receiveNodes(node, res)));
  };
}
