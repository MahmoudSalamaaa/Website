document.documentElement.classList.add("js-ready");

const navButton = document.querySelector(".menu-button");
const nav = document.querySelector(".main-nav");
const backTop = document.querySelector(".back-top");
const progress = document.querySelector(".progress span");
const year = document.querySelector("[data-year]");
const sectionLinks = Array.from(document.querySelectorAll(".section-nav a"));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (year) year.textContent = new Date().getFullYear();

if (navButton && nav) {
  navButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navButton.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
    nav.classList.remove("open");
    navButton.setAttribute("aria-expanded", "false");
  }));
}

const updateScrollUI = () => {
  const top = window.scrollY || document.documentElement.scrollTop;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = `${max > 0 ? Math.min(100, top / max * 100) : 0}%`;
  if (backTop) backTop.classList.toggle("visible", top > 600);
};
updateScrollUI();
window.addEventListener("scroll", updateScrollUI, { passive: true });

if (backTop) backTop.addEventListener("click", () => window.scrollTo({
  top: 0,
  behavior: reducedMotion ? "auto" : "smooth"
}));

if (!reducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    });
  }, { threshold: .10, rootMargin: "0px 0px -45px 0px" });
  document.querySelectorAll("[data-reveal]").forEach((el) => revealObserver.observe(el));
} else {
  document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("in-view"));
}

if ("IntersectionObserver" in window && sectionLinks.length) {
  const sections = sectionLinks.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const activeObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((e) => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    sectionLinks.forEach((a) => {
      const active = a.getAttribute("href") === `#${visible.target.id}`;
      a.classList.toggle("active", active);
      if (active) a.setAttribute("aria-current","true"); else a.removeAttribute("aria-current");
    });
  }, { threshold:[.15,.35,.6], rootMargin:"-120px 0px -55% 0px" });
  sections.forEach((s) => activeObserver.observe(s));
}

document.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener("click", (event) => {
  const target = document.querySelector(a.getAttribute("href"));
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block:"start" });
}));

// Accessible, persistent theme switcher
const themeToggle = document.querySelector(".theme-toggle");
const themeMenu = document.querySelector(".theme-menu");
const themeOptions = Array.from(document.querySelectorAll("[data-theme]"));
const allowedThemes = ["midnight","pearl","emerald","slate"];

const applyTheme = (theme) => {
  const selected = allowedThemes.includes(theme) ? theme : "midnight";
  if (selected === "midnight") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", selected);
  themeOptions.forEach((option) => {
    const active = option.dataset.theme === selected;
    option.classList.toggle("active", active);
    option.setAttribute("aria-pressed", String(active));
  });
  try { localStorage.setItem("executive-portfolio-theme", selected); } catch (_) {}
};

let savedTheme = "midnight";
try { savedTheme = localStorage.getItem("executive-portfolio-theme") || "midnight"; } catch (_) {}
applyTheme(savedTheme);

if (themeToggle && themeMenu) {
  themeToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = themeMenu.classList.toggle("open");
    themeToggle.setAttribute("aria-expanded", String(open));
  });
  themeOptions.forEach((option) => option.addEventListener("click", () => {
    applyTheme(option.dataset.theme);
    themeMenu.classList.remove("open");
    themeToggle.setAttribute("aria-expanded","false");
  }));
  document.addEventListener("click", (event) => {
    if (!themeMenu.contains(event.target) && !themeToggle.contains(event.target)) {
      themeMenu.classList.remove("open");
      themeToggle.setAttribute("aria-expanded","false");
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      themeMenu.classList.remove("open");
      themeToggle.setAttribute("aria-expanded","false");
    }
  });
}