const { landing, signin, signup } = require('./selectors');
const { input } = require('./input');

module.exports = {
  'landing page': (client) => {
    client
      .url('http://localhost:5000')
      .waitForElementVisible('body', 1000)
      .assert.visible('#pic')
      .assert.visible('.navbar')
      .assert.containsText('.navbar', 'Booksville')
      .assert.containsText('.navbar', 'About')
      .assert.containsText('.navbar', 'API DOCS')
      .assert.visible(landing.loginButton)
      .assert.visible(landing.signupLink)
      .assert.containsText(landing.loginButton, 'LOGIN')
      .assert.containsText(landing.signupLink, 'here')
      .click(landing.signupLink)
      .assert.urlEquals('http://localhost:5000/signup')
      .assert.visible(landing.signupButton)
      .assert.visible(landing.loginLink)
      .assert.containsText(landing.signupButton, 'SIGNUP')
      .assert.containsText(landing.loginLink, 'here')
      .click(landing.loginLink)
      .assert.urlEquals('http://localhost:5000/login')
      .click('#logo-container')
      .assert.urlEquals('http://localhost:5000/')
      .pause(2000);
  },
  'Signin form displays error when password is wrong': (client) => {
    client
      .setValue(signin.usernameInput, 'aimee')
      .pause(2000)
      .setValue(signin.passwordInput, 'wrongpassword')
      .pause(2000)
      .click(landing.loginButton)
      .waitForElementVisible('#toast-container', 1000)
      .assert.containsText(
        '#toast-container', 'username or password is incorrect')
      .pause(1000)
      .refresh();
  },
  'Signin form displays error when username does not exist': (client) => {
    client
      .setValue(signin.usernameInput, 'wrongname')
      .pause(2000)
      .setValue(signin.passwordInput, 'wrongpassword')
      .pause(2000)
      .click(landing.loginButton)
      .waitForElementVisible('#toast-container', 1000)
      .assert.containsText(
        '#toast-container', 'Username does not exist. Please confirm')
      .pause(1000)
      .refresh();
  },
  'User signs in with correct details': (client) => {
    client
      .setValue(signin.usernameInput, 'aimee')
      .pause(2000)
      .setValue(signin.passwordInput, 'bookiiii')
      .pause(2000)
      .click(landing.loginButton)
      .waitForElementVisible('#toast-container', 1000)
      .assert.containsText(
        '#toast-container', 'Welcome back to Booksville')
      .end();
  },
  'Signup form displays error when email is taken':
    (client) => {
      client
        .url('http://localhost:5000')
        .click(landing.signupLink)
        .setValue(signup.emailInput, 'aimee@yahoo.com')
        .pause(2000)
        .setValue(signup.usernameInput, 'aimee')
        .pause(2000)
        .setValue(signup.nameInput, 'aimee')
        .pause(2000)
        .setValue(signup.passwordInput, 'password')
        .pause(2000)
        .setValue(signup.confirmPasswordInput, 'password')
        .pause(2000)
        .click(landing.signupButton)
        .waitForElementVisible('#toast-container', 1000)
        .assert.containsText(
          '#toast-container',
          'Email/username already Exists, Please choose another one')
        .pause(1000)
        .refresh();
    },
  'Signup form displays error when email is in wrong format':
    (client) => {
      client
        .setValue(signup.emailInput, 'aimee@yahoo')
        .pause(2000)
        .setValue(signup.usernameInput, 'aimee')
        .pause(2000)
        .setValue(signup.nameInput, 'aimee')
        .pause(2000)
        .setValue(signup.passwordInput, 'password')
        .pause(2000)
        .setValue(signup.confirmPasswordInput, 'password')
        .pause(2000)
        .click(landing.signupButton)
        .waitForElementVisible('#toast-container', 1000)
        .assert.containsText(
          '#toast-container', 'Please enter a valid email')
        .pause(1000)
        .refresh();
    },
  'Signup form displays error when username has been taken':
    (client) => {
      client
        .setValue(signup.emailInput, 'blue@yaah.com')
        .pause(2000)
        .setValue(signup.usernameInput, 'aimee')
        .pause(2000)
        .setValue(signup.nameInput, 'aimee')
        .pause(2000)
        .setValue(signup.passwordInput, 'password')
        .pause(2000)
        .setValue(signup.confirmPasswordInput, 'password')
        .pause(2000)
        .click(landing.signupButton)
        .waitForElementVisible('#toast-container', 1000)
        .assert.containsText(
          '#toast-container',
          'Email/username already Exists, Please choose another one')
        .pause(1000)
        .refresh();
    },
  'Signup form displays error when passwords do not match':
    (client) => {
      client
        .setValue(signup.emailInput, 'blue@yaah.com')
        .pause(2000)
        .setValue(signup.usernameInput, 'aimee')
        .pause(2000)
        .setValue(signup.nameInput, 'aimee')
        .pause(2000)
        .setValue(signup.passwordInput, 'password')
        .pause(2000)
        .setValue(signup.confirmPasswordInput, 'paaassword')
        .pause(2000)
        .click(landing.signupButton)
        .waitForElementVisible('#toast-container', 1000)
        .assert.containsText(
          '#toast-container', 'Passwords do not match')
        .pause(1000)
        .refresh();
    },
  'Signup form displays error when password is less than 8':
    (client) => {
      client
        .setValue(signup.emailInput, 'blue@yaah.com')
        .pause(2000)
        .setValue(signup.usernameInput, 'aimee')
        .pause(2000)
        .setValue(signup.nameInput, 'aimee')
        .pause(2000)
        .setValue(signup.passwordInput, 'wrong')
        .pause(2000)
        .setValue(signup.confirmPasswordInput, 'wrong')
        .pause(2000)
        .click(landing.signupButton)
        .waitForElementVisible('#toast-container', 1000)
        .assert.containsText(
          '#toast-container', 'Password must be up to 8 characters')
        .pause(1000)
        .refresh();
    },
  'Signs up a user':
    (client) => {
      client
        .setValue(signup.emailInput, input.email)
        .pause(2000)
        .setValue(signup.usernameInput, input.userName)
        .pause(2000)
        .setValue(signup.nameInput, input.userName)
        .pause(2000)
        .setValue(signup.passwordInput, 'password')
        .pause(2000)
        .setValue(signup.confirmPasswordInput, 'password')
        .pause(2000)
        .click(landing.signupButton)
        .waitForElementVisible('#toast-container', 1000)
        .assert.containsText(
          '#toast-container', 'Signup successful! Welcome to Booksville')
        .pause(1000)
        .end();
    }
};
