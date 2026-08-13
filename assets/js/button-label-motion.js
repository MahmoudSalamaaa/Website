(function () {
  "use strict";

  function initializeButton(button) {
    if (!button || button.dataset.labelMotionReady === "true") return;
    if (!button.querySelector(".first_text") || !button.querySelector(".second_text")) return;

    button.dataset.labelMotionReady = "true";
    let timer = 0;

    function setPressed(pressed) {
      window.clearTimeout(timer);
      button.classList.toggle("is-pressed", Boolean(pressed));
    }

    function release(delay) {
      window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        button.classList.remove("is-pressed");
      }, Number.isFinite(delay) ? delay : 140);
    }

    button.addEventListener("pointerdown", function () {
      setPressed(true);
    }, { passive: true });

    button.addEventListener("pointerup", function () {
      release(180);
    }, { passive: true });

    button.addEventListener("pointercancel", function () {
      release(0);
    }, { passive: true });

    button.addEventListener("lostpointercapture", function () {
      release(0);
    });

    button.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") setPressed(true);
    });

    button.addEventListener("keyup", function (event) {
      if (event.key === "Enter" || event.key === " ") release(180);
    });

    button.addEventListener("blur", function () {
      release(0);
    });

    /* A delayed cleanup prevents mobile browsers from retaining a pressed state. */
    button.addEventListener("click", function () {
      setPressed(true);
      release(220);
    });
  }

  function initializeAllButtons(root) {
    (root || document).querySelectorAll(".portfolio_btn").forEach(initializeButton);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initializeAllButtons(document);
    }, { once: true });
  } else {
    initializeAllButtons(document);
  }
})();
