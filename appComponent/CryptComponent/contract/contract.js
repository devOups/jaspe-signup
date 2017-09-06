const jaspe = require('jaspe')
const v = jaspe.validator
const Contract = jaspe.Contract

let services = new Map()

/**
 * sha256 service
 */
let sha256_requirements = new Map()
sha256_requirements.set('str', [
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

sha256_requirements.set('salt', [
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
services.set('sha256', sha256_requirements)

/**
 * genRandomString service
 */
let genRandomString_requirements = new Map()
genRandomString_requirements.set('length', [
  {
    name: 'typeOf Integer',
    validator: v.isInteger
  },
  {
    name: 'notNull',
    validator: v.notNull
  }
])
services.set('genRandomString', genRandomString_requirements)

module.exports = new Contract('CryptContract', services)
