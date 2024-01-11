gsap.registerPlugin(ScrollTrigger);

gsap.config({
  nullTargetWarn: false,
  trialWarn: false,
});

// --- GLOBAL - RELOAD AT THE TOP
$(window).on("beforeunload", function() {
  history.scrollRestoration = "manual";
});

// --- GLOBAL - PAGE LOAD COMPLETE
function loadComplete() {
  $(".c-body").removeClass("no-scroll");
  lenis.start();
}

// --- GLOBAL - NAV DROPDOWN (DESKTOP)
function headerDropdownDesktop() {
  $(".c-dd-link").each(function() {
    let dropdownList = $(this).find(".c-dd-list");
    let tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.8, ease: "power2.inOut" },
    });

    let ddLinkTxt = $(this).find(".c-dd-link_top .t-body-3");

    gsap.set(dropdownList, { display: "flex", visibility: "hidden" });

    tl.to(dropdownList, { autoAlpha: 1, y: 8 });
    tl.to($(this).find(".c-icon.dd-arrow"), { rotation: 180 }, 0);

    $(this).on("click", function() {
      $(".c-dd-link.is-open").not($(this)).click();
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        tl.restart();
      } else {
        tl.reverse();
      }
    });

    $(document).mouseup(function(e) {
      if ($(e.target).closest(".c-dd-link").length === 0) {
        $(".c-dd-link.is-open").click();
      }
    });
  });
}

// --- GLOBAL - NAV DROPDOWN (MOBILE)
function headerDropdownMobile() {
  $(".c-dd-link").each(function() {
    let dropdownList = $(this).find(".c-dd-list");
    let tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.8, ease: "power2.inOut" },
    });

    // let ddLinkTxt = $(this).find(".c-dd-link_top .t-body-3");

    gsap.set(dropdownList, { height: 0 });

    tl.to(dropdownList, { height: "auto", marginTop: 16 });
    tl.to($(this).find(".c-icon.dd-arrow"), { rotation: 180 }, 0);

    $(this).on("click", function() {
      $(".c-dd-link.is-open").not($(this)).click();
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        tl.restart();
      } else {
        tl.reverse();
      }
    });

    $(document).mouseup(function(e) {
      if ($(e.target).closest(".c-dd-link").length === 0) {
        $(".c-dd-link.is-open").click();
      }
    });
  });
}

// --- GLOBAL - MENU MOBILE
function mobileNav() {
  let header = $(".c-header");
  let headerBackground = $(".c-header-bg");
  let navBtn = $(".c-nav-btn");
  let navBar1 = $(".c-nav-icon-bar")[0];
  let navBar2 = $(".c-nav-icon-bar")[1];
  let navBar3 = $(".c-nav-icon-bar")[2];
  let navContent = $(".c-header_center");

  gsap.set(navContent, {
    clipPath: "inset(0% 100% 0% 0%)",
    autoAlpha: 1,
  });

  gsap.set(headerBackground, {
    display: "block",
    clipPath: "inset(0% 100% 0% 0%)",
  });

  let tl = gsap.timeline({
    paused: true,
    defaults: { ease: "expo.inOut", duration: 1.2 },
  });

  tl.to(navContent, { clipPath: "inset(0% 0% 0% 0%)" });
  tl.to(headerBackground, { clipPath: "inset(0% 0% 0% 0%)" }, 0);
  tl.to(navBar1, { y: 5, rotate: -45, backgroundColor: "#EAE7D7" }, 0);
  tl.to(navBar2, { width: 0, backgroundColor: "#EAE7D7" }, 0);
  tl.to(navBar3, { y: -5, rotate: 45, backgroundColor: "#EAE7D7" }, 0);
  tl.to(navBtn, { backgroundColor: "#181616", color: "#EAE7D7" }, 0);

  navBtn.on("click", function() {
    header.toggleClass("is-open");
    if (header.hasClass("is-open")) {
      lenis.stop();
      tl.restart();
    } else {
      lenis.start();
      tl.reverse();
    }
  });
}

// --- GLOBAL - HEADER SCROLL
function headerScroll() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".c-body",
      start: "150 top",
      end: "+=1",
      onEnter: () => {
        tl.play();
        $(".c-header").addClass("scrolled");
      },
      onLeaveBack: () => {
        tl.reverse();
        $(".c-header").removeClass("scrolled");
      },
    },
  });
}

// --- GLOBAL - LINE ANIMATION
function drawLine() {
  // Draw line
  gsap.set("[draw-line]", {
    opacity: 1,
    scaleX: 0,
    transformOrigin: "top left",
  });

  ScrollTrigger.batch("[draw-line]", {
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        scaleX: 1,
        delay: 0.1,
        duration: 2.4,
        ease: "power3.out",
        stagger: 0.1,
        markers: true,
      }),
  });
}

