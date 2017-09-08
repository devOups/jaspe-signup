# jaspe-signup
Jaspe App : How to use Jaspe to create application with software component and contract


This tutoriel shows how to use Jaspe to create NodeJs application.
1. Example with SignUp Component
    1. Component model
    2. Define structure of the project
    3. Define Contract
    4. EntryPoint file
    5. OutPoint file
    6. Register file
    7. Main file
2. Use SignUp Component with an Express app

# Example with SignUp Component

**Subject** : Writing Jaspe application to sign-up user. Password must be encrypted with salt and match with the follow pattern:
minimum eight characters, at least one uppercase letter, one lowercase letter and one number.
Username, email, password and age are required information to sign-up user. Age must be between 0 & 110. Email must be match with
valid pattern email. Finally, after account is created notify user.

## First step : Define provider service

* Obvioulsy: a sign-up service
* A service to encrypt password
* A service to create an account with username, email password and age
* A service to notify user

Who needs whom ? Only SignUpComponent requires others services
So this model is obtained

![alt text](https://raw.githubusercontent.com/devOups/jaspe-signup/master/img/jaspe-signup.png)

Maybe somebody wants to AccountComponent requires CryptComponent. My model doesn't an unique solution. 
Personnaly, I don't want to create dependency between those components, because I prefer call _createAccount_ 
service provided by AccountComponent with the password already encrypted.

## Second step : Define structure of the project

Create appComponent directory and for each component from the model a sub-directory,
for example a sub-directory for SignUpComponent another for CryptComponent etc.
See source code of this project for more help.

## Third step : Define contract for each provider service

I don't present all contracts, for more information read source code into appComponent directory
and search any contract.js files in sub-components directories.

But I describing some major particularities.
Contract for a service is created by creating a _contract.js_ file.
>  In component directory create sub-contract directory and add contract.js file.

**What parameters should be passed to the service, and with what conditions, for the service to work successfully?**
It is the main question to find the way to write contract.

For example the crypt password service needs a password and a salt ([encrypt password with salt](https://en.wikipedia.org/wiki/Salt_(cryptography))).
To encrypt password, it must be not null value and not empty string. Likewise for the salt parameter.


Yes! all information are present to write contract file. To help you Jaspe already include validator and Contract Object.
_contract.js_ file from 'sha256' service provided by CryptComponent:

```js
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

[...]

module.exports = new Contract('CryptContract', services)
```
* First require Jaspe validator and Contract Object. 
* Next define for each service, name parameter and constraints.


For each service invocation the contract is checked by Jaspe engine. 
If the parameter doesn’t respect constraints then the invocation is stopped and an error is returned. 
In this way into the service you working with valid data! Thank you, Jaspe :)

**Into next Jaspe release you can describe contract in contract.json file and a script will build a contract.js file and more**
Preview of contract.json file
```json
	"services": [{
		"name": "CREATE",
		"requirements": [{
			"username": {
				"typeOf": "String",
				"constraints": ["@notNull", "@notEmpty"]
			},
			"email": {
				"typeOf": "String",
				"constraints": ["@notNull", "@notEmpty", "@email"]
			},
			"age": {
				"typeOf": "Number",
				"constraints": ["@notNull", "@range(0, 110)"]
			}
		}]
	}, [...]
```

### Another Example to make contract of the age parameter. 
Age must be between 0 & 110.

```js
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
```
Range validator needs parameters min and max value to make comparison.
_params_ property is an object value, it is injected when the validator are called.
See pipeline validator on the [Jaspe documentation](https://github.com/devOups/jaspe/blob/master/README.md) for more information. 

### The last example with the password pattern.
Minimum eight characters, at least one uppercase letter, one lowercase letter and one number.

```js
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
```
Like range validator for the age parameter, pattern validator take regex expression. 

Now you know how struct your project and how to write contract for component. 
In the next part we talk about structure of the component.

## EntryPoint file
In Jaspe, there are two very important files for a component : the _contract_ file and the _entryPoint_ file.
EntryPoint file is a unique entry point to echange with component. All services are provided by the component 
are in this file. When enty point receive 'serviceName' event a handle function fired.

> Jaspe provides EntryPoint class. All entries point for each component must be extends this class

Example with CryptComponent : 

```js
const jaspe = require('jaspe')
const EntryPoint = jaspe.EntryPoint
const cryptService = require('./src/CryptService')

let cryptEntryPoint = new EntryPoint()

cryptEntryPoint.on('sha256', cryptService.sha256)
cryptEntryPoint.on('genRandomString', (length) => {
  // pre-processing
  // ...

  // call getRandomString fucntion
  cryptService.genRandomString(length)
})

module.exports = cryptEntryPoint
```

## OutPoint file
The last important notion to use Jaspe component, is the outpoint file. Like the entryPoint file, 
this file is unique. Outpoint file is required when the component requires service. 
There is no constraint about structure of this file.

Just, when you need invoke a require service use Jaspe.invoke method. This methods needs 'NameOfProviderService', 'serviceName'
and object contains all parameters.


For this example I only export one method. It's just a wrapper of Jaspe invoke method.
But it's can be more complex function.

SignUp outpoint file :
```js
const jaspe = require('jaspe')

module.exports.require = (NameOfProviderService, serviceName, params) => {
  return jaspe.invoke(NameOfProviderService, serviceName, params)
}
```
How to use it : 
```js
 outpoint.require('CryptService', 'sha256', {str: password, salt})
  .then((hash) => {
    // your code after str is encrypted
  })
  .catch((err) => {
   // your code after a error is thrown
  })
```

## src directory
Into the component directory there is a src directory. 
There is no constraint about structure of this file.
It's here that we find code source of the component. 

## Register file

Finally, when your component and its contract and its entry point are developed, component must be registry in the _register.js_ file.
Jaspe engine use this file to find service and invoke him during the runtime. 

Create register.js on the top of appComponent directory
```js
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
  }, [...]

module.exports = register
```

## Main file
```bash
$ node main.js
```
It's time to use your first Jaspe application ! To use it, create main.js file
and add this code :
```js
const jaspe = require('jaspe')
const register = require('./appComponent/register')

try {
  jaspe.init(register)
} catch (err) {
  console.error(err)
  process.exit(1)
}

var params = {
  username: 'jaspe',
  email: 'jaspe@jaspe.com',
  password: 'Jaspepassword24',
  age: 24
}

jaspe.invoke('SignUpService', 'signUp', params)
.then((account) => {
  console.log(account)
})
.catch((err) => {
  console.error(err)
})
```
* First, import Jaspe and your file register.
* Next, initialize Jaspe with the register, this step could throw an exception if the register file contains errors.
* Finally, use Jaspe to invoke your SignUpService with parameters.

# Use SignUp Component with Express

Consult [jaspe/express-application](https://github.com/devOups/jaspe-signup/tree/jaspe/express-application) 
branch to watch complete Jaspe integration with Express.
Integration is very easy, in the main file of your Express app add this code.

```js
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
```

* First, import Jaspe and your file register. 
* Next, initialize Jaspe with the register, this step could throw an exception if the register file contains errors. 
* Finally, use Jaspe to invoke your SignUpService with parameters from form.


Thank to contracts, it's useless to check parameters before calling service, validators make it for you ! Thank you, Jaspe ! :) 

**/!\ In the catch method of invoke promise, err is an array. Because Jaspe validate parameters in parallel,
so it maybe contains an error for the username and another for email parameter.** 