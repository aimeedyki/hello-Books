[![Coverage Status](https://coveralls.io/repos/github/aimeedyki/hello-Books/badge.svg)](https://coveralls.io/github/aimeedyki/hello-Books)
[![Maintainability](https://api.codeclimate.com/v1/badges/11b962b098e7cc3914cf/maintainability)](https://codeclimate.com/github/aimeedyki/hello-Books/maintainability)
[![Build Status](https://travis-ci.org/aimeedyki/hello-Books.svg?branch=develop)](https://travis-ci.org/aimeedyki/hello-Books)

# Hello Books

This is a simple application that helps manage a library and its processes. The application has two user roles: admin and regular user. Users can use this application to borrow books, return books, and check their history, etc. Users also have levels which define their rent privileges. The Admin takes care of inventory management; add books, modify books assign categories, etc.

You can view the deployed application [here](https://hello-books-amarachi.herokuapp.com)

## Features

The application has the following features:
- Creating an account
- Signing in as an existing user
- Creating a category
- Adding a new category
- Editing and Deleting a category
- Adding a new book
- Editing and Deleting a book
- Viewing all the books in a library
- Viewing books according to their category
- Renting a book
- Returning a book
- Viewing a user borrow history
- Changing a user's password
- Changing a user's profile picture
- Upgrading a user's membership type

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

#### Dependencies

- [axios](https://www.npmjs.com/package/axios): A JavaScript library used to make http requests from nodejs or XMLHttpRequests from the browser
- [babel-cli](https://www.npmjs.com/package/babel-cli) : Used to transpile es6 code to es5 on the command line
- [babel-preset-es2015](https://www.npmjs.com/package/babel-preset-es2015): Plugin that adds support for es6
- [babel-preset-react](https://www.npmjs.com/package/babel-preset-react) : Plugin that adds support for jsx
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) : Used to hash passwords
- [dotenv](https://www.npmjs.com/package/dotenv) : Used to load environment variable from .env file
- [express](https://www.npmjs.com/package/express) : Web application framework. Used as application web server.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) : Used to create access tokens that asserts some number of claims.
- [react](https://www.npmjs.com/package/react) : A Javascript library for building user interfaces
- [sequelize](https://www.npmjs.com/package/sequelize) : Sequelize is a promise-based Node.js ORM for Postgres, MySQL, SQLite and Microsoft SQL Server. It features solid - transaction support, relations, read replication and more.

#### Installation

You can get the app running locally in the following way:
 - Install NodeJs and Postgres on your machine
 - Clone the repository $ git clone [https://github.com/aimeedyki/hello-Books.git]( https://github.com/aimeedyki/hello-Books.git)
- Change into the directory $ cd /helloBooks
- Use $ npm install to install all required dependencies.
- Create a .env file in your root directory and set the 'SECRET' environment variable.
- Run migrations with $ sequelize db:migrate.
- Start app with $ npm run start:dev

The app will be running at http://localhost:5000

#### Running the tests

- The tests were written using Mocha, Supertest and Chai.
- To run test, navigate to app directory
- run test
  $ npm run test

## Contributing

To contribute
- Fork this repo to your repository, clone the repo and configure
- Create a new branch ([see wiki for branch naming convention](https://github.com/aimeedyki/hello-Books/wiki/Branch-Naming-Convention))
- Make your contribution
- Commit your change ([see wiki for commit message convention](https://github.com/aimeedyki/hello-Books/wiki/Commit-Message-Convention))
- Make sure to test your work
- Raise a pull request against develop branch ([see wiki for pull request convention](https://github.com/aimeedyki/hello-Books/wiki/Pull-Request-Naming-and-Description-Convention))

While raising a pull request be descriptive enough about your contributions so that I and other contributors will understand what you've done.

## API Documentation

For detailed information on how to use api, view [api documentation](https://hello-books-amarachi.herokuapp.com/api-docs)

## License

## Author

* **Amarachi Akuwudike** 


