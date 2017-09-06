const jaspe = require('jaspe')
const register = require('./appComponent/register')

try {
  jaspe.init(register)
} catch (err) {
  console.error(err)
  process.exit(1)
}

var params = {
  username: 'jaspe',
  email: 'jaspe@jaspe.com',
  password: 'Jaspepassword24',
  age: 24
}

jaspe.invoke('SignUpService', 'signUp', params)
.then((account) => {
  console.log(account)
})
.catch((err) => {
  console.error(err)
})