// --- GLOBAL - VERTICAL LINE ANIMATION
function drawVerticalLine() {
  // Draw line
  gsap.set("[draw-vertical-line]", {
    opacity: 1,
    scaleY: 0,
    transformOrigin: "top top",
  });

  ScrollTrigger.batch("[draw-vertical-line]", {
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        scaleY: 1,
        delay: 0.2,
        duration: 3,
        ease: "power3.out",
        stagger: 0.2,
      }),
  });
}

// HOME PAGE - COMBINE HERO TEXT ON MOBILE
let combined = false;

function homeHeroTextMobile() {
  let textElOne = $("[combine-el-1]");
  let textElTwo = $("[combine-el-2]");

  if ($(window).width() <= 991) {
    if (!combined) {
      let combinedText = textElOne.html() + " " + textElTwo.html();
      textElOne.html(combinedText);
      textElTwo.hide();
      combined = true;
    }
  } else {
    if (combined) {
      textElOne.html(textElOne.html().replace(textElTwo.html(), ""));
      textElTwo.show();
      combined = false;
    }
  }
}

$(document).ready(function() {
  homeHeroTextMobile();

  $(window).resize(function() {
    homeHeroTextMobile();
  });
});

/// --- GLOBAL FADE
function fade() {
  gsap.set("[fade]", { opacity: 0, y: "4em" });

  ScrollTrigger.batch("[fade]", {
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: "power3.out",
        stagger: 0.2,
      }),
  });
}

//
////

// --- GLOBAL - TEXT ANIMATION
let splitText;
function runSplit() {
  splitText = new SplitType("[split-text]", {
    types: "words, chars",
  });
}
runSplit();

let windowWidth = $(window).innerWidth();
window.addEventListener("resize", function() {
  if (windowWidth !== $(window).innerWidth()) {
    windowWidth = $(window).innerWidth();
    splitText.revert();
    runSplit();
    gsap.set(".char", { visibility: "visible" });
  }
});

function textAnimation() {
  // ScrollTrigger.batch("[text-animation] .char", {
  //   once: true,
  //   onEnter: (batch) =>
  //     gsap.from(batch, {
  //       yPercent: 80,
  //       stagger: 0.02,
  //       opacity: 0,
  //       duration: 0.4,
  //       ease: "power2.out"
  //     })
  // });

  $("[text-animation]").each(function() {
    let text = $(this);

    ScrollTrigger.create({
      once: true,
      trigger: text,
      onEnter: () => {
        gsap.from(text.find(".char"), {
          yPercent: 60,
          stagger: 0.03,
          opacity: 0,
          duration: 1.4,
          ease: "power2.out",
        });
      },
    });
  });
}

// --- ACCORDION
function accordion() {
  $(".accordion-el").each(function() {
    let tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.8, ease: "power2.inOut" },
    });

    let accordionList = $(this).find("[accordion-list]");
    let accordionIcon = $(this).find(".c-icon");

    tl.to(accordionList, { height: "auto" });
    tl.to(accordionIcon, { rotation: 45 }, 0);

    $(this).on("click", function() {
      $(".accordion-el.is-open").not($(this)).click();
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        tl.restart();
      } else {
        tl.reverse();
      }
    });
  });
}

// --- STRATEGY PAGE - VALUE PANELS
function strategyPanels() {
  let valueSlides = $(".swiper-slide.value");

  valueSlides.each(function(index) {
    $(this).on("click", function() {
      if (!$(this).hasClass("is-active")) {
        valueSlides.removeClass("is-active");
        $(this).addClass("is-active");
        $(".swiper-slide.value-content").removeClass("is-active");
        $(".swiper-slide.value-content").eq(index).addClass("is-active");
      }
    });
  });
}

// --- STRATEGY PAGE - VALUE PANELS MOBILE
function strategyPanelsMobile() {
  $(".c-panel").each(function() {
    let tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.8, ease: "power2.inOut" },
    });

    let panelContent = $(this).find(".c-panel_bt");
    let panelTitle = $(this).find(".t-body-1");
    let panelIcon = $(this).find(".c-value-arrow");

    gsap.set(panelTitle, { opacity: 0.6 });

    tl.to(panelContent, { height: "auto" }, 0);
    tl.to(panelTitle, { opacity: 1 }, 0);
    tl.to(
      panelIcon,
      {
        background: "#181616",
        color: "#EAE7D7",
        borderColor: "rgba(24, 22, 22, 1)",
        duration: 0.3,
      },
      0,
    );

    $(this).on("click", function() {
      $(".c-panel.is-open").not($(this)).click();
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        tl.restart();
      } else {
        tl.reverse();
      }
    });
  });
}

