
document.documentElement.classList.add("js-ready");

const nav = document.querySelector(".main-nav");
const navButton = document.querySelector(".menu-button");
const navClose = document.querySelector(".nav-close");
const navBackdrop = document.querySelector(".nav-backdrop");
const backTop = document.querySelector(".back-top");
const progress = document.querySelector(".progress span");
const year = document.querySelector("[data-year]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (year) year.textContent = new Date().getFullYear();

const setNav = (open) => {
  if (!nav || !navButton) return;
  nav.classList.toggle("open", open);
  navButton.classList.toggle("open", open);
  navButton.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("nav-open", open);
};

if (navButton) {
  navButton.addEventListener("click", () => {
    setNav(!nav.classList.contains("open"));
  });
}
if (navClose) navClose.addEventListener("click", () => setNav(false));
if (navBackdrop) navBackdrop.addEventListener("click", () => setNav(false));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setNav(false);
});

/* Reliable menu navigation: close drawer first, then scroll to the section. */
document.querySelectorAll('.main-nav a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const selector = link.getAttribute("href");
    const target = selector ? document.querySelector(selector) : null;
    if (!target) return;

    setNav(false);

    window.setTimeout(() => {
      target.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start"
      });

      try {
        history.replaceState(null, "", selector);
      } catch (_) {}
    }, 70);
  });
});

/* Sticky section navigation. */
document.querySelectorAll('.section-nav a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const selector = link.getAttribute("href");
    const target = selector ? document.querySelector(selector) : null;
    if (!target) return;

    target.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start"
    });

    try {
      history.replaceState(null, "", selector);
    } catch (_) {}
  });
});

const updateScroll = () => {
  const top = window.scrollY || document.documentElement.scrollTop;
  const max = document.documentElement.scrollHeight - window.innerHeight;

  if (progress) {
    progress.style.width = `${max > 0 ? Math.min(100, (top / max) * 100) : 0}%`;
  }
  if (backTop) {
    backTop.classList.toggle("visible", top > 500);
  }
};

updateScroll();
window.addEventListener("scroll", updateScroll, { passive: true });

if (backTop) {
  backTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: reducedMotion ? "auto" : "smooth"
    });
  });
}

/* Reveal animation */
if (!reducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -35px 0px" }
  );

  document.querySelectorAll("[data-reveal]").forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  document.querySelectorAll("[data-reveal]").forEach((element) => {
    element.classList.add("in-view");
  });
}

/* Active section state */
const sectionNavLinks = [...document.querySelectorAll('.section-nav a[href^="#"]')];
if ("IntersectionObserver" in window && sectionNavLinks.length) {
  const observedSections = sectionNavLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const current = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!current) return;

      sectionNavLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${current.target.id}`
        );
      });
    },
    { threshold: [0.15, 0.35], rootMargin: "-110px 0px -55% 0px" }
  );

  observedSections.forEach((section) => sectionObserver.observe(section));
}

/* Theme switcher */
const themeToggle = document.querySelector(".theme-toggle");
const themeMenu = document.querySelector(".theme-menu");
const themeOptions = [...document.querySelectorAll("[data-theme]")];
const allowedThemes = ["midnight", "pearl", "emerald", "slate"];

const applyTheme = (theme) => {
  const selected = allowedThemes.includes(theme) ? theme : "midnight";

  if (selected === "midnight") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", selected);
  }

  themeOptions.forEach((option) => {
    option.classList.toggle("active", option.dataset.theme === selected);
  });

  try {
    localStorage.setItem("executive-theme-v8", selected);
  } catch (_) {}
};

let savedTheme = "midnight";
try {
  savedTheme = localStorage.getItem("executive-theme-v8") || "midnight";
} catch (_) {}

applyTheme(savedTheme);

if (themeToggle && themeMenu) {
  themeToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = themeMenu.classList.toggle("open");
    themeToggle.setAttribute("aria-expanded", String(open));
  });

  themeOptions.forEach((option) => {
    option.addEventListener("click", () => {
      applyTheme(option.dataset.theme);
      themeMenu.classList.remove("open");
      themeToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (!themeMenu.contains(event.target) && !themeToggle.contains(event.target)) {
      themeMenu.classList.remove("open");
      themeToggle.setAttribute("aria-expanded", "false");
    }
  });
}
