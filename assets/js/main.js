/* ============================================================
   معرض أعمال سابرين — الحركات والتفاعلات
   ============================================================ */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toTop = document.querySelector(".to-top");

  /* ---------- الهيدر عند التمرير + زر العودة لأعلى ---------- */
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;

    if (header) {
      if (y > 30) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    }

    if (toTop) {
      if (y > 420) {
        toTop.classList.add("show");
      } else {
        toTop.classList.remove("show");
      }
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- قائمة الموبايل ---------- */
  var navToggle = document.querySelector(".nav-toggle");

  if (navToggle && header) {
    navToggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // إغلاق القائمة بعد اختيار أي رابط
    var navLinks = document.querySelectorAll(".nav a");
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- ظهور العناصر عند التمرير ---------- */
  var revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealItems.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );

    // تأثير تتابع جميل: البطاقات تظهر واحدة تلو الأخرى
    document.querySelectorAll("[data-stagger]").forEach(function (group) {
      var kids = group.querySelectorAll(".reveal");
      kids.forEach(function (card, i) {
        card.style.transitionDelay = i * 90 + "ms";
      });
    });

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  /* ---------- السنة الهجرية الصحيحة في الفوتر (بالأرقام العربية) ---------- */
  var yearEl = document.getElementById("year");

  if (yearEl) {
    var digits = "٠١٢٣٤٥٦٧٨٩";
    var year = String(new Date().getFullYear()).replace(/[0-9]/g, function (d) {
      return digits[+d];
    });
    yearEl.textContent = year;
  }
})();
