const data = require('../data/zoo_data');

const { species } = data;

function getAnimalsOlderThan(animal, age) {
  const animais = species.filter(({ name }) => name === animal);
  const arrayOlders = animais[0].residents.map((element) => element.age);
  return arrayOlders.every((elements) => elements > age);
}

module.exports = getAnimalsOlderThan;
