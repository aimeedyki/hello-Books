module.exports = {
  landing: {
    loginButton: '#main > div > div > div.background-set > div.background-set > div > div > div > div > div > div > form > div:nth-child(3) > div > div > button',
    signupLink: '#main > div > div > div.background-set > div.background-set > div > div > div > div > div > div > form > p:nth-child(6) > a',
    loginLink: '#main > div > div > div.background-set > div.background-set > div > div > div > div > div > div > form > p > a',
    signupButton: '#main > div > div > div.background-set > div.background-set > div > div > div > div > div > div > form > div:nth-child(2) > div > div > button'
  },
  signin: {
    usernameInput: '#main > div > div > div.background-set > div.background-set > div > div > div > div > div > div > form > div:nth-child(1) > div > input',
    passwordInput: '#main > div > div > div.background-set > div.background-set > div > div > div > div > div > div > form > div.input-field.col.s12 > input'
  },
  signup: {
    emailInput: '#main > div > div > div.background-set > div.background-set > div > div > div > div > div > div > form > div:nth-child(1) > div:nth-child(1) > input',
    usernameInput: '#main > div > div > div.background-set > div.background-set > div > div > div > div > div > div > form > div:nth-child(1) > div:nth-child(2) > input',
    nameInput: '#main > div > div > div.background-set > div.background-set > div > div > div > div > div > div > form > div:nth-child(1) > div:nth-child(3) > input',
    passwordInput: '#main > div > div > div.background-set > div.background-set > div > div > div > div > div > div > form > div:nth-child(1) > div:nth-child(4) > input',
    confirmPasswordInput: '#main > div > div > div.background-set > div.background-set > div > div > div > div > div > div > form > div:nth-child(1) > div:nth-child(5) > input'
  },
  userPage: {
    levelImage: '#main > div > div > div.row.grey.lighten-4 > div > nav > div > ul > li:nth-child(1) > div > div > img',
    profileImage: '#slide-out > li:nth-child(1) > div > a:nth-child(2) > img',
    settingsIcon: '#slide-out > li:nth-child(1) > div > a:nth-child(4) > span > i',
    greeting: '#slide-out > li:nth-child(1) > div > a:nth-child(3) > span',
    email: '#slide-out > li:nth-child(1) > div > a:nth-child(5) > span',
    navLinks: '#slide-out',
    categories: '#slide-out > div',
    library: '#main > div > div > div:nth-child(3) > div.row > div',
    searchIcon: '#topbarsearch > div > i',
    book: '#main > div > div > div:nth-child(3) > div.row > div > div > div > div:nth-child(1) > div > div:nth-child(2) > div',
    moreIcons: '#card-book > span > i',
    okBorrowButton: 'body > div.swal-overlay.swal-overlay--show-modal > div > div.swal-footer > div > button',
    successIcon: 'body > div.swal-overlay.swal-overlay--show-modal > div > div.swal-icon.swal-icon--success',
    successText: 'body > div.swal-overlay.swal-overlay--show-modal > div > div.swal-title',
    okButton: 'body > div.swal-overlay.swal-overlay--show-modal > div > div.swal-footer > div > button',
    close: '#main > div > div > div:nth-child(3) > div.row > div > div > div > div:nth-child(1) > div > div:nth-child(2) > div > div.card-reveal > span > i',
    adminButtons: '#main > div > div > div:nth-child(3) > div.row > div > div > div > div:nth-child(1) > div > div:nth-child(2) > div > div.card-reveal > div > ul',
    editButton: '#main > div > div > div:nth-child(3) > div.row > div > div > div > div:nth-child(1) > div > div:nth-child(2) > div > div.card-reveal > div > ul > li:nth-child(1) > a',
    editPage: '#main > div > div > div:nth-child(3) > div.row > div > div'
  },
  editBook: {
    titleInput: '#main > div > div > div:nth-child(3) > div.row > div > div > div > form > div.row.center.edit-form > div:nth-child(1) > div.col.s12.l9.m9 > input',
    authorInput: '#main > div > div > div:nth-child(3) > div.row > div > div > div > form > div.row.center.edit-form > div:nth-child(2) > div.col.s12.l9.m9 > input',
    descriptionInput: '#main > div > div > div:nth-child(3) > div.row > div > div > div > form > div.row.edit-form > div:nth-child(3) > div.col.s12.l9.m9 > input',
    quantityInput: '#main > div > div > div:nth-child(3) > div.row > div > div > div > form > div.row.edit-form > div:nth-child(4) > div.col.s12.l9.m9 > input',
    imageButton: '#main > div > div > div:nth-child(3) > div.row > div > div > div > form > div.row.center.edit-form > div.col.s12.l9.m9 > div.file-field.input-field > div.btn.indigo.darken-2.margin-fix',
    submitButton: '#main > div > div > div:nth-child(3) > div.row > div > div > div > form > div:nth-child(2) > div > div > button'
  },
  addBook: {
    addButton: '#main > div > div > div:nth-child(3) > div.row > div > div > div > div.fixed-action-btn > a > i'
  }
};
