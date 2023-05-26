
// hero animation on page load
const texts = document.querySelectorAll(".animated-text");
const sub = document.querySelector(".sub-wrapper");
window.addEventListener("load", showHero);
function showHero() {
  setTimeout(() => {
    texts.forEach(text => text.classList.add("active"));
  }, 800);
  setTimeout(() => {
    sub.classList.add("active");
  }, 2200);
}
// header appears after scroll
const header = document.querySelector("header");
window.addEventListener("scroll", showHeader);
function showHeader() {
  if(window.pageYOffset > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}
// cursor
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;
  cursor.style.transform = `translate(${x - 5}px, ${y - 5}px)`;
  cursor.style.display = "block";
});
// cursor disappear on links
const links = document.querySelectorAll(".hoverable");
links.forEach((link) => {
  link.addEventListener("mousemove", (e) => {
    cursor.classList.add("disabled");
  });
  link.addEventListener("mouseleave", () => {
    cursor.classList.remove("disabled");
  });
});

// to top button appears after scroll down & header sticky on contrast background
const toTopBtn = document.querySelector(".to-top");
window.addEventListener("scroll", showButton);
function showButton() {
  if (window.pageYOffset > 300) {
    toTopBtn.classList.add("active");
  } else {
    toTopBtn.classList.remove("active");
  }
}

// mobile nav toggle
const menuBtn = document.querySelectorAll(".menu-btn");
const mobileNav = document.querySelector(".mobile-nav");
menuBtn.forEach(btn => btn.addEventListener("click", toggleMenu))
function toggleMenu() {
  mobileNav.classList.toggle("active");
}
