// Beginner-friendly interactions for the portfolio.
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("navigation");

  // Mobile navigation opens and closes with the menu button.
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
      nav.classList.toggle("open", !open);
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
    }));
  }

  // Contact form prepares an email; it does not send to a server.
  const form = document.getElementById("contact-form");
  const note = document.getElementById("form-note");
  if (form) form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    // EDIT HERE if your email address changes.
    const recipient = "adoolz671@gmail.com";
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    if (note) note.textContent = "Your email application should open with the message prepared. Review and send it there.";
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  });

  // These social links remain inactive until real profile URLs are added.
  document.querySelectorAll(".placeholder-link").forEach(link => link.addEventListener("click", event => event.preventDefault()));
});
