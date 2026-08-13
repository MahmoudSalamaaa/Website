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
  const navBackdrop = document.querySelector(".nav-backdrop");
  const navClose = document.querySelector(".nav-close");
  const setNav = (open) => {
    nav.classList.toggle("open", open);
    document.body.classList.toggle("nav-open", open);
    navButton.setAttribute("aria-expanded", String(open));
  };
  navButton.addEventListener("click", () => setNav(!nav.classList.contains("open")));
  if (navClose) navClose.addEventListener("click", () => setNav(false));
  if (navBackdrop) navBackdrop.addEventListener("click", () => setNav(false));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setNav(false)));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") setNav(false); });
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

// Creative navigation shell
const navClose = document.querySelector(".nav-close");
const navBackdrop = document.querySelector(".nav-backdrop");

const setNavState = (open) => {
  if (!nav || !navButton) return;
  nav.classList.toggle("open", open);
  navButton.classList.toggle("open", open);
  navButton.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("nav-open", open);
};

if (navButton && nav) {
  navButton.addEventListener("click", () => setNavState(!nav.classList.contains("open")));
}
if (navClose) navClose.addEventListener("click", () => setNavState(false));
if (navBackdrop) navBackdrop.addEventListener("click", () => setNavState(false));
if (nav) nav.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener("click", () => setNavState(false)));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setNavState(false);
});

// Soft magnetic hover on capable pointers
if (window.matchMedia("(pointer:fine)").matches) {
  document.querySelectorAll(".magnetic").forEach((el) => {
    el.addEventListener("mousemove", (event) => {
      const r = el.getBoundingClientRect();
      const x = (event.clientX - r.left - r.width / 2) * .08;
      const y = (event.clientY - r.top - r.height / 2) * .08;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
}
