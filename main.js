const jaspe = require('jaspe')
const register = require('./appComponent/register')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.set('view engine', 'pug') // Jade has been renamed to Pug
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// jaspe init
try {
  jaspe.init(register)
} catch (err) {
  console.error(err)
  process.exit(1)
}


app.get('/', function (req, res) {
  res.render('index', {})
})


app.post('/signup', function(req, res) {
  let {username, email, password, age} = req.body // es6 syntaxe
  jaspe.invoke('SignUpService', 'signUp', {username, email, password, age: parseInt(age)})
  .then((account) => {
    res.json({account: account})
  })
  .catch((err) => {
    res.json({err: err.map((error) => {
      return error.message
    })})
  })
})

app.listen(3000)
