const data = require('../data/zoo_data');

const { species } = data;

const { employees } = data;

function getOldestFromFirstSpecies(idEmployees) {
  const responsibleForAnimal = employees.find(({ id }) => idEmployees === id).responsibleFor;

  const findAnimals = species.filter(({ id }) => responsibleForAnimal.includes(id))
    .find(({ residents }) => residents).residents;

  const filtrarAge = findAnimals.reduce((acc, curr) => (acc.age > curr.age ? acc : curr));

  return Object.values(filtrarAge);
}

module.exports = getOldestFromFirstSpecies;
