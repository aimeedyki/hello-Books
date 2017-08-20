[![Coverage Status](https://coveralls.io/repos/github/aimeedyki/hello-Books/badge.svg?branch=develop)](https://coveralls.io/github/aimeedyki/hello-Books?branch=develop)
[![Issue Count](https://codeclimate.com/github/aimeedyki/hello-Books/badges/issue_count.svg)](https://codeclimate.com/github/codeclimate/codeclimate)
[![Test Coverage](https://codeclimate.com/github/aimeedyki/hello-Books/badges/coverage.svg)](https://codeclimate.com/github/codeclimate/codeclimate/coverage)
[![Code Climate](https://codeclimate.com/github/aimeedyki/hello-Books/badges/gpa.svg)](https://codeclimate.com/github/codeclimate/codeclimate)
[![Build Status](https://travis-ci.org/aimeedyki/hello-Books.svg?branch=master)](https://travis-ci.org/aimeedyki/hello-Books)

# Hello Books

This is a simple application that helps manage a library and its processes. The application has two user login roles: admin and regular user. Users can use this application to borrow books, return books, and check their history, etc. Users also have levels which define their rent privileges. The Admin takes care of inventory management; add books, modify books assign categories, etc.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system. [https://hello-books-api-amarachi.herokuapp.com/]( https://hello-books-api-amarachi.herokuapp.com/)

### Installing

Install NodeJs and Postgres on your machine
Clone the repository $ git clone [https://github.com/aimeedyki/hello-Books.git]( https://github.com/aimeedyki/hello-Books.git)
Change into the directory $ cd /helloBooks
Use $ npm install to install all required dependencies.
Create a .env file in your root directory
Set environment variables.
Run migrations with $ sequelize db:migrate.

## Running the tests

Perform test migrations to a test database before test with $ NODE_ENV=test sequelize db:migrate --env test
Use  $npm test to run test.

### Technologies and Services

Written in Javascript es6 syntax and nodejs on the backend, with the following:
>- Mocha
>- Travic CI
>- Coveralls
>- Hound CI
>- HTML/CSS
>- Sequelize
>- Express
>- Postgresql

### Dependencies

This api built with the following dependencies:
>- "babel-cli": "^6.24.1",
>- "babel-loader": "^7.1.1",
>- "babel-preset-es2015": "^6.24.1",
>- "babel-preset-stage-2": "^6.24.1",
>- "babel-register": "^6.24.1",
>- "bcrypt": "^1.0.2",
>- "body-parser": "^1.17.2",
>- "chai": "^4.1.1",
>- "cross-env": "^5.0.5",
>- "dotenv": "^4.0.0",
>- "eslint": "^4.3.0",
>- "eslint-config-airbnb": "^15.1.0",
>- "eslint-plugin-import": "^2.7.0",
>- "eslint-plugin-jsx-a11y": "^5.1.1",
>- "eslint-plugin-react": "^7.1.0",
>- "express": "^4.15.3",
>- "faker": "^4.1.0",
>- "jsonwebtoken": "^7.4.2",
>- "mocha": "^3.5.0",
>- "morgan": "^1.8.2",
>- "nodemon": "^1.11.0",
>- "pg": "^7.1.0",
>- "pg-hstore": "^2.3.2",
>- "sequelize": "^4.4.2",
>- "sequelize-cli": "^2.8.0",
>- "supertest": "^3.0.0"

## Contributing

>- Clone the repository.
>- Install dependencies
>- Create a new branch for included feature(s)
>- Raise a pull request.

## Author

* **Amarachi Akuwudike** 


