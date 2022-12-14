const data = require('../data/zoo_data');

const { species } = data;

const withoutParameter = (acc, { location }) => {
  acc[location] = species.filter((a) => a.location.includes(location)).map(({ name }) => name);
  return acc;
};

function sortedAllAnimals(options) {
  return species.reduce((acc, { location }) => {
    acc[location] = species.filter((locations) => locations.location
      .includes(location)).reduce((acc1, { name }) => {
      // const chave = name;
      const object = {};
      if (!options.sorted) {
        object[name] = species.filter((names) => names.name.includes(name))
          .flatMap((resident) => resident.residents).flatMap((names) => names.name);
        acc1.push(object);
        return acc1;
      }
      object[name] = species.filter((names) => names.name.includes(name))
        .flatMap((resident) => resident.residents).flatMap((names) => names.name).sort();
      acc1.push(object);
      return acc1;
    }, []);
    return acc;
  }, {});
}

const sortedMaleOrFemale = (options) => species.reduce((acc, { location }) => {
  acc[location] = species.filter((locations) => locations.location.includes(location))
    .reduce((acc1, { name }) => {
      const object = {};
      if (!options.sorted) {
        object[name] = species.filter((names) => names.name.includes(name))
          .flatMap((resident) => resident.residents)
          .filter((sex) => sex.sex.includes(options.sex)).flatMap((names) => names.name);
        acc1.push(object);
        return acc1;
      }
      object[name] = species.filter((names) => names.name.includes(name))
        .flatMap((resident) => resident.residents)
        .filter((sex) => sex.sex.includes(options.sex)).flatMap((names) => names.name)
        .sort();
      acc1.push(object);
      return acc1;
    }, []);
  return acc;
}, {});

// const speciesNames = (acc1, { name }) => {
//   // const chave = name;
//   const object = {};
//   object[name] = species.filter((names) => names.name.includes(name))
//     .flatMap((resident) => resident.residents).flatMap((names) => names.name);
//   acc1.push(object);
//   return acc1;
// };

// const speciesNames = (acc, { name }) => {
//   acc[name] = species.filter((names) => names.name.includes(name))
//     .flatMap((resident) => resident.residents).map((names) => names.name);
//   return acc;
// };

function getAnimalMap(options = {}) {
  if (options.includeNames && options.sex) {
    return sortedMaleOrFemale(options);
  }
  if (options.includeNames) {
    return sortedAllAnimals(options);
  }
  return species.reduce(withoutParameter, {});
  // if (options.includeNames options.sex) {
  //   ascascasc
  // }
}

console.log(getAnimalMap({ includeNames: true, sex: 'female', sorted: true }).NW);

module.exports = getAnimalMap;
