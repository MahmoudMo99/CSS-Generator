document.addEventListener("DOMContentLoaded", () => {
  btnsDisplay();
});

function btnsDisplay() {
  const authBtn = document.getElementById("auth-btn");
  const profilePic = document.getElementById("profile-pic");

  const currentUserEmail = localStorage.getItem("loggedInUser");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = users.find((user) => user.email === currentUserEmail);

  if (currentUser) {
    authBtn.innerHTML = "Logout";
    profilePic.style.display = "block";

    authBtn.addEventListener("click", (e) => {
      e.preventDefault();
      logout();
    });
  } else {
    authBtn.innerHTML = "Login";
    authBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "../login/login.html";
    });
    profilePic.style.display = "none";
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "../login/login.html";
}

const sidebar = document.querySelector(".sidebar");
const toggleButton = document.querySelector(".toggle-sidebar");

toggleButton.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

const listStyleSelect = document.getElementById("list-style");
const listStylePositionSelect = document.getElementById("list-style-position");
const sampleList = document.getElementById("sample-list");
const htmlCodeElement = document.getElementById("html-code");
const cssCodeElement = document.getElementById("css-code");
const copyHtmlButton = document.getElementById("copy-html");
const copyCssButton = document.getElementById("copy-css");

function updateListStyle() {
  const listStyle = listStyleSelect.value;
  const listStylePosition = listStylePositionSelect.value;

  sampleList.style.listStyleType = listStyle;
  sampleList.style.listStylePosition = listStylePosition;

  updateCode();
}

function updateCode() {
  const htmlCode = `
<ul id="sample-list">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>`;
  htmlCodeElement.textContent = htmlCode;

  const cssCode = `
#sample-list {
  list-style-type: ${listStyleSelect.value};
  list-style-position: ${listStylePositionSelect.value};
}`;
  cssCodeElement.textContent = cssCode;
}

function copyToClipboard(text) {
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = text;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);
  alert("Code copied to clipboard!");
}

listStyleSelect.addEventListener("change", updateListStyle);
listStylePositionSelect.addEventListener("change", updateListStyle);

copyHtmlButton.addEventListener("click", () => {
  copyToClipboard(htmlCodeElement.textContent);
});
copyCssButton.addEventListener("click", () => {
  copyToClipboard(cssCodeElement.textContent);
});

updateListStyle();
