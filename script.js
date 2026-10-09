// ===== Personalize your portfolio here =====
// Replace the example project links and image filenames with your own details.
const projects = [
  {
    number: "01",
    title: "Personal Portfolio",
    description: "A personal website to introduce myself, share my skills, and showcase the projects I build.",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "assets/images/project-1.png",
    symbol: "</>",
    github: "https://github.com/",
    demo: "#"
  },
  {
    number: "02",
    title: "Responsive Landing Page",
    description: "A clean, responsive landing page concept built to practice layouts, visual hierarchy, and mobile design.",
    technologies: ["HTML", "CSS"],
    image: "assets/images/project-2.png",
    symbol: "✦",
    github: "https://github.com/",
    demo: "#"
  },
  {
    number: "03",
    title: "Student Management UI",
    description: "A sample student dashboard interface concept for practicing tables, forms, and organized information.",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "assets/images/project-3.png",
    symbol: "▦",
    github: "https://github.com/",
    demo: "#"
  }
];

const projectsGrid = document.getElementById("projectsGrid");
projectsGrid.innerHTML = projects.map((project) => `
  <article class="project-card reveal">
    <div class="project-art">
      <span class="project-art-symbol" aria-hidden="true">${project.symbol}</span>
      <img src="${project.image}" alt="${project.title} screenshot" loading="lazy"
        onload="this.style.display='block'; this.previousElementSibling.style.display='none';"
        onerror="this.style.display='none';">
    </div>
    <div class="project-body">
      <span class="project-index">PROJECT ${project.number}</span>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="tech-list">${project.technologies.map(tech => `<span>${tech}</span>`).join("")}</div>
      <div class="project-links">
        <a href="${project.github}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        <a href="${project.demo}" ${project.demo.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""}>Live demo ↗</a>
      </div>
    </div>
  </article>
`).join("");

// Profile and About images: show placeholders if files have not been added yet.
function setImageFallback(imageId, placeholderId) {
  const image = document.getElementById(imageId);
  const placeholder = document.getElementById(placeholderId);
  if (!image || !placeholder) return;
  image.addEventListener("load", () => {
    image.style.display = "block";
    placeholder.style.display = "none";
  });
  image.addEventListener("error", () => {
    image.style.display = "none";
    placeholder.style.display = "flex";
  });
  if (image.complete && image.naturalWidth > 0) {
    image.style.display = "block";
    placeholder.style.display = "none";
  } else {
    image.style.display = "none";
    placeholder.style.display = "flex";
  }
}
setImageFallback("profileImage", "profilePlaceholder");
setImageFallback("aboutImage", "aboutPlaceholder");

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Rotating role text
const roles = ["A/L ICT Student", "Aspiring Web Developer", "Future Software Developer"];
const roleText = document.getElementById("roleText");
let roleIndex = 0;
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleText.style.opacity = "0";
    setTimeout(() => {
      roleText.textContent = roles[roleIndex];
      roleText.style.opacity = "1";
    }, 180);
  }, 2600);
}

// Reveal elements when they enter the viewport
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

// Active navigation highlighting and back-to-top
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-link");
const backToTop = document.getElementById("backToTop");
function updateScrollUI() {
  let current = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 160) current = section.id;
  });
  navAnchors.forEach(anchor => anchor.classList.toggle("active", anchor.getAttribute("href") === `#${current}`));
  backToTop.classList.toggle("visible", window.scrollY > 500);
}
window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Contact form prepares an email in the user's email application.
// A real server/email provider is required to send messages directly from a website.
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
contactForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const formData = new FormData(contactForm);
  const name = formData.get("name").toString().trim();
  const senderEmail = formData.get("email").toString().trim();
  const subject = formData.get("subject").toString().trim();
  const message = formData.get("message").toString().trim();
  const body = `Name: ${name}\nReply email: ${senderEmail}\n\n${message}`;
  const mailto = `mailto:abdhulrxhmaan675@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  formNote.textContent = "Opening your email app with the message prepared. Please review and send it there.";
  window.location.href = mailto;
});

// Current year
document.getElementById("year").textContent = new Date().getFullYear();
