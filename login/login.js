function signup() {
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const confirmPassword = document
    .getElementById("signupConfirmPassword")
    .value.trim();
  const errorElement = document.getElementById("signupError");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  errorElement.textContent = "";

  if (!email && !password && !confirmPassword) {
    errorElement.textContent = "Data is required.";
    return;
  }
  if (!email) {
    errorElement.textContent = "Email is required.";
    return;
  }

  if (!emailRegex.test(email)) {
    errorElement.textContent = "Invalid email format.";
    return;
  }

  if (!password) {
    errorElement.textContent = "Password is required.";
    return;
  }

  if (!passwordRegex.test(password)) {
    errorElement.textContent =
      "Password must be at least 8 characters long and include at least one letter, one number, and one special character.";
    return;
  }

  if (!confirmPassword) {
    errorElement.textContent = "Confirm password is required.";
    return;
  }

  if (password !== confirmPassword) {
    errorElement.textContent = "Passwords do not match.";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = users.some((user) => user.email === email);

  if (userExists) {
    errorElement.textContent = "User already exists.";
    return;
  }
  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));

  localStorage.setItem("loggedInUser", email);

  errorElement.textContent = "";
  document.getElementById("signupEmail").value = "";
  document.getElementById("signupPassword").value = "";
  document.getElementById("signupConfirmPassword").value = "";

  window.location.href = "../fonts/fonts.html";
}

function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const errorElement = document.getElementById("loginError");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  errorElement.textContent = "";
  if (!email || !password) {
    errorElement.textContent = "Both email and password are required.";
    return;
  }

  if (!emailRegex.test(email)) {
    errorElement.textContent = "Invalid email format.";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    errorElement.textContent = "Invalid email or password.";
    return;
  }

  localStorage.setItem("loggedInUser", email);

  errorElement.textContent = "";
  document.getElementById("loginEmail").value = "";
  document.getElementById("loginPassword").value = "";

  window.location.href = "../fonts/fonts.html";
}

function togglePass(toggleIconId, passFieldId) {
  const passField = document.getElementById(passFieldId);
  const toggleIcon = document.getElementById(toggleIconId);

  if (passField.type === "password") {
    passField.type = "text";
    toggleIcon.className = "fas fa-eye";
  } else {
    passField.type = "password";
    toggleIcon.className = "fas fa-eye-slash";
  }
}
