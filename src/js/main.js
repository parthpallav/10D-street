(function () {
  function resizeTestimonialSVGs() {
    // Desktop horizontal SVGs (viewBox 0 0 1332 H, card body starts at y=141)
    document.querySelectorAll(".testimonials__svg").forEach(function (svg) {
      if (getComputedStyle(svg).display === "none") return;
      var fo = svg.querySelector(".testimonials__fo");
      var inner = fo ? fo.querySelector(".testimonials__text") : null;
      if (!fo || !inner) return;
      var svgW = svg.getBoundingClientRect().width;
      if (!svgW) return;
      var scale = svgW / 1332;
      // scrollHeight is in screen px — convert to SVG units
      var contentH = inner.scrollHeight / scale;
      var totalH = 141.287 + contentH + 40;
      svg.setAttribute("viewBox", "0 0 1332 " + Math.ceil(totalH));
      fo.setAttribute("height", Math.ceil(contentH + 40));
    });

    // Mobile vertical SVGs (viewBox 0 0 1332 H, card body starts at y=289)
    document.querySelectorAll(".testimonials__svg--mobile").forEach(function (svg) {
      if (getComputedStyle(svg).display === "none") return;
      var fo = svg.querySelector(".testimonials__fo--mobile");
      var inner = fo ? fo.querySelector(".testimonials__text") : null;
      if (!fo || !inner) return;
      var svgW = svg.getBoundingClientRect().width;
      if (!svgW) return;
      var scale = svgW / 1332;

      // Force foreignObject width to match rendered SVG width in SVG units
      // so text wraps correctly before we measure
      fo.setAttribute("width", "1280");

      // scrollHeight on foreignObject content is in screen px
      // divide by scale to get SVG coordinate units
      var contentH = inner.scrollHeight / scale;
      var bodyStart = 300;
      var bottomPad = 80;
      var totalH = bodyStart + contentH + bottomPad;
      svg.setAttribute("viewBox", "0 0 1332 " + Math.ceil(totalH));
      fo.setAttribute("height", Math.ceil(contentH + bottomPad));
    });
  }

  // Run once fonts/images loaded, then on resize
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      resizeTestimonialSVGs();
      // Re-run after fonts settle
      setTimeout(resizeTestimonialSVGs, 300);
    });
  } else {
    resizeTestimonialSVGs();
    setTimeout(resizeTestimonialSVGs, 300);
  }
  window.addEventListener("resize", resizeTestimonialSVGs);

  var form = document.getElementById("enquiry-form");

  function validate(input) {
    var val = input.value.trim();
    var name = input.name;
    if (name === "entry.647396849") return val.length >= 2;
    if (name === "entry.1797966816") return /^[6-9]\d{9}$/.test(val.replace(/\s/g, ""));
    if (name === "entry.1994423621") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    if (name === "entry.2074526369") return val.length >= 2;
    return true;
  }

  function showError(input, show) {
    var wrap = input.closest(".field-wrap");
    if (!wrap) return;
    wrap.classList.toggle("has-error", show);
  }

  ["entry.647396849", "entry.1797966816", "entry.1994423621", "entry.2074526369"].forEach(function (name) {
    var input = form.querySelector('[name="' + name + '"]');
    if (!input) return;
    input.addEventListener("blur", function () {
      showError(input, !validate(input));
    });
    input.addEventListener("input", function () {
      if (input.closest(".field-wrap").classList.contains("has-error")) {
        showError(input, !validate(input));
      }
    });
  });

  form.addEventListener("submit", function (e) {
    var requiredNames = ["entry.647396849", "entry.1797966816", "entry.1994423621", "entry.2074526369"];
    var valid = true;
    requiredNames.forEach(function (name) {
      var input = form.querySelector('[name="' + name + '"]');
      if (!input) return;
      var ok = validate(input);
      showError(input, !ok);
      if (!ok) valid = false;
    });
    if (!valid) {
      e.preventDefault();
      form.querySelector(".has-error input, .has-error textarea").focus();
      return;
    }
    setTimeout(function () {
      window.location.href = "thank-you.html";
    }, 500);
  });
})();
