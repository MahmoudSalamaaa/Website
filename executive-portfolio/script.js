
document.documentElement.classList.add("js-ready");

const nav = document.querySelector(".main-nav");
const navButton = document.querySelector(".menu-button");
const navClose = document.querySelector(".nav-close");
const navBackdrop = document.querySelector(".nav-backdrop");
const backTop = document.querySelector(".back-top");
const progress = document.querySelector(".progress span");
const year = document.querySelector("[data-year]");
const sectionLinks = [...document.querySelectorAll(".section-nav a")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const resetHorizontalScroll = () => {
  document.documentElement.scrollLeft = 0;
  document.body.scrollLeft = 0;
  if (window.scrollX !== 0) window.scrollTo(0, window.scrollY);
};
resetHorizontalScroll();
window.addEventListener("load", () => {
  resetHorizontalScroll();
  setTimeout(resetHorizontalScroll, 60);
});

if (year) year.textContent = new Date().getFullYear();

const setNav = (open) => {
  if (!nav || !navButton) return;
  nav.classList.toggle("open", open);
  navButton.classList.toggle("open", open);
  navButton.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("nav-open", open);
};
if (navButton) navButton.addEventListener("click", () => setNav(!nav.classList.contains("open")));
if (navClose) navClose.addEventListener("click", () => setNav(false));
if (navBackdrop) navBackdrop.addEventListener("click", () => setNav(false));
if (nav) nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setNav(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape") setNav(false); });

const updateScroll = () => {
  const top = window.scrollY || document.documentElement.scrollTop;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = `${max > 0 ? Math.min(100, top / max * 100) : 0}%`;
  if (backTop) backTop.classList.toggle("visible", top > 500);
};
updateScroll();
window.addEventListener("scroll", updateScroll, {passive:true});
if (backTop) backTop.addEventListener("click", () => window.scrollTo({top:0,left:0,behavior:reducedMotion?"auto":"smooth"}));

if (!reducedMotion && "IntersectionObserver" in window) {
  const reveal = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    });
  }, {threshold:.08,rootMargin:"0px 0px -35px 0px"});
  document.querySelectorAll("[data-reveal]").forEach(el => reveal.observe(el));
} else {
  document.querySelectorAll("[data-reveal]").forEach(el => el.classList.add("in-view"));
}

if ("IntersectionObserver" in window && sectionLinks.length) {
  const sections = sectionLinks.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const active = new IntersectionObserver(entries => {
    const visible = entries.filter(e => e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if (!visible) return;
    sectionLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${visible.target.id}`));
  }, {threshold:[.15,.35],rootMargin:"-110px 0px -55% 0px"});
  sections.forEach(s => active.observe(s));
}

document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
  const target = document.querySelector(a.getAttribute("href"));
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({behavior:reducedMotion?"auto":"smooth",block:"start"});
  setTimeout(resetHorizontalScroll, 30);
}));

const themeToggle = document.querySelector(".theme-toggle");
const themeMenu = document.querySelector(".theme-menu");
const themeOptions = [...document.querySelectorAll("[data-theme]")];
const allowed = ["midnight","pearl","emerald","slate"];

const applyTheme = theme => {
  const selected = allowed.includes(theme) ? theme : "midnight";
  if (selected === "midnight") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", selected);
  themeOptions.forEach(o => o.classList.toggle("active", o.dataset.theme === selected));
  try { localStorage.setItem("executive-theme-v6", selected); } catch {}
};
let saved = "midnight";
try { saved = localStorage.getItem("executive-theme-v6") || "midnight"; } catch {}
applyTheme(saved);

if (themeToggle && themeMenu) {
  themeToggle.addEventListener("click", e => {
    e.stopPropagation();
    const open = themeMenu.classList.toggle("open");
    themeToggle.setAttribute("aria-expanded", String(open));
  });
  themeOptions.forEach(o => o.addEventListener("click", () => {
    applyTheme(o.dataset.theme);
    themeMenu.classList.remove("open");
    themeToggle.setAttribute("aria-expanded","false");
  }));
  document.addEventListener("click", e => {
    if (!themeMenu.contains(e.target) && !themeToggle.contains(e.target)) {
      themeMenu.classList.remove("open");
      themeToggle.setAttribute("aria-expanded","false");
    }
  });
}
