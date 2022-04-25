const data = require('../data/zoo_data');

const { species, employees } = data;

const idEmployees = employees.map(({ id }) => id);
const lastNameEmployees = employees.map(({ firstName }) => firstName);
const firstNameEmployees = employees.map(({ lastName }) => lastName);

const allInformation = [...idEmployees, ...lastNameEmployees, ...firstNameEmployees];

// console.log(allInformation);
const employeeInformation = (operatingInformation) => employees.find((information) =>
  information.id === operatingInformation.id
  || information.firstName === operatingInformation.name
  || information.lastName === operatingInformation.name);

// console.log(employeeInformation('Burl'));

const animalsData = (animalInformation) => species.filter(({ id }) =>
  employeeInformation(animalInformation).responsibleFor.includes(id));

// console.log(animalsData('0e7b460e-acf4-4e17-bcb3-ee472265db83'));

const allEmployeeInformation = (completeInformation) => species.reduce((acc) => {
  const obj = acc;
  const firstNameEmployee = employeeInformation(completeInformation).firstName;
  const lastNameEmployee = employeeInformation(completeInformation).lastName;
  obj.id = employeeInformation(completeInformation).id;
  obj.fullName = `${firstNameEmployee} ${lastNameEmployee}`;
  obj.species = animalsData(completeInformation).map(({ name }) => name);
  obj.locations = animalsData(completeInformation).map(({ location }) => location);
  return obj;
}, {});

const withoutParameter = () => employees.reduce((acc, curr) => {
  const obj = {
    id: curr.id,
    fullName: `${curr.firstName} ${curr.lastName}`,
    species: species.filter(({ id }) => curr.responsibleFor.includes(id)).map(({ name }) => name),
    locations: species.filter(({ id }) => curr.responsibleFor.includes(id))
      .map(({ location }) => location),
  };
  acc.push(obj);
  return acc;
}, []);

// console.log(withoutParameter());

// console.log(allEmployeeInformation('Spry'));

function getEmployeesCoverage(employeeData) {
  if (!employeeData) return withoutParameter();
  // if (employeeData.name || employeeData.id) return allEmployeeInformation(employeeData);
  if (allInformation.includes(employeeData.id || employeeData.name) === false) {
    throw new Error('Informações inválidas');
  }
  try {
    return allEmployeeInformation(employeeData);
  } catch (error) {
    return error.message;
  }
}

// console.log(getEmployeesCoverage({ name: 'aslkcnas' }));

module.exports = getEmployeesCoverage;
