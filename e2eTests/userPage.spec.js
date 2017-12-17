const {
  userPage, signin, landing, editBook, addBook, borrowHistory,
  outstandingBooks, adminDashboard, category
} = require('./selectors');

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
      .waitForElementVisible('#rent', 9000)
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
      .setValue(editBook.authorInput, 'Dan Brown')
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
      .pause(1000)
      .assert.visible(addBook.card)
      .assert.containsText(addBook.card, 'Add A New Book')
      .assert.containsText(addBook.card, 'Title')
      .assert.containsText(addBook.card, 'Author')
      .assert.containsText(addBook.card, 'Description')
      .assert.containsText(addBook.card, 'Quantity')
      .assert.containsText(addBook.card, 'Select a category')
      .pause(500)
      .assert.visible(addBook.titleInput)
      .assert.visible(addBook.authorInput)
      .assert.visible(addBook.descriptionInput)
      .assert.visible(addBook.quantityInput)
      .assert.visible('#category')
      .assert.visible(addBook.submitButton)
      .pause(500)
      .setValue(addBook.titleInput, 'the new title')
      .pause(500)
      .setValue(addBook.authorInput, 'an author')
      .pause(500)
      .setValue(addBook.descriptionInput, 'the description')
      .pause(500)
      .setValue(addBook.quantityInput, 10)
      .pause(500)
      .click('#category')
      .waitForElementVisible(addBook.select, 8000)
      .click(addBook.select)
      .pause(500)
      .click(addBook.submitButton)
      .waitForElementVisible('#toast-container', 8000)
      .assert.containsText('#toast-container', 'Book added Successfully')
      .pause(1000);
  },
  'User should be able to view borrow history': (client) => {
    client
      .click(borrowHistory.link)
      .pause(1000)
      .assert.visible(borrowHistory.table)
      .assert.containsText(borrowHistory.table, 'TITLE')
      .pause(1000)
      .assert.containsText(borrowHistory.table, 'DATE BORROWED')
      .pause(1000)
      .assert.containsText(borrowHistory.table, 'DATE RETURNED')
      .pause(1000)
      .assert.containsText(borrowHistory.table, 'DUE DATE')
      .pause(1000);
  },
  'User should be able to view outstanding books': (client) => {
    client
      .click(outstandingBooks.link)
      .pause(1000)
      .assert.visible(outstandingBooks.table)
      .assert.containsText(outstandingBooks.table, 'TITLE')
      .pause(1000)
      .assert.containsText(outstandingBooks.table, 'DATE BORROWED')
      .pause(1000)
      .assert.containsText(outstandingBooks.table, 'RETURN NOW?')
      .pause(1000)
      .assert.containsText(outstandingBooks.table, 'DUE DATE')
      .pause(1000)
      .click(outstandingBooks.returnLink)
      .waitForElementVisible('.swal-modal', 20000)
      .assert.containsText('.swal-modal', 'Return this book?')
      .click(outstandingBooks.ok)
      .pause(1000)
      .assert.visible(outstandingBooks.successIcon)
      .assert.containsText(outstandingBooks.successText, 'Returned!')
      .click(outstandingBooks.okSuccess)
      .pause(1000);
  },
  'Admin user should be able to navigate to their dashboard': (client) => {
    client
      .click(adminDashboard.link)
      .assert.urlEquals('http://localhost:5000/main/admin-dashboard')
      .assert.visible(adminDashboard.activities)
      .assert.visible(adminDashboard.categories)
      .assert.visible(adminDashboard.transactions)
      .assert.containsText(adminDashboard.activities, 'User Activities')
      .assert.containsText(adminDashboard.categories, 'Category Controls')
      .assert.containsText(adminDashboard.transactions, 'User Transactions')
      .pause(1000);
  },
  'Admin user should be able to add a category': (client) => {
    client
      .click(adminDashboard.categoryLink)
      .pause(5000)
      .assert.visible(category.page)
      .pause(2000)
      .assert.visible(category.button)
      .pause(2000)
      .assert.visible(category.input)
      .pause(2000)
      .assert.urlEquals('http://localhost:5000/main/category')
      .assert.containsText(category.page, 'Add A New Category')
      .pause(2000)
      .assert.containsText(category.page, 'Category title')
      .pause(2000)
      .setValue(category.input, 'Education')
      .pause(2000)
      .click(category.button)
      .pause(2000)
      .assert.visible('#toast-container')
      .assert.containsText('#toast-container', 'Category added Successfully!')
      .pause(5000)
      .end();
  }
};
