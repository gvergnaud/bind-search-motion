import random from './random.js';

export default function getFakeApiResponse(node) {

  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve({
        requestedNode: node,
        propositions: getRandomPropositions().filter(proposition => proposition.node.id !== node.id),
      });
    }, random(20, 200));
  });
}

function getRandomNode() {
  const type = getRandomType();

  return {
    id: getRandomId(),
    type: type,
    data: getRandomData(type),
  }
}

function getRandomPropositions() {
  var propositions = [];
  for (var i = 0 ; i < random(5, 7) ; i ++) {
    propositions.push({
      pertinence: Math.random(),
      node: getRandomNode()
    });
  }
  return propositions;
}

function getRandomId() {
  return random(25);
}

function getRandomType() {
  return ['image', 'link', 'word'][random(3)];
}

function getRandomData(type) {
  switch (type) {
    case 'image':
      return {
        picture: getRandomImage(),
      };

    case 'link':
      return {
        name: getRandomName(),
        picture: getRandomImage(),
      };

    case 'word':
      return {
        name: getRandomName(),
      };
  }
}

function getRandomName() {
  var
    name = '',
    letters = ['a', 'b', 'c', 'i', 'o', 'e', 'u', 'p', 'g', 'j', 'n', 'w', 'x'];

  for (var i = 0 ; i < random(3, 8) ; i ++) {
    name += letters[random(13)];
  }
  return name;
}

function getRandomImage() {
  return `http://lorempixel.com/${random(200, 500)}/${random(200, 500)}`
}
