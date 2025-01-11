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
const textDirectionSelect = document.getElementById("text-direction");
const textAlignSelect = document.getElementById("text-align");
const textDecorationSelect = document.getElementById("text-decoration");
const decorationColorRange = document.getElementById("decoration-color");
const textColorRange = document.getElementById("text-color");
const textDecorationThinckness = document.getElementById(
  "text-decoration-thinckness"
);
const textDecorationValue = document.getElementById("text-decoration-value");
const textDecorationStyle = document.getElementById("text-decoration-style");
const textTransform = document.getElementById("text-transform");

const sampleText = document.getElementById("sample-text");
const htmlCode = document.getElementById("html-code");
const cssCode = document.getElementById("css-code");

const copyHtmlButton = document.getElementById("copy-html");
const copyCssButton = document.getElementById("copy-css");

textDirectionSelect.addEventListener("change", updatePreview);
textAlignSelect.addEventListener("change", updatePreview);
textDecorationSelect.addEventListener("change", updatePreview);
decorationColorRange.addEventListener("input", updatePreview);
textColorRange.addEventListener("input", updatePreview);
textDecorationStyle.addEventListener("change", updatePreview);
textTransform.addEventListener("change", updatePreview);

textDecorationThinckness.addEventListener("input", function () {
  textDecorationValue.textContent = textDecorationThinckness.value;
  updatePreview();
});

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
  const textAlign = textAlignSelect.value;
  const textDirection = textDirectionSelect.value;
  const textDecoration = textDecorationSelect.value;
  const decorationColor = decorationColorRange.value;
  const textColor = textColorRange.value;
  const textDecorationThicknessValue = textDecorationThinckness.value;
  const textDecorationStyleValue = textDecorationStyle.value;
  const textTransformValue = textTransform.value;

  sampleText.style.direction = textDirection;
  sampleText.style.textAlign = textAlign;
  sampleText.style.color = textColor;
  sampleText.style.textDecoration = textDecoration;
  sampleText.style.textDecorationColor = decorationColor;
  sampleText.style.textDecorationThickness = `${textDecorationThicknessValue}px`;
  sampleText.style.textDecorationStyle = textDecorationStyleValue;
  sampleText.style.textTransform = textTransformValue;

  htmlCode.textContent = `
<div id="sample-text" class="preview-box">
    This text will change based on the settings you choose!
</div>`;

  cssCode.textContent = `
#sample-text {
    text-direction: ${textDirection};
    text-align: ${textAlign};
    color: ${textColor};
    text-decoration: ${textDecoration};
    text-decoration-color: ${decorationColor};
    text-decoration-thinckness: ${textDecorationThicknessValue};
    text-decoration-style: ${textDecorationStyleValue};
    text-transform: ${textTransformValue};
}`;
}

updatePreview();
