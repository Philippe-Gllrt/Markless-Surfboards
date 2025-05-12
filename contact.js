import {
  setNavBarMenu,
  sectBarCodeMovement,
  updateClock,
  setFooterScrollTop,
  setPageTransition,
  setLenis,
  setLinkHover,
  setFooterAppear,
  scrollToTopInstant,
  scrollToTop,
  disableScroll,
  enableScroll,
  setParallax,
  setButtonHover,
  setButtonAppear,
  setPatchAppear
} from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);
});

const SplitType = window.SplitType;
let typeSplit = new SplitType("[text-split]", {
  types: "words, chars",
  tagName: "span",
});

window.addEventListener("load", () => {
  if ($(window).width() > 991) {
    setContactButtonHover();
    sectBarCodeMovement();
    setContactHover();
    setButtonAppear();
    setLinkHover();
    lineAppear();
    setPatchAppear()
  }
  
  setLenis();
  setPageTransition();
  setInterval(updateClock, 1000);
  updateClock();
  setNavBarMenu();
  setFooterScrollTop();
  
});

const lenis = new Lenis({
  // Value between 0 and 1, smaller more fluid
  lerp: 0.05,
  wheelMultiplier: 1,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

function setContactHover() {
  const $contactPage = $(".contact-contact_section");
  const $processCursor = $(".contact-contact_cursor");
  const $horizontal = $processCursor.find(".horizontal");
  const $vertical = $processCursor.find(".vertical");

  gsap.set($vertical, {opacity: 0});
  gsap.set($horizontal, {opacity: 0});

  $contactPage.on("mouseenter", () => {
    gsap.to([$horizontal, $vertical], { opacity: 1, duration: .2 });
  });

  $contactPage.on("mouseleave", () => {
    gsap.to([$horizontal, $vertical], { opacity: 0, duration: .2 });
  });

  $contactPage.on("mousemove", function (e) {
    const offset = $processCursor.offset();
    const width = $processCursor.outerWidth();
    const height = $processCursor.outerHeight();

    const x = e.pageX - offset.left;
    const y = e.pageY - offset.top;

    gsap.to($horizontal, {
      duration: 0.2,
      attr: { y1: y, y2: y},
      ease: "power2.out",
    });

    gsap.to($vertical, {
      duration: 0.2,
      attr: { x1: x, x2: x },
      ease: "power2.out",
    });
    ////////////////////////////////////////////////////////

    var clientx = e.clientX;
    var clienty = e.clientY;

    var elements = document.elementsFromPoint(clientx, clienty);

    var filteredElements = elements.filter(function(element) {
      // Vérifie si l'attribut 'shrink-line' est présent sur l'élément
      return $(element).attr('shrink-line') !== undefined;
    });

    if (filteredElements.length > 0) {
      let $cell = $(filteredElements[0]);
      const cellOffset = $cell.offset(); // Position de la cellule dans le document
      const cellWidth = $cell.outerWidth(); // Largeur de la cellule
      const cellHeight = $cell.outerHeight(); // Hauteur de la cellule
  
      const cellX1 = cellOffset.left; // X du côté gauche
      const cellX2 = cellX1 + cellWidth; // X du côté droit
      const cellY1 = cellOffset.top - offset.top; // Y du côté haut
      const cellY2 = cellY1 + cellHeight; // Y du côté bas

      gsap.to($horizontal, {
        attr: {x1: cellX1, x2: cellX2},
        ease: "power2.out",
        duration: .5,
      });

      gsap.to($vertical, {
        attr: { y1: cellY1, y2: cellY2 },
        ease: "power2.out",
        duration: .5,
      });

    }
  });
}

function setContactButtonHover() {
  $(".button").each(function () {
    const $btn = $(this).find(".button_second-row");
    const $text = $btn.find(".heading-style-h2");

    $btn.on("mouseleave", function () {
      gsap.to($text, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
      });
    });

    $btn.on("mouseenter", function () {
      gsap.to($text, {
        opacity: 0.8,
        scale: 0.95,
        duration: 0.3,
      });
    });
  });
};

function lineAppear() {
  const tl = gsap.timeline();
  tl.to($(".horizontal-line"), {duration: 1})
  tl.from($(".contact-contact_column-right .horizontal-line").not(".contact-contact_content-wrapper .horizontal-line")
, {
    scaleX: 0,
    duration: .5,
    stagger: 0.05
  });
  tl.from($(".contact-contact_column-right .char").not(".contact-contact_content-wrapper .char"), {
    yPercent: 120,
    duration: .5,
    stagger: 0.005
  }, "<");

$(".home-hero_patch, .home-hero_patch-2").each(function () {
    const patchTl = gsap.timeline({    });
   
    const patchSplitType = window.SplitType;
    let patchTypeSplit = new patchSplitType($(this).find("p"), {
      types: "words, chars",
      tagName: "span",
    });

     patchTl.from($(this), {
      
      duration: 1,
      
    });
    patchTl.from($(this), {
      scaleY: 0,
      transformOrigin: "bottom",
      duration: 0.5,
      ease: "power2.out",
    });
    patchTl.from($(this).find(".horizontal-line"), {
      scaleX: 0, 
      duration: 0.3,
      transformOrigin: "left",
      ease: "power2.out",
      stagger: 0.1,
    });
    patchTl.from(
      $(this).find(".vertical-line"),
      {
        scaleY: 0, 
        duration: 0.3,
        transformOrigin: "top",
        ease: "power2.out",
        stagger: 0.1,
      },
      "<"
    );
    patchTl.from(
      $(this).find(".char"),
      {
        yPercent: 120,
      stagger: 0.002,
      duration: 0.35,
      },
    );
    patchTl.from(
      $(this).find("img"),
      {
        yPercent: -120,
      stagger: 0.002,
      duration: 0.35,
      }, "<"
    );
  });
}