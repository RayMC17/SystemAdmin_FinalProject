// Hardcoded credentials
const validUsername = "admin";
const validPassword = "password123";

// Add event listener to the login button
document.getElementById("loginButton").addEventListener("click", function () {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Check credentials
  if (username === validUsername && password === validPassword) {
    // Redirect to success page
    window.location.href = "translate_game.html";
  } else {
    // Show error message
    document.getElementById("errorMessage").style.display = "block";
  }
});

// // Add event listener to the logout button
// document.getElementById("logoutButton").addEventListener("click", function () {
//   // Redirect back to login page
//   document.getElementById("gamePage").style.display = "none";
//   document.getElementById("loginPage").style.display = "block";
//   document.getElementById("username").value = "";
//   document.getElementById("password").value = "";
//   document.getElementById("errorMessage").style.display = "none";
// });