// --- PORTFOLIO PAGE - FILTER ACTIVE STATE
function filterActiveState() {
  $(".c-filter-item").each(function() {
    $(this).on("click", function() {
      $(".c-filter-item").removeClass("is-active");
      $(this).addClass("is-active");
    });
  });
  // $(".c-filter-item").eq(0).click();
}

// --- PORTFOLIO PAGE - FILTER SETTINGS
function filterSettings() {
  ScrollTrigger.create({
    trigger: "[scroll-el]",
    start: "-87 top",
    end: "top top",
    endTrigger: "[scroll-end-trigger]",
    pin: true,
    pinSpacing: false,
  });

  $(".c-filter-item").on("click", function() {
    lenis.scrollTo(".c-scroll-position", { offset: -87 });
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  });

  $(".c-btn.load-more").on("click", function() {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  });
}

function pageLoad() {
  let body = $(".c-body");

  let tl = gsap.timeline({
    defaults: { ease: "power2.out", duration: 1.4 },
  });

  let heroText = $("[hero-text]");
  let dataStagger = parseFloat(heroText.attr("data-stagger")) || 0.022;
  let dataDuration = parseFloat(heroText.attr("data-duration")) || 1;

  gsap.set("[hero-text] .char", { yPercent: 60, opacity: 0 });

  tl.set("[hero-description]", { opacity: 0, y: "3em" });

  tl.to(body, { autoAlpha: 1 });

  tl.to(
    "[hero-text] .char",
    {
      yPercent: 0,
      stagger: dataStagger,
      opacity: 1,
      duration: dataDuration,
    },
    0,
  );

  tl.to(
    "[hero-description]",
    { opacity: 1, y: 0, ease: "power4.out" },
    ">-0.6",
  );

  setTimeout(() => {
    loadComplete();
  }, 300);
}

// --- TEAM PAGE - PARTNERS BIO
function partnersModal() {
  $(".c-partner-item").each(function() {
    let tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.6, ease: "power2.inOut" },
    });

    let modalTrigger = $(this).find(".c-partner-trigger");
    let modal = $(this).find(".c-partner-modal");
    let modalClose = $(this).find(".c-partner-modal-close");
    let modalOverlay = $(this).find(".c-partner-overlay");

    tl.to(modal, { x: "0%" });

    tl.to(modalOverlay, { autoAlpha: 1 }, 0);

    modalTrigger.on("click", function() {
      $(".c-partner-trigger.is-open").not($(this)).click();
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        lenis.stop();
        tl.restart();
      } else {
        lenis.start();
        tl.reverse();
      }
    });

    modalClose.on("click", function() {
      modalTrigger.click();
    });

    modalOverlay.on("click", function() {
      modalTrigger.click();
    });
  });
}

//
////
//////
////
//
let load = document.querySelector("[load]");
let strategyPage = document.querySelector("[strategy-page]");
let portfolioPage = document.querySelector("[portfolio-page]");

// --- INIT
window.addEventListener("DOMContentLoaded", (event) => {
  headerScroll();
  partnersModal();
  if (portfolioPage) {
    $(".c-filter-item.all").prependTo(".c-filter");
    pageLoad();
    filterActiveState();
    $(".c-filter-item.all").click();
  }
});

let mm = gsap.matchMedia();

// --- MATCHMEDIA DESKTOP
mm.add("(min-width: 992px)", () => {
  headerDropdownDesktop();
  drawLine();
  drawVerticalLine();
  fade();
  textAnimation();
  if (portfolioPage) {
    filterSettings();
  }
  if (strategyPage) {
    strategyPanels();
    $(".swiper-slide.value").eq(0).click();
  }
  if (load) {
    pageLoad();
  }
  return () => {
    $(".c-dd-link").unbind();
  };
});

// --- MATCHMEDIA TABLET AND MOBILE
mm.add("(max-width: 991px)", () => {
  gsap.set(".c-btn.contact", { display: "flex" });
  $(".c-btn.contact").appendTo(".c-header-nav");
  accordion();
  mobileNav();
  headerDropdownMobile();
  if (strategyPage) {
    strategyPanelsMobile();
    // $(".c-panel").eq(0).click();
  }
  return () => {
    $(".c-nav-btn, .accordion-el, .c-dd-link, .c-panel").unbind();
    gsap.set("[accordion-list], .c-panel", { clearProps: "all" });
    $(".c-btn.contact").prependTo(".c-header_rt");
  };
});
