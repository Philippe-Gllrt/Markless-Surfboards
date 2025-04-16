import {
  setNavBarMenu,
  sectBarCodeMovement,
  updateClock,
 
  setPageTransition,
  setFooterAppear,
  scrollToTopInstant,
  scrollToTop,
  disableScroll,
  enableScroll,
  setParallax,
  setButtonHover,
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
  setPageTransition();
  setInterval(updateClock, 1000);
  updateClock();
  setNavBarMenu();
  sectBarCodeMovement();
  // setFooterAppear();
  setContactHover();
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
