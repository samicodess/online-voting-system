document.getElementById("loginForm").addEventListener("submit", loginUser);
document
  .getElementById("registerForm")
  .addEventListener("submit", registerUser);

function hashPassword(password) {
  return btoa(password); // Base64 encoding
}

function registerUser(event) {
  event.preventDefault();
  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;
  const hashedPassword = hashPassword(password);

  let users = JSON.parse(localStorage.getItem("users")) || {};
  if (users[username]) {
    alert("User already exists");
    return;
  }

  users[username] = hashedPassword;
  localStorage.setItem("users", JSON.stringify(users));
  alert("User registered successfully");
  document.getElementById("registerForm").reset();
}

function loginUser(event) {
  event.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  const hashedPassword = hashPassword(password);

  const users = JSON.parse(localStorage.getItem("users")) || {};
  if (users[username] && users[username] === hashedPassword) {
    localStorage.setItem("currentUser", username);
    alert("Login successful");
    window.location.href = "poll_creation.html"; // Redirect to poll creation page
  } else {
    alert("Invalid username or password");
  }
}
