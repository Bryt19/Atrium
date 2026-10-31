const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation",
  );
  menuToggle.textContent = isOpen ? "×" : "☰";
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim();
  const subject = encodeURIComponent(`Project enquiry — ${service}`);
  const body = encodeURIComponent(
    `Hello Atrium Edifice,\n\nMy name is ${name}.\nEmail: ${email}\nService: ${service}\n\nProject details:\n${message}\n\nKind regards,\n${name}`,
  );
  document.getElementById("formStatus").textContent =
    "Opening your email app with the enquiry prepared…";
  window.location.href = `mailto:atriumedifice.arc@gmail.com?subject=${subject}&body=${body}`;
});

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (!reduceMotion && "IntersectionObserver" in window) {
  const revealTargets = document.querySelectorAll(
    ".intro-grid, .section-heading, .service-card, .work-card, .about-visual, .about-copy, .process-grid > div, .contact-intro, .contact-form",
  );
  const revealCounts = new Map();
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
  );

  document.body.classList.add("motion-ready");
  revealTargets.forEach((element) => {
    const parent = element.parentElement;
    const siblingIndex = revealCounts.get(parent) || 0;
    revealCounts.set(parent, siblingIndex + 1);
    element.style.setProperty("--reveal-delay", `${(siblingIndex % 3) * 90}ms`);
    element.classList.add("reveal");
    revealObserver.observe(element);
  });
}
