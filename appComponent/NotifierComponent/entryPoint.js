const jaspe = require('jaspe')
const EntryPoint = jaspe.EntryPoint
const notifierService = require('./src/NotifierService')

let notifierEntryPoint = new EntryPoint()

notifierEntryPoint.on('log', notifierService.log)

module.exports = notifierEntryPoint
