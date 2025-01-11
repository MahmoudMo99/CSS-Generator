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

const htmlCode = document.getElementById("html-code");
const cssCode = document.getElementById("css-code");

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", updatePreview);
});

document
  .getElementById("unit-select")
  .addEventListener("change", updatePreview);

const copyHtmlButton = document.getElementById("copy-html");
const copyCssButton = document.getElementById("copy-css");

copyHtmlButton.addEventListener("click", function () {
  copyToClipboard(htmlCode.textContent);
});

copyCssButton.addEventListener("click", function () {
  copyToClipboard(cssCode.textContent);
});

function copyToClipboard(text) {
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = text;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);
  alert("Code copied to clipboard!");
}

function updatePreview() {
  const unit = document.getElementById("unit-select").value;
  const paddingTop = document.getElementById("padding-top").value || 0;
  const paddingRight = document.getElementById("padding-right").value || 0;
  const paddingBottom = document.getElementById("padding-bottom").value || 0;
  const paddingLeft = document.getElementById("padding-left").value || 0;

  const marginTop = document.getElementById("margin-top").value || 0;
  const marginRight = document.getElementById("margin-right").value || 0;
  const marginBottom = document.getElementById("margin-bottom").value || 0;
  const marginLeft = document.getElementById("margin-left").value || 0;

  const container = document.getElementById("container");
  container.style.padding = `${paddingTop}${unit} ${paddingRight}${unit} ${paddingBottom}${unit} ${paddingLeft}${unit}`;
  container.style.margin = `${marginTop}${unit} ${marginRight}${unit} ${marginBottom}${unit} ${marginLeft}${unit}`;

  htmlCode.textContent = `
<div id="container">
    <div id="content">
        This is a content div<br>Pink is padding<br>Blue is margin
    </div>
</div>`;

  cssCode.textContent = `
#container {
  padding: ${paddingTop}${unit} ${paddingRight}${unit} ${paddingBottom}${unit} ${paddingLeft}${unit};
  margin: ${marginTop}${unit} ${marginRight}${unit} ${marginBottom}${unit} ${marginLeft}${unit};
}`;
}

updatePreview();
