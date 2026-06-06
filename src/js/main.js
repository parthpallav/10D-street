(function () {
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
      form.hidden = true;
      var success = document.querySelector(".form-success");
      success.hidden = false;
      setTimeout(function () {
        success.hidden = true;
        form.reset();
        form.querySelectorAll(".has-error").forEach(function (el) {
          el.classList.remove("has-error");
        });
        form.hidden = false;
      }, 4000);
    }, 500);
  });
})();
