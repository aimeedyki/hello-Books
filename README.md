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

#### System Dependencies

- [node](https://nodejs.org/en/download/): version 5 or greater is required
- [postgresql](https://www.postgresql.org/download/): an object-relational database management system

#### Installation

You can get the app running locally in the following way:
 - Install NodeJs and Postgres on your machine
 - Clone the repository `$ git clone [https://github.com/aimeedyki/hello-Books.git]( https://github.com/aimeedyki/hello-Books.git)`
- Change into the directory $ cd /helloBooks
- Use `$ npm install` to install all required dependencies.
- Create a `.env` file in your root directory and set the 'SECRET' environment variable.
- Run migrations with `$ sequelize db:migrate`.
- Start app with `$ npm run start:dev`

The app will be running at http://localhost:5000

#### Running the tests

- The tests were written using Mocha, Supertest and Chai.
- To run test, navigate to app directory
- run test
  `$ npm run test` for server side tests
  `$ npm run client:test` for client side tests

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

[License](./License.md)

## FAQ

#### Is this an Open-Source Application?

Yes it is, and you can contribute to the development of this application by raising PRs

#### Who can contribute?

Anyone!. This application is open to all those who want to contribute to open-source development and are willing to follow
set standards for contributing.

#### Is there a set standard for PRs to this repository?

Yes, there are set conventions for PRs to this repository and can be found in the project [wiki](https://github.com/aimeedyki/hello-Books/wiki).

#### What language was used to develop this application?

This project is a full stack Javascript application

#### Can I clone this application for personal use?

Yes!. This application is licensed under MIT, and is open for whatever you may choose to use it for.

## Author

* **Amarachi Akuwudike** 


