(() => {
  "use strict";
  const q = (selector, context = document) => context.querySelector(selector);
  const qa = (selector, context = document) => [...context.querySelectorAll(selector)];

  const menuButton = q(".menu-button");
  const nav = q("#site-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("open", !isOpen);
    });
    qa("a", nav).forEach((link) => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }));
  }

  const sections = qa("main section[id]");
  const navLinks = qa("[data-nav]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.toggle("active", link.dataset.nav === entry.target.id));
        }
      });
    }, { rootMargin: "-35% 0px -55%" });
    sections.forEach((section) => observer.observe(section));
  }

  qa("[role=tablist]").forEach((list) => {
    const tabs = qa("[role=tab]", list);
    const activate = (tab) => {
      tabs.forEach((item) => {
        const selected = item === tab;
        item.setAttribute("aria-selected", String(selected));
        item.tabIndex = selected ? 0 : -1;
        document.getElementById(item.getAttribute("aria-controls"))?.classList.toggle("hidden", !selected);
      });
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activate(tab));
      tab.addEventListener("keydown", (event) => {
        let next = index;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = tabs.length - 1;
        else return;
        event.preventDefault();
        tabs[next].focus();
        activate(tabs[next]);
      });
    });
  });

  const dialog = q("#gallery-dialog");
  if (dialog) {
    const image = q("img", dialog);
    const title = q("strong", dialog);
    const tag = q("span", dialog);
    qa(".gallery-item").forEach((button) => button.addEventListener("click", () => {
      image.src = button.dataset.image;
      image.alt = button.dataset.title;
      title.textContent = button.dataset.title;
      tag.textContent = button.dataset.tag;
      dialog.showModal();
    }));
    q(".dialog-close", dialog)?.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  }

  qa("[data-filter]").forEach((button) => button.addEventListener("click", () => {
    qa("[data-filter]").forEach((item) => item.classList.toggle("active", item === button));
    qa(".project-card").forEach((card) => {
      card.hidden = button.dataset.filter !== "all" && card.dataset.category !== button.dataset.filter;
    });
  }));

  const backTop = q(".back-top");
  addEventListener("scroll", () => backTop?.classList.toggle("visible", scrollY > 700), { passive: true });
  backTop?.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
  qa("[data-year]").forEach((item) => { item.textContent = new Date().getFullYear(); });

  // Load Vercel Analytics only when the site is actually running on Vercel.
  if (location.hostname.endsWith("vercel.app")) {
    const script = document.createElement("script");
    script.defer = true;
    script.src = "/_vercel/insights/script.js";
    document.head.appendChild(script);
  }
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  qa("[data-event]").forEach((item) => item.addEventListener("click", () => {
    try { window.va("event", { name: item.dataset.event }); } catch (_) { /* no-op */ }
  }));

  const form = q("#contact-form");
  if (form) {
    q("[name=form_started_at]", form).value = Date.now();
    q("[name=page_url]", form).value = location.href;
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const status = q(".form-status", form);
      const submit = q('button[type="submit"]', form);
      const body = Object.fromEntries(new FormData(form).entries());

      // GitHub Pages cannot execute /api/contact. Open a prepared email instead.
      if (location.hostname.endsWith("github.io")) {
        const subject = encodeURIComponent(body.subject || "Website enquiry");
        const message = encodeURIComponent(
          `Name: ${body.first_name || ""} ${body.last_name || ""}\n` +
          `Email: ${body.email || ""}\nPhone: ${body.phone || ""}\n\n${body.message || ""}`
        );
        status.textContent = "Opening your email application…";
        location.href = `mailto:ma7moud.salamaaa@gmail.com?subject=${subject}&body=${message}`;
        return;
      }

      status.textContent = "Sending…";
      status.className = "form-status";
      submit.disabled = true;
      try {
        const response = await fetch("api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.error || "Failed");
        form.reset();
        status.textContent = "Thank you. Your message has been sent.";
        status.classList.add("success");
        window.va("event", { name: "contact_submitted" });
      } catch (_) {
        status.innerHTML = 'Sending failed. Please email <a href="mailto:ma7moud.salamaaa@gmail.com">ma7moud.salamaaa@gmail.com</a>.';
        status.classList.add("error");
      } finally {
        submit.disabled = false;
      }
    });
  }
})();
