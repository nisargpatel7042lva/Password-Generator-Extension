// Character sets for password generation
const CHARS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

// Generate a random password using the specified length
function generatePassword(length) {
  const allChars = Object.values(CHARS).join('');
  let password = '';
  
  // Ensure at least one character from each set
  password += CHARS.uppercase[Math.floor(Math.random() * CHARS.uppercase.length)];
  password += CHARS.lowercase[Math.floor(Math.random() * CHARS.lowercase.length)];
  password += CHARS.numbers[Math.floor(Math.random() * CHARS.numbers.length)];
  password += CHARS.symbols[Math.floor(Math.random() * CHARS.symbols.length)];
  
  // Fill the rest with random characters
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

// Show notification
function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

// Copy text to clipboard
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showNotification('Password copied to clipboard!');
  } catch (err) {
    showNotification('Failed to copy password');
  }
}

// Initialize the extension
document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generateBtn');
  const lengthInput = document.getElementById('passwordLength');
  const password1 = document.getElementById('password1');
  const password2 = document.getElementById('password2');
  
  // Set up password length input validation
  lengthInput.addEventListener('input', () => {
    let value = parseInt(lengthInput.value);
    if (value > 25) lengthInput.value = 25;
    if (value < 4) lengthInput.value = 4;
  });
  
  // Generate passwords button click handler
  generateBtn.addEventListener('click', () => {
    const length = parseInt(lengthInput.value);
    if (isNaN(length) || length < 4 || length > 25) {
      showNotification('Please enter a valid length (4-25)');
      return;
    }
    
    password1.textContent = generatePassword(length);
    password2.textContent = generatePassword(length);
  });
  
  // Set up password click handlers
  [password1, password2].forEach(elem => {
    elem.addEventListener('click', () => {
      if (elem.textContent !== 'Click generate to start') {
        copyToClipboard(elem.textContent);
      }
    });
  });
});