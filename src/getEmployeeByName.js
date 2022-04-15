const data = require('../data/zoo_data');

const { employees } = data;

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  const firstNames = employees.filter(({ firstName, lastName }) =>
    (employeeName === firstName) || (employeeName === lastName));
  return firstNames[0];
}

module.exports = getEmployeeByName;
