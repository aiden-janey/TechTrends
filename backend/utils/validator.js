const validator = {
  validateUsername: (username) => {
    let re = new RegExp("^[A-Za-z][A-Za-z0-9_]{7,19}$");
    return re.test(username);
  },
  validateEmail: (email) => {
    let re = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$");
    return re.test(email);
  },
  validatePassword: (password) => {
    let re = new RegExp("^(?=.*d)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%&*]{8,32}$");
    return re.test(password);
  },
  validateId: (id) => {
    let re = new RegExp("[a-zA-z0-9]{16}$");
    return re.test(id);
  },
  validateSalary: (salary) => {
    let re = new RegExp("^[0-9]{1,8}(.[0-9]{1,2})?$");
    return re.test(salary);
  },
  validateAge: (age) => {
    let re = new RegExp("^(?:[1-9]?[0-9]|1[01][0-9]|120)$");
    return re.test(age);
  },
  validateCountry: (country) => {
    let re = new RegExp("^[A-Za-z]+(?:[ -][A-Za-z]+)*$");
    return re.test(country);
  },
  validatePosition: (position) => {
    let re = new RegExp("^[A-Za-z]+(?:[ -][A-Za-z]+)*$");
    return re.test(position);
  },
  validateLevel: (level) => {
    let re = new RegExp("^[A-Za-z]+(?:[ -][A-Za-z]+)*$");
    return re.test(level);
  },
};

module.exports = validator;
