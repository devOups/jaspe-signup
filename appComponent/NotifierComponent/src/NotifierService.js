class NotifierService {
  constructor () {}

  log (message, callback) {
    console.log(message)
    callback(null)
  }

  email (email, message, callback) {
    // use email module to send notification
  }
}

module.exports = new NotifierService()