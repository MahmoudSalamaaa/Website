document.documentElement.classList.add("js-ready");

const navButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");
const backTop = document.querySelector(".back-top");
const year = document.querySelector("[data-year]");
const progress = document.querySelector(".reading-progress span");
const sectionLinks = Array.from(document.querySelectorAll(".section-nav a"));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (year) year.textContent = new Date().getFullYear();

if (navButton && nav) {
  navButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      navButton.setAttribute("aria-expanded", "false");
    });
  });
}

const updateScrollUI = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollHeight > 0 ? Math.min(1, scrollTop / scrollHeight) : 0;

  if (progress) progress.style.width = `${ratio * 100}%`;
  if (backTop) backTop.classList.toggle("visible", scrollTop > 520);
};

updateScrollUI();
window.addEventListener("scroll", updateScrollUI, { passive: true });

if (backTop) {
  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });
}

if (!reducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
  );

  document.querySelectorAll("[data-reveal]").forEach((el) => revealObserver.observe(el));
} else {
  document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("in-view"));
}

if ("IntersectionObserver" in window && sectionLinks.length) {
  const sections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      sectionLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${visible.target.id}`;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    },
    { threshold: [0.15, 0.35, 0.6], rootMargin: "-120px 0px -55% 0px" }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start"
    });
  });
});
