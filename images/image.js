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

const grayscale = document.getElementById("gray-scale");
const blurInput = document.getElementById("blur-input");
const brightnessInput = document.getElementById("brightness");
const contrastInput = document.getElementById("contrast");
const opacityInput = document.getElementById("opacity");
const saturateInput = document.getElementById("saturate");

const sampleImage = document.getElementById("sample-img");
const htmlCode = document.getElementById("html-code");
const cssCode = document.getElementById("css-code");
const currentScale = document.getElementById("current-scale");
const currentBlur = document.getElementById("current-blur");
const currentBrightness = document.getElementById("current-bright");
const currentContrast = document.getElementById("current-contrast");
const currentOpacity = document.getElementById("current-opacity");
const currentSaturate = document.getElementById("current-saturate");

const copyHtmlButton = document.getElementById("copy-html");
const copyCssButton = document.getElementById("copy-css");

grayscale.addEventListener("input", updatePreview);
blurInput.addEventListener("input", updatePreview);
brightnessInput.addEventListener("input", updatePreview);
contrastInput.addEventListener("input", updatePreview);
opacityInput.addEventListener("input", updatePreview);
saturateInput.addEventListener("input", updatePreview);

grayscale.addEventListener("input", function () {
  currentScale.textContent = grayscale.value;
  updatePreview();
});

brightnessInput.addEventListener("input", function () {
  currentBrightness.textContent = brightnessInput.value;
  updatePreview();
});

blurInput.addEventListener("input", function () {
  currentBlur.textContent = blurInput.value;
  updatePreview();
});

opacityInput.addEventListener("input", function () {
  currentOpacity.textContent = opacityInput.value;
  updatePreview();
});

saturateInput.addEventListener("input", function () {
  currentSaturate.textContent = saturateInput.value;
  updatePreview();
});

contrastInput.addEventListener("input", function () {
  currentContrast.textContent = contrastInput.value;
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
  const grayscaleValue = grayscale.value;
  const blurValue = blurInput.value;
  const brightnessValue = brightnessInput.value;
  const contrastValue = contrastInput.value;
  const opacityValue = opacityInput.value;
  const saturateValue = saturateInput.value;

  sampleImage.style.filter = `grayscale(${grayscaleValue}%) blur(${blurValue}px) brightness(${brightnessValue}%) contrast(${contrastValue}%) opacity(${opacityValue}%) saturate(${saturateValue}%)`;

  htmlCode.textContent = `
<div class="preview-box">
    <img src="Tulips in Holland.jpg" id="sample-img">
</div>`;

  cssCode.textContent = `
#sample-img {
    filter: grayscale(${grayscaleValue}%) blur(${blurValue}px) brightness(${brightnessValue}%) contrast(${contrastValue}%) opacity(${opacityValue}%) saturate(${saturateValue}%);
}`;
}

updatePreview();
