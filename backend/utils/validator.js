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
    let re = new RegExp("");
    return re.test(id);
  },
};

module.exports = validator;
