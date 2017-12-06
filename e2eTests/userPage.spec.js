const { userPage, signin, landing, editBook, addBook } = require('./selectors');

module.exports = {
  'User should see user page': (client) => {
    client
      .url('http://localhost:5000')
      .setValue(signin.usernameInput, 'aimee')
      .pause(2000)
      .setValue(signin.passwordInput, 'bookiiii')
      .pause(2000)
      .click(landing.loginButton)
      .pause(2000)
      .waitForElementVisible('body', 1000)
      .assert.visible('.navbar-fixed')
      .assert.visible(userPage.levelImage)
      .assert.containsText('.navbar-fixed', 'Booksville')
      .assert.containsText('.navbar-fixed', 'Log out')
      .assert.visible('#slide-out')
      .assert.visible(userPage.profileImage)
      .assert.visible(userPage.settingsIcon)
      .assert.visible(userPage.greeting)
      .assert.visible(userPage.email)
      .assert.visible(userPage.navLinks)
      .assert.containsText(userPage.navLinks, 'Library')
      .assert.containsText(userPage.navLinks, 'Borrow History')
      .assert.containsText(userPage.navLinks, 'Unreturned Books')
      .assert.containsText(userPage.navLinks, 'Admin Dashboard')
      .assert.visible(userPage.categories)
      .assert.containsText(userPage.categories, 'Categories')
      .assert.visible('.my-footer')
      .assert.visible(userPage.library)
      .assert.containsText(userPage.library, 'All Books')
      .assert.visible('.search-bar')
      .assert.containsText('.search-bar', 'search')
      .assert.visible(userPage.searchIcon)
      .assert.visible(userPage.book)
      .pause(1000);
  },
  'User should be able to borrow a book': (client) => {
    client
      .click(userPage.moreIcons)
      .pause(500)
      .click('#rent')
      .pause(500)
      .assert.visible('.swal-modal')
      .assert.containsText('.swal-modal', 'Rent Book?')
      .click(userPage.okBorrowButton)
      .pause(500)
      .assert.visible(userPage.successIcon)
      .assert.containsText(userPage.successText, 'Borrowed!')
      .click(userPage.okButton)
      .pause(1000);
  },
  'Admin user should be able to edit a book': (client) => {
    client
      .waitForElementVisible('#rent', 8000)
      .moveToElement('#rent', 1, 1)
      .pause(3000)
      .assert.visible(userPage.editButton)
      .click(userPage.editButton)
      .waitForElementVisible(userPage.editPage, 8000)
      .assert.containsText(userPage.editPage, 'Title')
      .assert.containsText(userPage.editPage, 'Author')
      .assert.containsText(userPage.editPage, 'Description')
      .assert.containsText(userPage.editPage, 'Quantity')
      .assert.containsText(userPage.editPage, 'Category')
      .assert.visible('#category')
      .assert.visible(editBook.authorInput)
      .assert.visible(editBook.descriptionInput)
      .assert.visible(editBook.quantityInput)
      .assert.visible(editBook.titleInput)
      .assert.visible(editBook.imageButton)
      .assert.containsText(editBook.imageButton, 'BOOK IMAGE')
      .assert.visible(editBook.submitButton)
      .assert.containsText(editBook.submitButton, 'SAVE CHANGES')
      .clearValue(editBook.authorInput)
      .setValue(editBook.authorInput, 'Aimee Dike')
      .pause(1000)
      .click(editBook.submitButton)
      .waitForElementVisible('#toast-container', 1000)
      .assert.visible('#toast-container')
      .assert.containsText(
        '#toast-container', 'Book information has been modified!')
      .pause(1000);
  },
  'Admin user should be able to add a book': (client) => {
    client
      .waitForElementVisible(addBook.addButton, 8000)
      .assert.visible(addBook.addButton)
      .click(addBook.addButton)
      .assert.urlEquals('http://localhost:5000/main/add-book')
      .pause(1000);
  }
};
