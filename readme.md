## Write test cases using Mocha in Nodejs
## Introduction
`Write test cases using mocha in typescript.Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases`
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
