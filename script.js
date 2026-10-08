const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

// remove menu mobile
const navLink = document.querySelectorAll(".nav-link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));

// qualifi
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification-active");
    });
    target.classList.add("qualification-active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification-active");
    });

    tab.classList.add("qualification-active");
  });
});

// services box
const boxViews = document.querySelectorAll(".services-box"),
  boxBtns = document.querySelectorAll(".services-button"),
  boxCloses = document.querySelectorAll(".services-box-close");

let box = function (boxClick) {
  boxViews[boxClick].classList.add("active-box");
};

boxBtns.forEach((boxBtn, i) => {
  boxBtn.addEventListener("click", () => {
    box(i);
  });
});

boxCloses.forEach((boxClose) => {
  boxClose.addEventListener("click", () => {
    boxViews.forEach((boxView) => {
      boxView.classList.remove("active-box");
    });
  });
});

//scroll section active link
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

// change bg header
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 200) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL TOP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

//dark light mode------------------
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "fa-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "fa-moon" : "fa-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "fa-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

//swiper (testimonials only; the project slider was replaced by the video gallery)
let swiperTestimonial = new Swiper(".testimonial-container", {
  cssMode: true,
  loop: true,
  spaceBetween: 48,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    568: {
      slidesPerView: 2,
    },
  },
});

// ==================== VIDEO WORK GALLERY ====================
const workGrid = document.getElementById("workGrid");
const workModal = document.getElementById("workModal");
const workPlayer = document.getElementById("workPlayer");
const workCaption = document.getElementById("workCaption");
const workClose = document.getElementById("workClose");
const canHover = window.matchMedia("(hover: hover)").matches;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let lastOpener = null;

// filters
document.querySelectorAll(".work-filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".work-filter").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    document.querySelectorAll(".work-card").forEach((card) => {
      card.hidden = !(f === "all" || card.dataset.cat === f);
    });
  });
});

// hover preview (desktop only, skipped if reduced motion)
if (canHover && !reduceMotion) {
  document.querySelectorAll(".work-card").forEach((card) => {
    const v = card.querySelector(".work-thumb");
    card.addEventListener("mouseenter", () => {
      if (!v.getAttribute("src")) v.src = v.dataset.preview;
      v.play().catch(() => {});
    });
    card.addEventListener("mouseleave", () => {
      v.pause();
      v.currentTime = 0;
    });
  });
}

// lightbox player
function openWork(btn) {
  lastOpener = btn;
  workPlayer.src = btn.dataset.video;
  workPlayer.style.aspectRatio = btn.dataset.ar;
  workCaption.textContent = btn.dataset.title;
  workModal.hidden = false;
  document.body.style.overflow = "hidden";
  workPlayer.play().catch(() => {});
  workClose.focus();
}

function closeWork() {
  workPlayer.pause();
  workPlayer.removeAttribute("src");
  workPlayer.load();
  workModal.hidden = true;
  document.body.style.overflow = "";
  if (lastOpener) lastOpener.focus();
}

document.querySelectorAll(".work-open").forEach((btn) => {
  btn.addEventListener("click", () => openWork(btn));
});
workClose.addEventListener("click", closeWork);
workModal.addEventListener("click", (e) => {
  if (e.target === workModal) closeWork();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !workModal.hidden) closeWork();
});