import projects from "./projectsData.js";

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
function observeIntersection(el, callback1, callback2, options) {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback1(entry.target);
      } else if (callback2) {
        callback2(entry);
      }
    });
  }, options);
  observer.observe(el);
}

// cursor
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;
  cursor.style.transform = `translate(${x - 5}px, ${y - 5}px)`;
  cursor.style.display = "block";
});
const links = document.querySelectorAll(".hoverable");
links.forEach((link) => {
  link.addEventListener("mousemove", (e) => {
    cursor.classList.add("disabled");
  });
  link.addEventListener("mouseleave", () => {
    cursor.classList.remove("disabled");
  });
});

// mobile nav toggle
const menuBtn = document.querySelectorAll(".menu-btn");
const menuItem = document.querySelectorAll(".mobile-nav li");
const mobileNav = document.querySelector(".mobile-nav");
const body = document.body;
menuBtn.forEach((btn) => btn.addEventListener("click", toggleMenu));
menuItem.forEach((item) => item.addEventListener("click", closeMenu));
function toggleMenu() {
  mobileNav.classList.toggle("active");
  if(mobileNav.classList.contains("active")) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "auto";
  }
}
function closeMenu() {
  mobileNav.classList.remove("active");
}

// hero text animation on page load
const texts = document.querySelectorAll(".animated-text");
const sub = document.querySelector(".sub-wrapper");
window.addEventListener("load", showHero);
function showHero() {
  delay(() => {
    texts.forEach((text) => addActive(text));
  }, 800);
  delay(() => {
    addActive(sub);
  }, 2200);
}

// header & to top button appears after scrolling
const header = document.querySelector("header");
const toTopBtn = document.querySelector(".to-top");

onScroll(() => {
  showElement(header, 100);
  showElement(toTopBtn, 300);
}, "add");
function showElement(el, offset) {
  if (window.pageYOffset > offset) {
    addActive(el);
  } else {
    removeActive(el);
  }
}

// footer show and marquee
let marqueeInterval;
const marqueeText = document.querySelector(".marqueeText");
observeIntersection(marqueeText, animateMarquee.bind(marqueeText), stopMarquee, null);

function animateMarquee() {
  const marquee = this;
  const marqueeText = marquee.querySelector("span");
  let position = 0;
  const marqueeWidth = marquee.offsetWidth;
  let ratio = window.innerWidth / marqueeWidth;
  if (ratio === Infinity) {
    throw new Error("Ratio is Infinity");
  }
  for (let i = 0; i < ratio + 1; i++) {
    let text = marqueeText.cloneNode(true);
    marquee.appendChild(text);
  }
  marqueeInterval = setInterval(() => {
    position--;
    marquee.style.transform = `translate3d(${position}px, 0px, 0px)`;
    if (position < -(marqueeWidth + 40)) {
      position += marqueeWidth;
    }
  }, 10);
}
function stopMarquee() {
  clearInterval(marqueeInterval);
}
const footer = document.querySelector("#contact");
const footerHeight = footer.offsetHeight;
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

const fadeInTexts = document.querySelectorAll(".fade-in-text");
const observerOptions = {
  rootMargin: "40% 0% -10% 0%",
  threshold: 0.1,
};
fadeInTexts.forEach((text, index) => {
  delay(() => {
    text.style.setProperty("--i", index);
    observeIntersection(text, addActive, null, observerOptions);
  }, 600 * (index + 1));
});

// project list
const projectContainer = document.querySelector(".project-list-wrapper");
displayProjects();
function displayProjects() {
  let html = "";
  projects.map((project) => {
    const icon = project.open ? "-" : "+";
    html += `
    <div class="project-item" id="project-${project.id}">
      <h3 class="project-title" id="${project.id}">
        ${project.name}
        <span class="icon">${icon}</span>
      </h3>
      <div class="project-content-wrapper ${project.open ? 'open' : ''}">
        <div class="project-video-container">
          <video
            muted
            onmouseover="this.play()"
            onmouseout="this.pause();this.currentTime=0;"
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
              ${project.techStack.main .map((item) => `
              <div class="tech-item main">${item}</div>
              `) .join("")} ${ project.techStack.sub ? project.techStack.sub
              .map((item) => `
              <div class="tech-item sub">${item}</div>
              `) .join("") : "" }
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
          ${project.note ? `
          <p class="text-body note">${project.note}</p>
          ` : ""}
        </div>
      </div>
    </div>
  
  `;
  });
  projectContainer.innerHTML = html;
  const projectTitle = projectContainer.querySelectorAll(".project-title");
  projectTitle.forEach((title) => {
    title.addEventListener("click", (e) => {
      toggleProjectOpen(parseInt(title.getAttribute("id")), e);
    });
  });
}

function toggleProjectOpen(projectId, e) {
  const project = projects.find((project) => project.id === projectId);
  if (project) {
    project.open = !project.open;
    updateProjectTitle(projectId, project.open);
  }
  if (project.open) {
    let top = e.target.offsetTop;
    delay(
      () =>
        window.scroll({
          top: top - 70,
          behavior: "smooth",
          duration: 1500,
        }),
      500
    );
  }
}

function updateProjectTitle(projectId, isOpen) {
  const projectTitle = projectContainer.querySelector(
    `.project-title[id="${projectId}"]`
  );
  const icon = projectTitle.querySelector(".icon");
  icon.textContent = isOpen ? "-" : "+";
  projectTitle.nextElementSibling.classList.toggle("open");
}
