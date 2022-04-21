const data = require('../data/zoo_data');

const { employees } = data;

// const stephanieId = '9e7d4524-363c-416a-8759-8aa7e50c0992';
// const olaId = 'fdb2543b-5662-46a7-badc-93d960fdc0a8';
// const burlId = '0e7b460e-acf4-4e17-bcb3-ee472265db83';

function isManager(ids) {
  return employees.flatMap(({ managers }) => managers).includes(ids);
}

function getRelatedEmployees(managerId) {
  const employeesOfManager = employees.filter(({ managers }) => [...managers].includes(managerId));

  if (isManager(managerId) === false) {
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  }

  try {
    isManager(managerId);
    return employeesOfManager.map(({ firstName, lastName }) => `${firstName} ${lastName}`);
  } catch (error) {
    throw error.message;
  }
}

module.exports = { isManager, getRelatedEmployees };
