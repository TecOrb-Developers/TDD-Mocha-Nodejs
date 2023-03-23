## Write test cases using Mocha in Nodejs (src/test)
## Introduction
`Write test cases using mocha in typescript.For testing purposes we are using mocha & chai.`


`Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases`

`Chai:Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.`
`What we have implemented in this project?`

`Admin Signup`
`Admin Login via password`

## Server
`PORT=3000`
`HOST=localhost`

## Api code
`Api path - src/controllers/admin/`

## Test cases
`path - src/test`

## Installing Dependencies
`Express`

`Mongoose`

`Dotenv`

`Bcryptjs`

`Mocha: npm install --save-dev @types/mocha`

`Chai: npm install --save-dev @types/chai`

`Chai-http: npm install --save-dev @types/chai-http`

`Request: npm install --save-dev @types/request`
## Setup Steps:
`npm install`
### local server
`npm run start:dev`
### install mocha
`npm i @types/mocha`
### install chai
`npm i @types/chai`
### install request
`npm i @types/request`
### use this script in package.json
`"test": "mocha -r ts-node/register src/test/**/*_spec.ts"`
### testing command
`npm test` // Run command in Terminal
## postman api url
`type post "{host-url}/api/v1/admin/auth/signUp" in body pass {  email, password ,phoneNumber,countryCode}`

`type post "{host-url}/api/v1/admin/auth/login" in body pass { email, password }`
