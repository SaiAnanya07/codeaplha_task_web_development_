// Initialize an object to store user credentials
var users = {};

document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Get input values
  var username = document.getElementById('login-username').value;
  var password = document.getElementById('login-password').value;

  // Check if the username exists in the users object
  if (users.hasOwnProperty(username)) {
    // Check if the password matches the one stored for the username
    if (users[username] === password) {
      // Redirect to social.html on successful login
      window.location.href = 'social.html';
    } else {
      // Display error message for incorrect password
      document.getElementById('login-error-message').textContent = 'Invalid password';
    }
  } else {
    // Display error message for unregistered username
    document.getElementById('login-error-message').textContent = 'Username not registered';
  }
});

document.getElementById('register-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Get input values
  var username = document.getElementById('register-username').value;
  var password = document.getElementById('register-password').value;

  // Check if the username already exists
  if (users.hasOwnProperty(username)) {
    // Display error message
    document.getElementById('register-error-message').textContent = 'Username already exists';
  } else {
    // Register the new user
    users[username] = password;
    // Display success message
    document.getElementById('register-success-message').textContent = 'Registration successful. You can now login.';
    // Clear form fields
    document.getElementById('register-form-container').reset();
  }
});

function toggleRegisterForm() {
  var registerFormContainer = document.getElementById('register-form-container');
  var loginFormContainer = document.getElementById('login-form-container');
  var toggleRegisterLink = document.getElementById('toggle-register-link');

  if (registerFormContainer.style.display === 'none') {
    registerFormContainer.style.display = 'block';
    loginFormContainer.style.display = 'none';
    toggleRegisterLink.innerHTML = 'Already have an account? <a href="#" onclick="toggleRegisterForm()">Login</a>';
  } else {
    registerFormContainer.style.display = 'none';
    loginFormContainer.style.display = 'block';
    toggleRegisterLink.innerHTML = 'Don\'t have an account? <a href="#" onclick="toggleRegisterForm()">Register</a>';
  }
}
