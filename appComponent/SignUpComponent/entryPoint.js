const jaspe = require('jaspe')
const EntryPoint = jaspe.EntryPoint
const signUpService = require('./src/SignUpService')

let signUpEntryPoint = new EntryPoint()

signUpEntryPoint.on('signUp', signUpService.signUp)

module.exports = signUpEntryPoint
