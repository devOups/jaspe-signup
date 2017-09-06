const outpoint = require('../requires/outPoint')

class SignUpService {
  constructor () { }

  signUp (username, email, password, age, callback) {
    outpoint.require('CryptService', 'genRandomString', {length: 16})
    .then((salt) => {
      outpoint.require('CryptService', 'sha256', {str: password, salt})
      .then((hash) => {
        outpoint.require('AccountService', 'create', {username, email, password: hash.hashedStr, age})
        .then((account) => {
          let message =  'Bonjour ' + account.username + ', \n' +
          'Welcome on Jaspe Framework \n' +
          'your email is: ' + account.email + '\n' +
          'your age is: ' + account.age + '\n' +
          'no problem your password is encrypted : ' + account.password
          'Jaspe team !'
          
          outpoint.require('NotifierService', 'log', {message})
          .catch((err) => {
            callback(err)
          })

          return callback(null, account)
        })
        .catch((err) => {
          callback(err)
        })
      })
      .catch((err) => {
        callback(err)
      })    
    })
    .catch((err) => {
      callback(err)
    })
  }
}

module.exports = new SignUpService()