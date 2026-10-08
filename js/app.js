(function () {
  "use strict";

  const data = typeof PORTFOLIO_DATA !== "undefined" ? PORTFOLIO_DATA : null;

  if (!data) {
    console.error("PORTFOLIO_DATA is missing. Load js/data.js before app.js.");
    return;
  }

  /* ---------- Helpers ---------- */
  function escapeHtml(str) {
    if (str == null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function hasText(value) {
    return typeof value === "string" && value.trim().length > 0;
  }

  function hideSection(el) {
    if (el) {
      el.classList.add("is-hidden");
      el.setAttribute("aria-hidden", "true");
    }
  }

  function showSection(el) {
    if (el) {
      el.classList.remove("is-hidden");
      el.removeAttribute("aria-hidden");
    }
  }

  function getSectionEl(name) {
    return document.querySelector('[data-section="' + name + '"]');
  }

  /* ---------- Meta ---------- */
  if (data.meta && hasText(data.meta.pageTitle)) {
    document.title = data.meta.pageTitle;
  }
  if (data.meta && hasText(data.meta.themeColor)) {
    let metaTheme = document.querySelector('meta[name="theme-color"]');
    if (!metaTheme) {
      metaTheme = document.createElement("meta");
      metaTheme.name = "theme-color";
      document.head.appendChild(metaTheme);
    }
    metaTheme.content = data.meta.themeColor;
  }

  const profile = data.profile || {};

  /* ---------- Navigation ---------- */
  const navMenu = document.getElementById("nav-menu");
  const navLogo = document.querySelector("[data-nav-logo]");
  const sectionIds = new Set();

  if (navLogo && hasText(profile.name)) {
    navLogo.textContent = profile.name;
  }

  function buildNav() {
    if (!navMenu || !Array.isArray(data.navigation)) return;

    const items = data.navigation.filter(function (item) {
      return item && hasText(item.id) && sectionIds.has(item.id);
    });

    if (items.length === 0) {
      hideSection(document.getElementById("site-header"));
      return;
    }

    navMenu.innerHTML = items
      .map(function (item) {
        return (
          '<li><a class="nav__link" href="#' +
          escapeHtml(item.id) +
          '">' +
          escapeHtml(item.label || item.id) +
          "</a></li>"
        );
      })
      .join("");
  }

  /* ---------- Hero ---------- */
  function renderHero() {
    const el = getSectionEl("hero");
    if (!el) return;

    const show =
      hasText(profile.displayName) ||
      hasText(profile.role) ||
      hasText(profile.tagline) ||
      hasText(profile.status);

    if (!show) {
      hideSection(el);
      return;
    }

    sectionIds.add("hero");
    showSection(el);

    el.innerHTML =
      '<div class="container hero__inner">' +
      (hasText(profile.status)
        ? '<p class="hero__status"><span class="hero__status-dot" aria-hidden="true"></span>' +
          escapeHtml(profile.status) +
          "</p>"
        : "") +
      (hasText(profile.displayName)
        ? "<h1 class=\"hero__name\">" + escapeHtml(profile.displayName) + "</h1>"
        : "") +
      (hasText(profile.role)
        ? '<p class="hero__role">' + escapeHtml(profile.role) + "</p>"
        : "") +
      (hasText(profile.tagline)
        ? '<p class="hero__tagline">' + escapeHtml(profile.tagline) + "</p>"
        : "") +
      '<div class="hero__actions" data-hero-actions></div>' +
      "</div>";
  }

  function updateHeroActions() {
    const container = document.querySelector("[data-hero-actions]");
    if (!container) return;

    const parts = [];
    if (sectionIds.has("projects")) {
      parts.push('<a class="btn btn--primary" href="#projects">View Projects</a>');
    }
    if (sectionIds.has("contact")) {
      parts.push('<a class="btn btn--outline" href="#contact">Contact Me</a>');
    }
    container.innerHTML = parts.join("");
    if (parts.length === 0) {
      container.style.display = "none";
    }
  }

  /* ---------- About ---------- */
  function renderAbout() {
    const el = getSectionEl("about");
    if (!el) return;

    const paragraphs = [];
    if (hasText(profile.bio)) paragraphs.push(profile.bio);
    if (hasText(profile.aboutIntro)) paragraphs.push(profile.aboutIntro);

    if (paragraphs.length === 0) {
      hideSection(el);
      return;
    }

    sectionIds.add("about");
    showSection(el);

    el.innerHTML =
      '<div class="container reveal">' +
      '<p class="section__label">About</p>' +
      '<h2 class="section__title">Introduction</h2>' +
      paragraphs
        .map(function (p) {
          return '<p class="about__text">' + escapeHtml(p) + "</p>";
        })
        .join("") +
      "</div>";
  }

  /* ---------- Skills ---------- */
  function renderSkills() {
    const el = getSectionEl("skills");
    if (!el) return;

    const categories = (data.skills || []).filter(function (cat) {
      return (
        cat &&
        hasText(cat.category) &&
        Array.isArray(cat.items) &&
        cat.items.some(function (s) {
          return hasText(s);
        })
      );
    });

    if (categories.length === 0) {
      hideSection(el);
      return;
    }

    sectionIds.add("skills");
    showSection(el);

    const cards = categories
      .map(function (cat) {
        const tags = cat.items
          .filter(hasText)
          .map(function (skill) {
            return '<span class="skill-tag">' + escapeHtml(skill) + "</span>";
          })
          .join("");

        return (
          '<article class="skill-card reveal">' +
          '<h3 class="skill-card__title">' +
          escapeHtml(cat.category) +
          "</h3>" +
          '<div class="skill-card__tags">' +
          tags +
          "</div></article>"
        );
      })
      .join("");

    el.innerHTML =
      '<div class="container">' +
      '<p class="section__label reveal">Skills</p>' +
      '<h2 class="section__title reveal">What I work with</h2>' +
      '<div class="skills__grid">' +
      cards +
      "</div></div>";
  }

  /* ---------- Projects ---------- */
  function renderProjects() {
    const el = getSectionEl("projects");
    if (!el) return;

    const projects = (data.projects || []).filter(function (p) {
      return p && hasText(p.name);
    });

    if (projects.length === 0) {
      hideSection(el);
      return;
    }

    sectionIds.add("projects");
    showSection(el);

    const cards = projects
      .map(function (project) {
        const tech = (project.technologies || [])
          .filter(hasText)
          .map(function (t) {
            return "<span>" + escapeHtml(t) + "</span>";
          })
          .join("");

        const live =
          hasText(project.liveUrl) && project.liveUrl !== "#"
            ? '<a class="btn btn--primary btn--sm" href="' +
              escapeHtml(project.liveUrl) +
              '" target="_blank" rel="noopener noreferrer">Live Demo</a>'
            : hasText(project.liveUrl)
              ? '<a class="btn btn--primary btn--sm" href="#" aria-disabled="true" title="Add your live URL in data.js">Live Demo</a>'
              : "";

        const source = hasText(project.sourceUrl)
          ? '<a class="btn btn--outline btn--sm" href="' +
            escapeHtml(project.sourceUrl) +
            '" target="_blank" rel="noopener noreferrer">Source Code</a>'
          : "";

        return (
          '<article class="project-card reveal">' +
          "<h3 class=\"project-card__title\">" +
          escapeHtml(project.name) +
          "</h3>" +
          (hasText(project.description)
            ? '<p class="project-card__desc">' + escapeHtml(project.description) + "</p>"
            : "") +
          (tech ? '<div class="project-card__tech">' + tech + "</div>" : "") +
          '<div class="project-card__actions">' +
          live +
          source +
          "</div></article>"
        );
      })
      .join("");

    el.innerHTML =
      '<div class="container">' +
      '<p class="section__label reveal">Projects</p>' +
      '<h2 class="section__title reveal">Selected work</h2>' +
      '<div class="projects__grid">' +
      cards +
      "</div></div>";
  }

  /* ---------- Learning Journey ---------- */
  function renderJourney() {
    const el = getSectionEl("journey");
    if (!el) return;

    const steps = (data.learningJourney || []).filter(function (step) {
      return step && hasText(step.title);
    });

    if (steps.length === 0) {
      hideSection(el);
      return;
    }

    sectionIds.add("journey");
    showSection(el);

    const items = steps
      .map(function (step) {
        return (
          '<li class="journey-item reveal">' +
          '<h3 class="journey-item__title">' +
          escapeHtml(step.title) +
          "</h3>" +
          (hasText(step.description)
            ? '<p class="journey-item__desc">' + escapeHtml(step.description) + "</p>"
            : "") +
          "</li>"
        );
      })
      .join("");

    el.innerHTML =
      '<div class="container">' +
      '<p class="section__label reveal">Learning Journey</p>' +
      '<h2 class="section__title reveal">How I\'m growing</h2>' +
      '<ol class="journey__timeline">' +
      items +
      "</ol></div>";
  }

  /* ---------- Contact ---------- */
  function renderContact() {
    const el = getSectionEl("contact");
    if (!el) return;

    const email = profile.email;
    if (!hasText(email)) {
      hideSection(el);
      return;
    }

    sectionIds.add("contact");
    showSection(el);

    el.innerHTML =
      '<div class="container">' +
      '<p class="section__label reveal">Contact</p>' +
      '<h2 class="section__title reveal">Get in touch</h2>' +
      '<div class="contact__layout">' +
      '<div class="reveal">' +
      '<div class="contact__email-row">' +
      '<a class="contact__email" href="mailto:' +
      escapeHtml(email) +
      '">' +
      escapeHtml(email) +
      "</a>" +
      '<button type="button" class="btn btn--ghost btn--sm" data-copy-email>Copy Email</button>' +
      "</div>" +
      '<p class="contact__note">Have a question or opportunity? Send a message — the form opens your email client with a pre-filled draft.</p>' +
      "</div>" +
      '<form class="contact-form reveal" data-contact-form>' +
      '<div class="form-group">' +
      '<label for="contact-name">Name</label>' +
      '<input type="text" id="contact-name" name="name" autocomplete="name" required />' +
      "</div>" +
      '<div class="form-group">' +
      '<label for="contact-email">Email</label>' +
      '<input type="email" id="contact-email" name="email" autocomplete="email" required />' +
      "</div>" +
      '<div class="form-group">' +
      '<label for="contact-message">Message</label>' +
      '<textarea id="contact-message" name="message" required></textarea>' +
      "</div>" +
      '<button type="submit" class="btn btn--primary">Send</button>' +
      "</form></div></div>";
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    const el = getSectionEl("footer");
    if (!el) return;

    const footer = data.footer || {};
    const credit = hasText(footer.credit) ? footer.credit : "";
    const copy = hasText(footer.copyright) ? footer.copyright : "";

    if (!credit && !copy) {
      hideSection(el);
      return;
    }

    showSection(el);
    el.innerHTML =
      '<div class="container">' +
      (credit ? '<p class="footer__credit">' + escapeHtml(credit) + "</p>" : "") +
      (copy ? '<p class="footer__copy">' + escapeHtml(copy) + "</p>" : "") +
      "</div>";
  }

  /* ---------- Render order ---------- */
  renderAbout();
  renderSkills();
  renderProjects();
  renderJourney();
  renderContact();
  renderFooter();
  renderHero();
  updateHeroActions();
  buildNav();

  /* ---------- Contact: mailto & copy ---------- */
  const contactEmail = profile.email;

  document.addEventListener("click", function (e) {
    const copyBtn = e.target.closest("[data-copy-email]");
    if (copyBtn && hasText(contactEmail)) {
      navigator.clipboard
        .writeText(contactEmail)
        .then(showCopyToast)
        .catch(function () {
          showCopyToast("Could not copy — use the email link instead.");
        });
      return;
    }
  });

  document.addEventListener("submit", function (e) {
    const form = e.target.closest("[data-contact-form]");
    if (!form || !hasText(contactEmail)) return;

    e.preventDefault();
    const name = form.querySelector('[name="name"]').value.trim();
    const from = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    const subject = encodeURIComponent("Portfolio contact from " + name);
    const body = encodeURIComponent(
      "Name: " + name + "\nEmail: " + from + "\n\n" + message
    );
    window.location.href =
      "mailto:" + encodeURIComponent(contactEmail) + "?subject=" + subject + "&body=" + body;
  });

  let toastEl = null;
  function showCopyToast(message) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "copy-toast";
      toastEl.setAttribute("role", "status");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = message || "Email copied to clipboard.";
    toastEl.classList.add("is-show");
    clearTimeout(showCopyToast._t);
    showCopyToast._t = setTimeout(function () {
      toastEl.classList.remove("is-show");
    }, 2500);
  }

  /* ---------- Mobile nav ---------- */
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      menu.classList.toggle("is-open", !open);
    });

    menu.addEventListener("click", function (e) {
      if (e.target.closest(".nav__link")) {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        menu.classList.remove("is-open");
      }
    });
  }

  /* ---------- Header scroll ---------- */
  const header = document.getElementById("site-header");
  function onScrollHeader() {
    if (!header || header.classList.contains("is-hidden")) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Active nav link ---------- */
  const navLinks = function () {
    return document.querySelectorAll(".nav__link");
  };

  const observerSections = Array.from(sectionIds)
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  if (observerSections.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks().forEach(function (link) {
              link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    observerSections.forEach(function (sec) {
      io.observe(sec);
    });
  }

  /* ---------- Scroll reveal ---------- */
  if ("IntersectionObserver" in window) {
    const revealIo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    function observeReveals() {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach(function (el) {
        revealIo.observe(el);
      });
    }
    observeReveals();

    /* Hero content uses CSS animation; reveal for dynamic sections */
    const mutationObserver = new MutationObserver(observeReveals);
    mutationObserver.observe(document.getElementById("main"), {
      childList: true,
      subtree: true,
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
