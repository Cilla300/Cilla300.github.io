document.getElementById('registrationForm').addEventListener('submit', function(event) {
    
    event.preventDefault();

    document.querySelectorAll('.error-message').forEach(function(el) {
      el.textContent = '';
    });
  
    // Validate username
    const username = document.getElementById('username').value.trim();
    if (username === '') {
      showError('username', 'Username is required.');
    } else if (username.length < 3 || username.length > 15) {
      showError('username', 'Username must be between 3 and 15 characters.');
    }
  

    const email = document.getElementById('email').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
      showError('email', 'Email is required.');
    } else if (!emailPattern.test(email)) {
      showError('email', 'Please enter a valid email address.');
    }
  
    
    const password = document.getElementById('password').value.trim();
    if (password === '') {
      showError('password', 'Password is required.');
    } else if (password.length < 8) {
      showError('password', 'Password must be at least 8 characters long.');
    }
  
    
    if (document.querySelectorAll('.error-message:empty').length === 3) {
      
      alert('Form submitted successfully!');

    }
  });
  
  function showError(inputId, message) {
    const inputElement = document.getElementById(inputId);
    const errorElement = inputElement.nextElementSibling;
    errorElement.textContent = message;
  }
  