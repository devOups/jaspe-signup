const jaspe = require('jaspe')
const v = jaspe.validator
const Contract = jaspe.Contract

let services = new Map()

/**
 * SignUp service
 */
let signup_requirements = new Map()
signup_requirements.set('username', [
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

signup_requirements.set('email', [
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
  },
  {
    name: 'email',
    validator: v.email
  }
])

signup_requirements.set('password', [
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
  },
  {
    name: 'pattern',
    validator: v.pattern,
    params: {regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/} // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
  }
])

signup_requirements.set('age', [
  {
    name: 'typeof integer',
    validator: v.isInteger
  },
  {
    name: 'notNull',
    validator: v.notNull
  },
  {
    name: 'range(0, 110)',
    validator: v.range,
    params: {min: 0, max: 110}
  }

])
services.set('signUp', signup_requirements)


module.exports = new Contract('SignUp', services)
