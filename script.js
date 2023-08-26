document.addEventListener('DOMContentLoaded', function() {
    function getUserDataFromLocalStorage() {
      const userJSON = localStorage.getItem('user');
      return userJSON ? JSON.parse(userJSON) : null;
    }
  
    function saveUserDataToLocalStorage(user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  
    function clearUserDataFromLocalStorage() {
      localStorage.removeItem('user');
    }
  
    function generateAccessToken() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let token = '';
      for (let i = 0; i < 16; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return token;
    }
  
    function checkAuthenticationAndRedirect() {
      const user = getUserDataFromLocalStorage();
  
      if (window.location.pathname === '/profile.html') {
        if (!user || !user.accessToken) {
          window.location.href = '/index.html';
        } else {
          document.getElementById('username').textContent = user.username;
          document.getElementById('email').textContent = user.email;
          document.getElementById('password').textContent = user.password;
        }
      } else if (window.location.pathname === '/index.html') {
        if (user && user.accessToken) {
          window.location.href = '/profile.html';
        }
      }
    }
  
    function handleSignupFormSubmission(event) {
      event.preventDefault();
  
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmpassword').value;
  
      if (!username || !email || !password || !confirmPassword) {
        document.getElementById('error-message').textContent = 'All fields are mandatory.';
        return;
      }
  
      if (password !== confirmPassword) {
        document.getElementById('error-message').textContent = 'Passwords do not match.';
        return;
      }
  
      const accessToken = generateAccessToken();
  
      const user = {
        username,
        email,
        password,
        accessToken
      };
  
      saveUserDataToLocalStorage(user);
  
      document.getElementById('success-message').textContent = 'Signup successful. Redirecting to profile...';
  
      setTimeout(function() {
        window.location.href = '/profile.html';
      }, 2000);
    }
  
    function handleLogoutButtonClick() {
      clearUserDataFromLocalStorage();
      window.location.href = '/index.html';
    }
  
    checkAuthenticationAndRedirect();
  
    if (window.location.pathname === '/index.html') {
      const signupForm = document.getElementById('signup-form');
      signupForm.addEventListener('submit', handleSignupFormSubmission);
    } else if (window.location.pathname === '/profile.html') {
      const logoutButton = document.getElementById('logout-btn');
      logoutButton.addEventListener('click', handleLogoutButtonClick);
    }
  });
  