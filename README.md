# jaspe-signup
Jaspe App : How to use Jaspe to create application with software component and contract


This tutoriel shows how to use Jaspe to create NodeJs application.
1. Present software component paradigm in Jaspe
2. Present contract paradigm in Jaspe
3. Example with SignUp Component
4. Use SignUp Component with an Express app


# Present software component paradigm 

The software component paradigm is a reuse-based approach to defining, implementing and composing slightly coupled independent components into systems. Thank to this paradigm no needs to use concept as class and methods but provide services and require services are the new concept to adapot. Indeed, a sofware component provides services or requires others in order to accomplish these services. To connect two components, a require service has to be connected to the provide service. This way first component uses the second component. 

It's the same approach with the class model although the first Jaspe component doesn't need a reference to the second component there is no depandance between each other !! So, it is very interesting to reuse this component independently to another one.
In software component paradigm, the resusable notion is really important. 

> In Jaspe Framework, the provide interface of the component is modeled by the unique entryPoint file and the require interface is modeled
> by the unique outPoint file. 

**_Example: I want to develop a service which proposes to create an account. When the account is created I want to notify
user by email._**

## Component approach 

* First step : define provide services and require services
* Second step: think about reusing the component according to the question:  Do I want to always reuse component together or separatly ?

### First step
Provide services : 
* Create account
* Notify user

Who to need whom ? 

If I want to create an account and next to notify user, account needs to use "notifier" service !

**So account service _requires_ notifier service**

### Second step

After the first step, this model is obtained:

![alt text](https://raw.githubusercontent.com/devOups/jaspe-signup/master/img/jaspe-Account-Notifier-Component.png)

Now think about reusing, the question which has to be asked is : 

If I want to reuse Account in other project, do I really need Notifier service ?
Not necessary ! But according to this model **AccountComponent cannot be reused without NotifierComponent**.


The more judicious solution is to use a third component like this : 

![alt text](https://raw.githubusercontent.com/devOups/jaspe-signup/master/img/jaspe-AccountNotifierComponent.png)


AccountNotifierComponent provides a service named _create_. This service enables to create new account by using AccountComponent and notify user by using NotifierComponent.
In this way, you could reuse component seperatly or together through this aggregation component. 

So Jaspe helps you to create this model with NodeJs ! :) 

_Jaspe also provides features as contract paradigm, go to the next part !_

# Present contract paradigm

Contract paradigm proposes to define contract on methods or models to garanty any properties and assertions.
The [Eiffel language](https://en.wikipedia.org/wiki/Eiffel_(programming_language)) offers complete approach and tools to program with contract paradigm. 
There are three important notions
with contract paradigm. : 
1. pre-conditions
2. post-conditions
3. Invariant

More informations here : https://en.wikipedia.org/wiki/Design_by_contract

> Currently, Jaspe proposes only pre-conditions features

## Pre-conditions

In Jaspe, uses pre-conditions to garanty value of parameter when services are calling. To take up the previous example with AccountComponent,
you have to define contract by describing constraints for each parameter used by the service.



# Example with SignUp Component

![alt text](https://raw.githubusercontent.com/devOups/jaspe-signup/master/img/jaspe-signup.png)

# Use SignUp Component with Express
