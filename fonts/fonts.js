const sidebar = document.querySelector(".sidebar");
const toggleButton = document.querySelector(".toggle-sidebar");

toggleButton.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

const fontFamilySelect = document.getElementById("font-family");
const fontSizeInput = document.getElementById("font-size");
const fontWeightSelect = document.getElementById("font-weight");
const sampleText = document.getElementById("sample-text");
const htmlCode = document.getElementById("html-code");
const cssCode = document.getElementById("css-code");
const currentFontSize = document.getElementById("current-font-size");

const copyHtmlButton = document.getElementById("copy-html");
const copyCssButton = document.getElementById("copy-css");

fontFamilySelect.addEventListener("change", updatePreview);
fontSizeInput.addEventListener("input", updatePreview);
fontWeightSelect.addEventListener("change", updatePreview);

fontSizeInput.addEventListener("input", function () {
  currentFontSize.textContent = fontSizeInput.value;
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
  const fontFamily = fontFamilySelect.value;
  const fontSize = fontSizeInput.value;
  const fontWeight = fontWeightSelect.value;

  sampleText.style.fontFamily = fontFamily;
  sampleText.style.fontSize = `${fontSize}px`;
  sampleText.style.fontWeight = fontWeight;

  htmlCode.textContent = `
<div id="sample-text" class="preview-box">
    This text will change based on the settings you choose.
</div>`;

  cssCode.textContent = `
#sample-text {
    font-family: ${fontFamily};
    font-size: ${fontSize}px;
    font-weight: ${fontWeight};
}`;
}

updatePreview();
