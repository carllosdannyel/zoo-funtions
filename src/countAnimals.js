const data = require('../data/zoo_data');

const { species } = data;

function countAnimals(animal) {
  const animalCharacteristics = { ...animal };
  if (!animal) {
    return species.reduce((acc, { name, residents }) => {
      acc[name] = residents.length;
      return acc;
    }, {});
  }
  const animalsForSpecie = species.find(({ name }) =>
    animalCharacteristics.specie.includes(name));
  const animalsForSex = animalsForSpecie.residents.reduce((acc, { sex }) => {
    if (animalCharacteristics.sex === sex) {
      return acc + 1;
    }
    return acc;
  }, 0);
  return animalCharacteristics.specie && animalCharacteristics.sex
    ? animalsForSex : animalsForSpecie.residents.length;
}

module.exports = countAnimals;
