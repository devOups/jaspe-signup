const crypto = require('crypto')

class CryptService {
  constructor () {}

  sha256 (str, salt, callback) {
    let hash = crypto.createHmac('sha256', salt)
                     .update(str)
                     .digest('hex')
    
    callback(null, {salt: salt, hashedStr: hash})
  }

  genRandomString (length, callback) {
    callback(
      null, 
      crypto.randomBytes(Math.ceil(length / 2))
            .toString('hex')
            .slice(0, length)
    )
  }
}

module.exports = new CryptService()