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

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const sliderWrapper = document.querySelector(".slider-wrapper");
const indicators = document.querySelectorAll(".indicator");

function changeSlide() {
  if (currentSlide >= totalSlides) {
    currentSlide = 0;
  } else if (currentSlide < 0) {
    currentSlide = totalSlides - 1;
  }

  sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

  indicators.forEach((indicator) => {
    indicator.classList.remove("active");
  });
  indicators[currentSlide].classList.add("active");
}

nextBtn.addEventListener("click", () => {
  currentSlide++;
  changeSlide();
  resetAutoSlide();
});

prevBtn.addEventListener("click", () => {
  currentSlide--;
  changeSlide();
  resetAutoSlide();
});

indicators.forEach((indicator) => {
  indicator.addEventListener("click", (e) => {
    currentSlide = parseInt(e.target.getAttribute("data-index"));
    changeSlide();
    resetAutoSlide();
  });
});

let autoSlideInterval;

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    currentSlide++;
    changeSlide();
  }, 3000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

changeSlide();
startAutoSlide();

function checkLogin(redirectUrl) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = users.find(
    (user) => user.email === localStorage.getItem("loggedInUser")
  );

  if (!currentUser) {
    window.location.href = "../login/login.html";
  } else {
    window.location.href = redirectUrl;
  }
}
