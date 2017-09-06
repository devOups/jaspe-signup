let register = [
  {
    serviceName: 'AccountService', 
    contract: require('./AccountComponent/contract/contract'), 
    entryPoint: require('./AccountComponent/entryPoint')
  },
  {
    serviceName: 'NotifierService',
    contract: require('./NotifierComponent/contract/contract'),
    entryPoint: require('./NotifierComponent/entryPoint')
  },
  {
    serviceName: 'CryptService',
    contract: require('./CryptComponent/contract/contract'),
    entryPoint: require('./CryptComponent/entryPoint')
  },
  {
    serviceName: 'SignUpService',
    contract: require('./SignUpComponent/contract/contract'),
    entryPoint: require('./SignUpComponent/entryPoint')
  }
]

module.exports = register