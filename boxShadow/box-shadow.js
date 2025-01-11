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

const horizontalOffsetInput = document.getElementById("horizontal-offset");
const verticalOffsetInput = document.getElementById("vertical-offset");
const blurRadiusInput = document.getElementById("blur-radius");
const spreadRadiusInput = document.getElementById("spread-radius");
const colorInput = document.getElementById("color");
const sampleDivShadow = document.getElementById("sample-div-shadow");

const horizontalValue = document.getElementById("current-horizontal-offset");
const verticalValue = document.getElementById("current-vertical-offset");
const blurValue = document.getElementById("current-blur-radius");
const spreadValue = document.getElementById("current-spread-radius");

const htmlCode = document.getElementById("html-code");
const cssCode = document.getElementById("css-code");
const copyHtmlButton = document.getElementById("copy-html");
const copyCssButton = document.getElementById("copy-css");

horizontalOffsetInput.addEventListener("input", () => {
  horizontalValue.textContent = horizontalOffsetInput.value;
  updatePreview();
});

verticalOffsetInput.addEventListener("input", () => {
  verticalValue.textContent = verticalOffsetInput.value;
  updatePreview();
});

blurRadiusInput.addEventListener("input", () => {
  blurValue.textContent = blurRadiusInput.value;
  updatePreview();
});

spreadRadiusInput.addEventListener("input", () => {
  spreadValue.textContent = spreadRadiusInput.value;
  updatePreview();
});

function updatePreview() {
  const horizontalOffset = `${horizontalOffsetInput.value}px`;
  const verticalOffset = `${verticalOffsetInput.value}px`;
  const blurRadius = `${blurRadiusInput.value}px`;
  const spreadRadius = `${spreadRadiusInput.value}px`;
  const color = colorInput.value;

  const boxShadow = `${horizontalOffset} ${verticalOffset} ${blurRadius} ${spreadRadius} ${color}`;
  sampleDivShadow.style.boxShadow = boxShadow;

  htmlCode.textContent = `<div id="sample-div-shadow">Div with Box Shadow</div>`;
  cssCode.textContent = `
#sample-div-shadow {
    box-shadow: ${boxShadow};
}`;
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

horizontalOffsetInput.addEventListener("input", updatePreview);
verticalOffsetInput.addEventListener("input", updatePreview);
blurRadiusInput.addEventListener("input", updatePreview);
spreadRadiusInput.addEventListener("input", updatePreview);
colorInput.addEventListener("input", updatePreview);

copyHtmlButton.addEventListener("click", () => {
  copyToClipboard(htmlCode.textContent);
});

copyCssButton.addEventListener("click", () => {
  copyToClipboard(cssCode.textContent);
});

updatePreview();
