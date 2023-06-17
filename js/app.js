import projectsData from "./projectsData.js";
let projects = [];
const body = document.body;
const cursor = document.querySelector(".cursor");
const links = document.querySelectorAll(".hoverable");
const header = document.querySelector("header");
const toTopBtn = document.querySelector(".to-top");
const menuBtn = document.querySelectorAll(".menu-btn");
const menuItem = document.querySelectorAll(".mobile-nav li");
const mobileNav = document.querySelector(".mobile-nav");
const heroTexts = document.querySelectorAll(".animated-text");
const heroSub = document.querySelector(".sub-wrapper");
const fadeInTexts = document.querySelectorAll(".fade-in-text");
const entries = document.querySelectorAll(".entry");
const footer = document.querySelector("#contact");
const footerHeight = footer.offsetHeight;
const marquee = document.querySelector(".marquee");

// utils
function addActive(el) {
  el.classList.add("active");
}
function removeActive(el) {
  el.classList.remove("active");
}
function delay(callback, duration) {
  setTimeout(callback, duration);
}
function onScroll(callback, option) {
  if (option === "add") {
    window.addEventListener("scroll", callback);
  } else if (option === "remove") {
    window.removeEventListener("scroll", callback);
  }
}
function scrollDelay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
function observeIntersection(el, callback1, callback2, options) {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (callback2 !== null) {
        if (entry.isIntersecting) {
          callback1(entry.target);
        } else {
          callback2(entry.target);
        }
      } else {
        if (entry.isIntersecting) {
          callback1(entry.target);
        }
      }
    });
  }, options);
  observer.observe(el);
}

// cursor
document.addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;
  cursor.style.transform = `translate(${x - 5}px, ${y - 5}px)`;
  cursor.style.display = "block";
});
links.forEach((link) => {
  link.addEventListener("mousemove", (e) => {
    cursor.classList.add("disabled");
  });
  link.addEventListener("mouseleave", () => {
    cursor.classList.remove("disabled");
  });
});

// header & to top button appears after scrolling
onScroll(() => {
  showElement(header, 100);
  showElement(toTopBtn, 300);
}, "add");
function showElement(el, offset) {
  if (
    window.pageYOffset > offset &&
    window.pageYOffset <= footer.offsetTop - 100
  ) {
    addActive(el);
  } else {
    removeActive(el);
  }
}
entries.forEach((entry) =>
  observeIntersection(entry, addActive, null, { rootMargin: "0% 0% -40% 0%" })
);

// mobile nav toggle
menuBtn.forEach((btn) => btn.addEventListener("click", toggleMenu));
menuItem.forEach((item) => item.addEventListener("click", closeMenu));
function toggleMenu() {
  mobileNav.classList.toggle("active");
  disableScroll();
}
function disableScroll() {
  if (mobileNav.classList.contains("active")) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "auto";
  }
}

function closeMenu() {
  mobileNav.classList.remove("active");
}

// hero text animation on page load
window.addEventListener("load", showHero);
function showHero() {
  heroTexts.forEach((text) => addActive(text));
  addActive(heroSub);
}

// about text animation
fadeInTexts.forEach((text, index) => {
  text.style.setProperty("--i", index);
  observeIntersection(text, addActive, null, { rootMargin: "-40% 0% 0% 0%" });
});

// project list
const projectWrapper = document.querySelector(".project-list-wrapper");
displayProjects();
function displayProjects() {
  projects = projectsData;
  let html = "";
  projects.map((project) => {
    const icon = project.open ? "-" : "+";
    html += `
    <div class="project-item" id="project-${project.id}">
      <h3 class="project-title text-display" id="${project.id}">
        ${project.name}
        <span class="icon">${icon}</span>
      </h3>
      <div class="project-content-wrapper ${project.open ? "open" : ""}">
        <div class="project-video-container">
          <video
            muted
            class="project-video"
            id="video-${project.id}"
          >
            <source src="/assets/videos/${project.video}" type="video/mp4" />
          </video>
          <div class="video-overlay">
            <h2>►</h2>
          </div>
        </div>
        <div class="project-detail">
          <p class="project-description">${project.description}</p>
          <div class="detail-grid">
            <p class="title text-display">key features</p>
            <p class="text-body">${project.features}</p>
          </div>
          <div class="detail-grid">
            <p class="title text-display">tech stack</p>
            <div class="tech-stack-wrapper">
              ${project.techStack.main
                .map((item) => `<div class="tech-item main">${item}</div>`)
                .join("")} 
              ${
                project.techStack.sub
                  ? project.techStack.sub
                      .map((item) => `<div class="tech-item sub">${item}</div>`)
                      .join("")
                  : ""
              }
            </div>
          </div>
          <div class="project-link-wrapper">
            <a
              class="animated-link text-display hoverable"
              href="${project.demo}"
              target="_blank"
            >
              live demo
            </a>
            <a
              class="animated-link text-display hoverable"
              href="${project.code}"
              target="_blank"
            >
              Source code
            </a>
          </div>
          ${project.note ? `<p class="text-body note">${project.note}</p>` : ""}
        </div>
      </div>
    </div>
  `;
  });
  projectWrapper.innerHTML = html;
  const projectTitle = projectWrapper.querySelectorAll(".project-title");
  projectTitle.forEach((title) => {
    title.addEventListener("click", (e) => {
      toggleProjectOpen(parseInt(title.getAttribute("id")), e);
    });
  });
}
const projectItems = projectWrapper.querySelectorAll(".project-item");
projectItems.forEach(
  (item) =>
    observeIntersection(item, addActive, null, {
      rootMargin: "0% 0% 10% 0%",
    }),
  1200
);
const projectVideos = projectWrapper.querySelectorAll(".project-video");
projectVideos.forEach(video => video.addEventListener("mouseover", (e) => {
  e.target.play();
}))
projectVideos.forEach(video => video.addEventListener("mouseout", (e) => {
  e.target.pause();
  e.target.currentTime=0;
}))

