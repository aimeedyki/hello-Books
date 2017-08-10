  openTab = (evt, tabName) => {
  let index, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName('tabcontent');
  for (index = 0; index < tabcontent.length; index++) {
    tabcontent[index].style.display = 'none';
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName('tablinks');
  for (index = 0; index < tablinks.length; index++) {
    tablinks[index].className = tablinks[index].className.replace('active', '');
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
};