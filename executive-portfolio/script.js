const navButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");
const backTop = document.querySelector(".back-top");
const year = document.querySelector("[data-year]");

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

if (backTop) {
    const updateBackTop = () => backTop.classList.toggle("visible", window.scrollY > 420);
    updateBackTop();
    window.addEventListener("scroll", updateBackTop, { passive: true });
    backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}