function toggleProjectOpen(projectId, e) {
  const project = projects.find((project) => project.id === projectId);
  if (project) {
    project.open = !project.open;
    updateProjectTitle(projectId, project.open);
  }
  if (project.open) {
    let top = e.target.offsetTop;
    delay(async () => {
      for (let i = 0; i <= 1500; i += 60) {
        window.scrollTo({
          top: top - 70,
          behavior: "smooth",
        });
        await scrollDelay(5);
      }
    }, 500);
  }
}
function updateProjectTitle(projectId, isOpen) {
  const projectTitle = projectWrapper.querySelector(
    `.project-title[id="${projectId}"]`
  );
  const icon = projectTitle.querySelector(".icon");
  icon.textContent = isOpen ? "-" : "+";
  projectTitle.nextElementSibling.classList.toggle("open");
}

// footer
let marqueeInterval;
let position = 0;
let spanCount = 0;
observeIntersection(marquee, animateMarquee, stopMarquee, null);
function animateMarquee() {
  const marqueeText = document.querySelector(".marqueeText");
  const marqueeSpan = marqueeText.querySelector("span");
  const marqueeWidth = marqueeSpan.offsetWidth;
  let ratio = window.innerWidth / marqueeWidth;
  const newSpanCount = Math.ceil(ratio);
  if (newSpanCount === Infinity) {
    throw new Error("Ratio is Infinity");
  }
  if (newSpanCount !== spanCount) {
    if (newSpanCount > spanCount) {
      for (let i = spanCount; i < newSpanCount; i++) {
        let text = marqueeSpan.cloneNode(true);
        marqueeText.appendChild(text);
      }
    } else {
      for (let i = spanCount - 1; i >= newSpanCount; i--) {
        marqueeText.removeChild(marqueeText.children[i]);
      }
    }
    spanCount = newSpanCount;
  }
  clearInterval(marqueeInterval);
  marqueeInterval = setInterval(() => {
    position--;
    marqueeText.style.transform = `translate3d(${position}px, 0px, 0px)`;
    if (position < -marqueeWidth) {
      position += marqueeWidth;
    }
  }, 10);
}
function stopMarquee() {
  clearInterval(marqueeInterval);
}
window.addEventListener("resize", function () {
  position = 0;
  animateMarquee();
});

function showFooter() {
  onScroll(handleScroll, "add");
}
function hideFooter() {
  onScroll(handleScroll, "remove");
  footer.style.transform = "translate(0, -35%) translate3d(0px, 0px, 0px)";
}
observeIntersection(footer, showFooter, hideFooter);
function handleScroll() {
  const scrollPosition = window.scrollY || window.pageYOffset;
  const windowHeight = window.innerHeight;
  const footerTopPosition = footer.offsetTop;
  const footerBottomPosition = footerTopPosition + footerHeight;
  const visibleHeight = Math.max(
    0,
    Math.min(windowHeight, footerBottomPosition) -
      Math.max(0, footerTopPosition - scrollPosition)
  );
  const visiblePercentage = (visibleHeight / footerHeight) * 35;

  footer.style.transform = translateY(visiblePercentage);
}

function translateY(percentage) {
  const translateValue = -35 + percentage;
  const translateY = Math.min(0, translateValue);
  return `translate(0, ${translateY}%) translate3d(0px, 0px, 0px)`;
}
