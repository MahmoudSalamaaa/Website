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
    const updateBackTop = () =>
        backTop.classList.toggle("visible", window.scrollY > 420);

    updateBackTop();
    window.addEventListener("scroll", updateBackTop, { passive: true });

    backTop.addEventListener("click", () =>
        window.scrollTo({ top: 0, behavior: "smooth" })
    );
}

/*
 * Executive Portfolio integrity fixes
 * ------------------------------------
 * 1) Keep the verified Integral Solutions period unchanged:
 *    May 2016 - October 2020.
 *
 * 2) The downloadable Executive Portfolio PDF in this folder predates
 *    the latest web-portfolio content. Hide that CTA so visitors are not
 *    offered an outdated version.
 *
 * 3) The project-specific hashes previously used by the Executive
 *    Portfolio do not exist in portfolio.html. Route those links to the
 *    existing #works section instead of leaving dead anchors.
 */

const outdatedPortfolioPdfButton =
    document.querySelector('[data-event="portfolio_pdf_download"]');

if (outdatedPortfolioPdfButton) {
    outdatedPortfolioPdfButton.remove();
}

document
    .querySelectorAll('a[data-event="case_study_opened"]')
    .forEach((link) => {
        const href = link.getAttribute("href") || "";

        if (href.startsWith("../portfolio.html#")) {
            link.setAttribute("href", "../portfolio.html#works");
            link.setAttribute(
                "aria-label",
                "Open the related projects section in the project archive"
            );
        }
    });
