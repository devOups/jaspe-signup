const jaspe = require('jaspe')
const EntryPoint = jaspe.EntryPoint
const accountService = require('./src/AccountService')

let accountEntryPoint = new EntryPoint()

accountEntryPoint.on('create', accountService.create)

module.exports = accountEntryPoint
