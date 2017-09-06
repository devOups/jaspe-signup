const jaspe = require('jaspe')


module.exports.require = (serviceName, service, params) => {
  return jaspe.invoke(serviceName, service, params)
}