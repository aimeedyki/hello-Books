[![Coverage Status](https://coveralls.io/repos/github/aimeedyki/hello-Books/badge.svg)](https://coveralls.io/github/aimeedyki/hello-Books)
[![Maintainability](https://api.codeclimate.com/v1/badges/11b962b098e7cc3914cf/maintainability)](https://codeclimate.com/github/aimeedyki/hello-Books/maintainability)
[![Build Status](https://travis-ci.org/aimeedyki/hello-Books.svg?branch=develop)](https://travis-ci.org/aimeedyki/hello-Books)

# Hello Books [https://hello-books-amarachi.herokuapp.com](https://hello-books-amarachi.herokuapp.com)

This is a simple application that helps manage a library and its processes. The application has two user roles: admin and regular user. Users can use this application to borrow books, return books, and check their history, etc. Users also have levels which define their rent privileges. The Admin takes care of inventory management; add books, modify books assign categories, etc.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

#### Dependencies

>- Node
>- Postgres
>- Sequelize

#### Installation

You can get the app running locally in the following way:
>- Install NodeJs and Postgres on your machine
>- Clone the repository $ git clone [https://github.com/aimeedyki/hello-Books.git]( https://github.com/aimeedyki/hello-Books.git)
>- Change into the directory $ cd /helloBooks
>- Use $ npm install to install all required dependencies.
>- Create a .env file in your root directory and set the 'SECRET' environment variable.
>- Run migrations with $ sequelize db:migrate.
>- Start app with $ npm run start:dev

The app will be running at http://localhost:5000

#### Running the tests

Perform test migrations to a test database before test with $ NODE_ENV=test sequelize db:migrate --env test
Use  $npm test to run test.

#### Technologies and Services

Written in Javascript es6 syntax and nodejs, with the following:
>- Mocha
>- Travic CI
>- Coveralls
>- Hound CI
>- SCSS
>- React
>- Sequelize
>- Express
>- Postgresql

## Contributing

To contribute:
>- Clone the repository.
>- Install dependencies
>- Create a new branch for included feature(s)
>- Raise a pull request.

While raising a pull request be descriptive enough about your contributions so that I and other contributors will understand what you've done.

## Author

* **Amarachi Akuwudike** 


