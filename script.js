const sidebar = document.querySelector(".sidebar");
const toggleButton = document.querySelector(".toggle-sidebar");

toggleButton.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});
