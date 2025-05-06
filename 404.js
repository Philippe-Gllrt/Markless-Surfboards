import {
  setNavBarMenu,
  sectBarCodeMovement,
  updateClock,
  setFooterScrollTop,
  setPageTransition,
  setLenis,
  setButtonHover,
  setFooterAppear,
  scrollToTopInstant,
  scrollToTop,
  disableScroll,
  enableScroll,
  setParallax,
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
    setButtonHover();
    sectBarCodeMovement();
  }
  setLenis();
  setPageTransition();
  setInterval(updateClock, 1000);
  updateClock();
  setNavBarMenu();
  setFooterScrollTop();
});
