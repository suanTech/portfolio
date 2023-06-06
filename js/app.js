import projects from "./projectsData.js";

// hero animation on page load
const texts = document.querySelectorAll(".animated-text");
const sub = document.querySelector(".sub-wrapper");
window.addEventListener("load", showHero);
function showHero() {
  setTimeout(() => {
    texts.forEach((text) => text.classList.add("active"));
  }, 800);
  setTimeout(() => {
    sub.classList.add("active");
  }, 2200);
}

// scroll event
const header = document.querySelector("header");
const toTopBtn = document.querySelector(".to-top");
function onScroll(callback) {
  window.addEventListener("scroll", callback);
}
onScroll(() => {
  showElement(header, 100);
  showElement(toTopBtn, 300);
});
function showElement(el, offset) {
  if (window.pageYOffset > offset) {
    el.classList.add("active");
  } else {
    el.classList.remove("active");
  }
}

const items = document.querySelectorAll(".entry");
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  })
}, {
  rootMargin: "40% 0% -10% 0%",
  threshold: 0.1,
})
let i=0;
items.forEach((item, index) => {
  setTimeout(() => {
    item.style.setProperty("--i", index);
    observer.observe(item);
  }, 1000 * index);
});

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
const mobileNav = document.querySelector(".mobile-nav");
menuBtn.forEach((btn) => btn.addEventListener("click", toggleMenu));
function toggleMenu() {
  mobileNav.classList.toggle("active");
}

// project list
const projectContainer = document.querySelector(".project-list-wrapper");
displayProjects();
function displayProjects() {
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
        onmouseover="this.play()"
        onmouseout="this.pause();this.currentTime=0;"
        class="project-video"
      >
        <source
          src="/assets/videos/${project.video}"
          type="video/mp4"
        />
      </video>
      <div class="video-overlay">
        <h2>►</h2>
      </div>
    </div>
        <div class="project-detail">
          <p class="project-description">
            ${project.description}
          </p>
          <div class="detail-grid">
            <p class="title text-display">key features</p>
            <p class="text-body">
              ${project.features}
            </p>
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
        <p class="text-body note">${project.note && project.note}</p>
        
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
      console.log(projects);
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
    setTimeout(
      () =>
        window.scroll({
          top: top - 50,
          behavior: "smooth",
          duration: 1000,
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
