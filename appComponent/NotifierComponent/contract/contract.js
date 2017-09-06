const jaspe = require('jaspe')
const v = jaspe.validator
const Contract = jaspe.Contract

let services = new Map()

/**
 * log service
 */
let log_requirements = new Map()
log_requirements.set('message', [
  {
    name: 'typeOf string',
    validator: v.typeOf,
    params: {typeOf: 'string'}
  },
  {
    name: 'notNull',
    validator: v.notNull
  },
  {
    name: 'notEmpty',
    validator: v.notEmpty
  }
])
services.set('log', log_requirements)

/**
 * email service
 */



module.exports = new Contract('NotifierContract', services)
