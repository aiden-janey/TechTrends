class Validation {
  constructor() {}

  validUsername(username) {
    let re = new RegExp("^[A-Za-z][A-Za-z0-9_]{7,19}$");
    return re.test(username);
  }

  validPassword(password) {
    let re = new RegExp("^(?=.*d)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%&*]{6,20}$");
    return re.test(password);
  }
}

module.exports = Validation;
