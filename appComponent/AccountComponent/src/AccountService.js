const Account = require('./Account')

class AccountService {
  constructor() {}

  create (username, email, password, age, callback) {
    callback(null, new Account(username, email, password, age))
  }
}

module.exports = new AccountService()