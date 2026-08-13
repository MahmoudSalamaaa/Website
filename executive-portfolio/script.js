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
 * 1) Keep Integral Solutions period:
 *    May 2016 - October 2020.
 *
 * 2) Make the Executive CV button always download the current frozen
 *    "Executive Leadership - Mahmoud Salama.pdf" from Google Drive.
 *
 * 3) Hide the older downloadable Executive Portfolio PDF because its
 *    content predates the latest web-portfolio update.
 *
 * 4) Route project links to the existing #works section instead of
 *    non-existent project-specific hashes.
 */

const executiveCvButton =
    document.querySelector('[data-event="cv_download"]');

if (executiveCvButton) {
    executiveCvButton.removeAttribute("download");
    executiveCvButton.setAttribute(
        "href",
        "https://drive.google.com/uc?export=download&id=17vWy0zIFStLAFg6h0tkmX_z2JYe5TYl1"
    );
    executiveCvButton.setAttribute("target", "_blank");
    executiveCvButton.setAttribute("rel", "noopener noreferrer");
    executiveCvButton.setAttribute(
        "aria-label",
        "Download the latest frozen Executive Leadership CV"
    );
}

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
