const validateUsername = (username) => {
  let re = new RegExp("^[A-Za-z][A-Za-z0-9_]{3,16}$");
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
//validate any integer number between 0 & 120.
const validateNumber = (num) => {
  let re = new RegExp("^(?:[1-9]?[0-9]|1[01][0-9]|120)$");
  return re.test(num);
};
//validate country & city
const validateCountry = (country) => {
  let re = new RegExp("^[A-Za-z]+([ -][A-Za-z]+)*{1,16}$");
  return re.test(country);
};
const validateProvinceCode = (provinceCode) => {
  let re = new RegExp("^[A-Za-z]{0,2}$");
  return re.test(provinceCode);
};
const validateLink = (link) => {
  let re = new RegExp(
    "^(https?://)?(www.)?(linkedin.com|indeed.com|glassdoor.com)/.+$"
  );
  return re.test(link);
};
const validateDate = (date) => {
  let re = new RegExp("^(0[1-9]|1[0-2])/([0-2][1-9]|3[01])/d{4}$");
  return re.test(date);
};
const validateTitle = (title) => {
  let re = new RegExp("^[A-Za-z]+([ -][A-Za-z]+)*{3,32}$");
  return re.test(title);
};
const validateCompany = (company) => {
  let re = new RegExp("^[A-Za-z0-9]+([ -][A-Za-z0-9]+)*{2,32}$");
  return re.test(company);
};
const validateAddress = (addr) => {
  let re = new RegExp(
    "^d+s[A-Za-z0-9s.,'-]+(?:s(?:Apt|Suite|Unit|#)?s?[A-Za-z0-9]*)?{1,255$"
  );
  return re.test(addr);
};
const validateCity = (city) => {
  let re = new RegExp("^[A-Za-z]+([ -][A-Za-z]+)*{1,16}$");
  return re.test(city);
};

module.exports = {
  validateUsername,
  validateEmail,
  validatePassword,
  validateId,
  validateSalary,
  validateNumber,
  validateCountry,
  validateTitle,
  validateCompany,
  validateAddress,
  validateCity,
  validateProvinceCode,
  validateLink,
  validateDate,
};
