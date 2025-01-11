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

const buttonPaddingInput = document.getElementById("button-padding");
const buttonMarginInput = document.getElementById("button-margin");
const buttonWidthInput = document.getElementById("button-width");
const buttonHeightInput = document.getElementById("button-height");
const buttonBorderRadiusInput = document.getElementById("button-border-radius");
const buttonColorInput = document.getElementById("button-color");
const buttonBgColorInput = document.getElementById("button-bg-color");
const buttonBorderInput = document.getElementById("button-border");
const buttonShadowInput = document.getElementById("button-shadow");
const buttonTextInput = document.getElementById("button-text");
const sampleButton = document.getElementById("sample-button");

const paddingValue = document.getElementById("padding-value");
const marginValue = document.getElementById("margin-value");
const widthValue = document.getElementById("width-value");
const heightValue = document.getElementById("height-value");
const borderRadiusValue = document.getElementById("border-radius-value");
const textValue = document.getElementById("text-value");

const htmlCode = document.getElementById("html-code");
const cssCode = document.getElementById("css-code");
const copyHtmlButton = document.getElementById("copy-html");
const copyCssButton = document.getElementById("copy-css");

buttonPaddingInput.addEventListener("input", () => {
  paddingValue.textContent = buttonPaddingInput.value;
  updatePreview();
});

buttonMarginInput.addEventListener("input", () => {
  marginValue.textContent = buttonMarginInput.value;
  updatePreview();
});

buttonWidthInput.addEventListener("input", () => {
  widthValue.textContent = buttonWidthInput.value;
  updatePreview();
});

buttonHeightInput.addEventListener("input", () => {
  heightValue.textContent = buttonHeightInput.value;
  updatePreview();
});

buttonBorderRadiusInput.addEventListener("input", () => {
  borderRadiusValue.textContent = buttonBorderRadiusInput.value;
  updatePreview();
});

buttonTextInput.addEventListener("input", () => {
  textValue.textContent = buttonTextInput.value;
  updatePreview();
});

buttonColorInput.addEventListener("input", updatePreview);
buttonBgColorInput.addEventListener("input", updatePreview);
buttonBorderInput.addEventListener("input", updatePreview);
buttonShadowInput.addEventListener("input", updatePreview);

copyHtmlButton.addEventListener("click", () => {
  copyToClipboard(htmlCode.textContent);
});

copyCssButton.addEventListener("click", () => {
  copyToClipboard(cssCode.textContent);
});

function updatePreview() {
  const padding = `${buttonPaddingInput.value}px`;
  const margin = `${buttonMarginInput.value}px`;
  const width = `${buttonWidthInput.value}px`;
  const height = `${buttonHeightInput.value}px`;
  const borderRadius = `${buttonBorderRadiusInput.value}px`;
  const color = buttonColorInput.value;
  const bgColor = buttonBgColorInput.value;
  const border = buttonBorderInput.value || "none";
  const shadow = buttonShadowInput.value || "none";
  const text = buttonTextInput.value;

  sampleButton.style.padding = padding;
  sampleButton.style.margin = margin;
  sampleButton.style.width = width;
  sampleButton.style.height = height;
  sampleButton.style.borderRadius = borderRadius;
  sampleButton.style.color = color;
  sampleButton.style.backgroundColor = bgColor;
  sampleButton.style.border = border;
  sampleButton.style.boxShadow = shadow;
  sampleButton.textContent = text;

  htmlCode.textContent = `<button id="sample-button">${text}</button>`;
  cssCode.textContent = `
#sample-button {
    padding: ${padding};
    margin: ${margin};
    width: ${width};
    height: ${height};
    border-radius: ${borderRadius};
    color: ${color};
    background-color: ${bgColor};
    border: ${border};
    box-shadow: ${shadow};
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

updatePreview();
