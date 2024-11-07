const validateUsername = (username) => {
  let re = new RegExp("^[A-Za-z][A-Za-z0-9_]{7,19}$");
  return re.test(username);
};
const validateEmail = (email) => {
  let re = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$");
  return re.test(email);
};
const validatePassword = (password) => {
  let re = new RegExp("^(?=.*d)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%&*]{8,32}$");
  return re.test(password);
};
const validateId = (id) => {
  let re = new RegExp("^[A-Za-z0-9+/]{12,16}={0,2}$");
  return re.test(id);
};
const validateSalary = (salary) => {
  let re = new RegExp("^[0-9]{0,18}(.[0-9]{1,2})?$");
  return re.test(salary);
};
const validateInteger = (age) => {
  let re = new RegExp("^(?:[1-9]?[0-9]|1[01][0-9]|120)$");
  return re.test(age);
};
const validateCountry = (country) => {
  let re = new RegExp("^[A-Za-z]+([ -][A-Za-z]+)*$");
  return re.test(country);
};

module.exports = {
  validateUsername,
  validateEmail,
  validatePassword,
  validateId,
  validateSalary,
  validateInteger,
  validateCountry,
};
