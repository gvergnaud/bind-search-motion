import fetch from 'isomorphic-fetch';


let data = false;

export default function getEclosionApiResponse(node) {
  return getData().then(data => data.nodes
    .filter(eclosionNode => eclosionNode.name === node.data.name)
    .reduce((acc, eclosionNode) => {
      return {
        node: wrapInNode(eclosionNode),
        propositions: getLinkedNodes(eclosionNode).map(wrapInNode).map(wrapInProposition),
      }
    }, {}));
}

function getData() {
  return new Promise(function(resolve, reject) {
    if (!data) {
      fetch('../static/eclosion.json')
        .then(res => res.json())
        .then(json => {
          data = json;
          resolve(data);
        });
    } else {
      setTimeout(() => resolve(data), 50);
      ;
    }
  });
}

function wrapInNode(eclosionNode) {
  return {
    id: eclosionNode.index,
    type: 'word',
    data: {
      nbLinks: eclosionNode.value,
      name: eclosionNode.name,
    },
  };
}

function wrapInProposition(node, index, nodes) {
  return {
    pertinence: getPertinence(node, nodes),
    node,
  };
}

function getPertinence(node, nodes) {
  let maxNbLinks = nodes.reduce((acc, node) => {
    return node.data.nbLinks > acc ? node.data.nbLinks : acc;
  }, 0);
  return maxNbLinks ? (node.data.nbLinks / maxNbLinks) : 0;
}

function getLinkedNodes(eclosionNode) {
  return data.links
    .filter(link => (link.target === eclosionNode.index || link.source === eclosionNode.index))
    .map(link => {
      let linkedNodeIndex = (link.source === eclosionNode.index) ? link.target : link.source;
      return {
        value: link.value,
        ...data.nodes.find(eclosionNode => eclosionNode.index === linkedNodeIndex),
      }
    });
}
