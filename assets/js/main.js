const HSThemeAppearance = {
    init() {
      var e = localStorage.getItem("hs_theme") || "default";
      document.querySelector("html").classList.contains("dark") ||
        this.setAppearance(e);
    },
    _resetStylesOnLoad() {
      var e = document.createElement("style");
      return (
        (e.innerText = "*{transition: unset !important;}"),
        e.setAttribute("data-hs-appearance-onload-styles", ""),
        document.head.appendChild(e),
        e
      );
    },
    setAppearance(e, t = !0, a = !0) {
      const r = this._resetStylesOnLoad();
      t && localStorage.setItem("hs_theme", e),
        "auto" === e &&
          (e = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "default"),
        document.querySelector("html").classList.remove("dark"),
        document.querySelector("html").classList.remove("default"),
        document.querySelector("html").classList.remove("auto"),
        document
          .querySelector("html")
          .classList.add(this.getOriginalAppearance()),
        setTimeout(() => {
          r.remove();
        }),
        a &&
          window.dispatchEvent(
            new CustomEvent("on-hs-appearance-change", { detail: e })
          );
    },
    getAppearance() {
      let e = this.getOriginalAppearance();
      return (e =
        "auto" === e
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "default"
          : e);
    },
    getOriginalAppearance() {
      return localStorage.getItem("hs_theme") || "default";
    },
  },
  venobox =
    (HSThemeAppearance.init(),
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        "auto" === HSThemeAppearance.getOriginalAppearance() &&
          HSThemeAppearance.setAppearance("auto", !1);
      }),
    window.addEventListener("load", () => {
      var e = document.querySelectorAll("[data-hs-theme-click-value]");
      const a = document.querySelectorAll("[data-hs-theme-switch]");
      e.forEach((e) => {
        e.addEventListener("click", () =>
          HSThemeAppearance.setAppearance(
            e.getAttribute("data-hs-theme-click-value"),
            !0,
            e
          )
        );
      }),
        a.forEach((e) => {
          e.addEventListener("change", (e) => {
            HSThemeAppearance.setAppearance(
              e.target.checked ? "dark" : "default"
            );
          }),
            (e.checked = "dark" === HSThemeAppearance.getAppearance());
        }),
        window.addEventListener("on-hs-appearance-change", (t) => {
          a.forEach((e) => {
            e.checked = "dark" === t.detail;
          });
        });
    }),
    new VenoBox({
      selector: ".project-gallery-link",
      fitView: !1,
      onPostOpen: function () {
        document.querySelector("body").style.overflowY = "hidden";
      },
      onPreClose: function () {
        document.querySelector("body").style.overflowY = "auto";
      },
    })),
  reviewCarousel = new Swiper(".review-carousel", {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: !0,
    navigation: {
      nextEl: ".review-carousel-button-next",
      prevEl: ".review-carousel-button-prev",
    },
    breakpoints: { 1: { slidesPerView: 1 }, 768: { slidesPerView: 2 } },
  }),
  blogCarousel = new Swiper(".blog-carousel", {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: !0,
    navigation: {
      nextEl: ".blog-carousel-button-next",
      prevEl: ".blog-carousel-button-prev",
    },
    breakpoints: { 1: { slidesPerView: 1 }, 768: { slidesPerView: 2 } },
  }),
  form =
    (window.addEventListener("load", () => {
      document.querySelectorAll(".js-clipboard").forEach((c) => {
        const l =
          "false" !==
          HSStaticMethods.getClassProperty(c, "--is-toggle-tooltip");
        new ClipboardJS(c, {
          text: (e) => {
            var t = e.dataset.clipboardText;
            return (
              t ||
              ((t = e.dataset.clipboardTarget),
              "SELECT" === (e = document.querySelector(t)).tagName ||
              "INPUT" === e.tagName ||
              "TEXTAREA" === e.tagName
                ? e.value
                : e.textContent)
            );
          },
        }).on("success", () => {
          const e = c.querySelector(".js-clipboard-default"),
            t = c.querySelector(".js-clipboard-success"),
            a = c.querySelector(".js-clipboard-success-text");
          var r = c.dataset.clipboardSuccessText || "";
          const o = c.closest(".hs-tooltip"),
            s = HSTooltip.getInstance(o, !0);
          let n;
          a && ((n = a.textContent), (a.textContent = r)),
            e && t && ((e.style.display = "none"), (t.style.display = "block")),
            o && l && HSTooltip.show(o),
            o && !l && s.element.popperInstance.update(),
            setTimeout(function () {
              a && n && (a.textContent = n),
                o && l && HSTooltip.hide(o),
                o && !l && s.element.popperInstance.update(),
                e && t && ((t.style.display = ""), (e.style.display = ""));
            }, 800);
        });
      });
    }),
    document.querySelectorAll(".move-with-cursor").forEach((a) => {
      document.addEventListener("mousemove", function (e) {
        var t = e.clientX,
          e = e.clientY;
        (a.style.transition =
          "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"),
          (a.style.transform = `translate(${0.01 * t}px, ${
            0.01 * e
          }px) rotate(${0.01 * (t + e)}deg)`);
      });
    }),
    document.querySelector("#contact-form"));
if (form) {
  const M = form.querySelector(".status");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    e = new FormData(form);
    let t = new XMLHttpRequest();
    t.open("POST", form.action),
      (t.onload = function () {
        200 === t.status
          ? (M.classList.remove("hidden"),
            M.classList.remove("alert-danger"),
            M.classList.add("alert-success"),
            (M.textContent = t.responseText),
            form.reset())
          : (M.classList.remove("hidden"),
            M.classList.remove("alert-success"),
            M.classList.add("alert-danger"),
            "" !== t.responseText
              ? (M.textContent = t.responseText)
              : (M.textContent =
                  "Oops! An error occurred and your message could not be sent.")),
          setTimeout(() => {
            M.classList.add("hidden");
          }, 6e3);
      }),
      t.send(e);
  });
}
