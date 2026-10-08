const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const backToTop = document.getElementById("backToTop");
const year = document.getElementById("year");
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

year.textContent = new Date().getFullYear();

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Navbar + back-to-top
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
  backToTop.classList.toggle("show", window.scrollY > 500);

  const sections = document.querySelectorAll("main section[id]");
  let current = "";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 180) current = section.id;
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Reveal-on-scroll
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Project filters
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !match);
    });
  });
});

// Placeholder links: keep the site from jumping to the top.
document.querySelectorAll(".placeholder-link, .social-placeholder").forEach(link => {
  link.addEventListener("click", event => {
    if (link.getAttribute("href") === "#") {
      event.preventDefault();
      const label = link.dataset.placeholder || link.textContent.trim();
      alert(`Replace this placeholder with your ${label} link.`);
    }
  });
});

// Demo contact form — no email is invented or submitted.
// Connect this to a backend/form service later when an email endpoint is available.
form.addEventListener("submit", event => {
  event.preventDefault();
  formNote.textContent = "Message form is ready. Connect it to your email/backend service to receive submissions.";
  form.reset();
});

// Subtle cursor glow on desktop
const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", event => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});
