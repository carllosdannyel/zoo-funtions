const data = require('../data/zoo_data');

const { child, adult, senior } = data.prices;

function countEntrants(entrants) {
  const related = { adult: 0, child: 0, senior: 0 };

  entrants.forEach(({ age }) => {
    if (age < 18) related.child += 1;
    if (age >= 18 && age < 50) related.adult += 1;
    if (age >= 50) related.senior += 1;
  });

  return related;
}

function calculateEntry(entrants) {
  if (!entrants || !Object.keys(entrants).length) return 0;
  const { adult: x, child: y, senior: z } = countEntrants(entrants);
  return adult * x + child * y + senior * z;
}

module.exports = { calculateEntry, countEntrants };
