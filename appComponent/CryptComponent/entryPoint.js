const jaspe = require('jaspe')
const EntryPoint = jaspe.EntryPoint
const cryptService = require('./src/CryptService')

let cryptEntryPoint = new EntryPoint()

cryptEntryPoint.on('sha256', cryptService.sha256)
cryptEntryPoint.on('genRandomString', cryptService.genRandomString)

module.exports = cryptEntryPoint
