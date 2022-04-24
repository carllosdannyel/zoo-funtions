const data = require('../data/zoo_data');

const { hours, species } = data;

const animalNames = species.map(({ name }) => name);
const daysOfTheWeek = Object.keys(hours);

function semParametro() {
  const hourS = Object.keys(hours).reduce((acc, curr) => {
    acc[curr] = species.reduce((acc1) => {
      const obj = acc1;
      if (curr === 'Monday') obj.officeHour = 'CLOSED';
      else obj.officeHour = `Open from ${hours[curr].open}am until ${hours[curr].close}pm`;
      obj.exhibition = species.filter(({ availability }) =>
        availability.includes(curr)).flatMap(({ name }) => name);
      if (curr === 'Monday') obj.exhibition = 'The zoo will be closed!';
      return obj;
    }, {});
    return acc;
  }, {});
  return hourS;
}

const animalsParam = (animal) => species.filter(({ name }) => name
  .includes(animal)).flatMap(({ availability }) => availability);

function getSchedule(scheduleTarget) {
  if (daysOfTheWeek.includes(scheduleTarget)) {
    return { [scheduleTarget]: semParametro()[scheduleTarget] };
  }
  if (animalNames.includes(scheduleTarget)) {
    return animalsParam(scheduleTarget);
  }
  return semParametro();
}

module.exports = getSchedule;
