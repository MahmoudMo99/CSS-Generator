const borderWidthInput = document.getElementById("border-width");
const borderStyleInput = document.getElementById("border-style");
const borderColorInput = document.getElementById("border-color");
const borderRadiusInput = document.getElementById("border-radius");

const sampleDivBorder = document.getElementById("sample-div-border");
const cssCode = document.getElementById("css-code");
const copyCssButton = document.getElementById("copy-css");
const copyHtmlButton = document.getElementById("copy-html");
const htmlCode = document.getElementById("html-code");

const borderWidthValue = document.getElementById("border-width-value");
const borderRadiusValue = document.getElementById("border-radius-value");

borderWidthInput.addEventListener("input", () => {
  borderWidthValue.textContent = borderWidthInput.value;
  updatePreview();
});

borderStyleInput.addEventListener("change", updatePreview);
borderColorInput.addEventListener("input", updatePreview);

borderRadiusInput.addEventListener("input", () => {
  borderRadiusValue.textContent = borderRadiusInput.value;
  updatePreview();
});

function updatePreview() {
  const borderWidth = `${borderWidthInput.value}px`;
  const borderStyle = borderStyleInput.value;
  const borderColor = borderColorInput.value;
  const borderRadius = `${borderRadiusInput.value}px`;

  sampleDivBorder.style.borderWidth = borderWidth;
  sampleDivBorder.style.borderStyle = borderStyle;
  sampleDivBorder.style.borderColor = borderColor;
  sampleDivBorder.style.borderRadius = borderRadius;

  htmlCode.textContent = `
<div id="sample-div-border"></div>`;

  cssCode.textContent = `
#sample-div-border {
    border-width: ${borderWidth};
    border-style: ${borderStyle};
    border-color: ${borderColor};
    border-radius: ${borderRadius};
}`;
}

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Code copied to clipboard!");
    })
    .catch((err) => {
      alert("Failed to copy code!");
      console.error(err);
    });
}

copyHtmlButton.addEventListener("click", () => {
  copyToClipboard(htmlCode.textContent);
});

copyCssButton.addEventListener("click", () => {
  copyToClipboard(cssCode.textContent);
});

updatePreview();
