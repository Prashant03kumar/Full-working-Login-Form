// for handling login and signup
const toggleText = document.getElementById("toggleText"); // Register/Login
const submitButton = document.getElementById("submitButton"); // Button
const usernameLabel = document.getElementById("usernameLabel"); // username label
const passwordLabel = document.getElementById("passwordLabel"); // password Label
const usernameInput = document.getElementById("usernameInput"); // create a pasword
const passwordInput = document.getElementById("passwordInput");
const forgotPassword = document.getElementById("forgotPassword");
const authForm = document.getElementById("authForm");

let isLogin = true;

// Simple data structure to store user credentials
// const users = {
//   // username: password
//   user123: "password123",
// };
/*is just a JavaScript in-memory object. It lives only as long as the page is loaded.
So when you refresh the page, all added users are lost because:
JavaScript variables don’t persist across reloads
The users object resets back to its initial state every time */

// We can use local storage
// It's a powerful tool in the browser that lets you store data permanently — even after the page is reloaded or the browser is closed.
// localStorage is like a mini database in your browser. It allows you to store key-value pairs
/*
Both key and value must be strings
Data stays even after refreshing or closing the browser
It’s specific to your browser and specific to a website
*/

/**
 * we must convert them into a string using JSON.stringify.
🔑 Basic Operations in localStorage
* localStorage.setItem(key, value) Save data
* localStorage.getItem(key) Retrieve data
* localStorage.removeItem(key)  Delete specific data
 */
let users = JSON.parse(localStorage.getItem("users")) || {
  user1: "pass1", // default username and password for login page
};

toggleText.addEventListener("click", function () {
  if (isLogin) {
    // when user click on register then we will move for singup page
    submitButton.textContent = "Sign Up";
    usernameLabel.textContent = "Create Username";
    passwordLabel.textContent = "Create Password";
    usernameInput.placeholder = "Choose a Username";
    toggleText.textContent = "Login";

    forgotPassword.style.display = "none"; // hide

    isLogin = false;
  } else {
    submitButton.textContent = "Login";
    usernameLabel.textContent = "Username";
    passwordLabel.textContent = "Password";
    usernameInput.placeholder = "Enter Your Name";
    toggleText.textContent = "Register";

    forgotPassword.style.display = "inline"; // show
    isLogin = true;
  }
});

authForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  if (isLogin) {
    if (users[username] && users[username] === password) {
      //successfullylogin
      alert(`Welcome back, ${username}!`);
      usernameInput.value = "";
      passwordInput.value = "";
    } else if (users[username] && users[username] !== password) {
      // user found but password not match
      alert(`Invalid Password`);
      passwordInput.value = ""; // clear only password
    } else {
      // username isn't exists
      alert(`User not found. Register now`);
      usernameInput.value = ""; // clear both fields
      passwordInput.value = "";
    }
  } else {
    // when we are in sign up page
    if (users[username]) {
      alert("Username already exists. Please choose another.");
      usernameInput.value = "";
      passwordInput.value = "";
    } else if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      passwordInput.value = "";
    } else {
      users[username] = password; // Save new user in object
      localStorage.setItem("users", JSON.stringify(users)); //  // Save new user
      alert("Account created successfully! Please login.");
      toggleText.click(); // switch to login mode automatically
      usernameInput.value = ""; // clean fields after signup
      passwordInput.value = "";
    }
  }
});
