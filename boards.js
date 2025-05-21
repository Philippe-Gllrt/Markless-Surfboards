import {
  setNavBarMenu,
  sectBarCodeMovement,
  updateClock,
  setFooterAppear,
  scrollToTopInstant,
  scrollToTop,
  disableScroll,
  enableScroll,
  setParallax,
  setButtonHover,
  setImageOnScroll,
  setTextOnScroll,
  setPageTransition,
  setFooterScrollTop,
  setLenis,
  setLinkHover,
  setButtonAppearOnScroll,
} from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);
  setPageTransition();
});

window.addEventListener("load", () => {
  if ($(window).width() > 991) {
    sectBarCodeMovement();
    setLinkHover();
    setButtonAppearOnScroll();
    setButtonHover();
    setFooterAppear();
    setParallax();
    setImageOnScroll();
    setTextOnScroll();
    const $items = $(".boards-model_info-item");
    const middleIndex = Math.floor($items.length / 2);
    refreshInfo(middleIndex);
    activeCardMarkee();
    setCardsBehavior();
  }
  setLenis();
  setInterval(updateClock, 1000);
  setFooterScrollTop();
  updateClock();
  setNavBarMenu();
});

const SplitType = window.SplitType;
let typeSplit = new SplitType("[text-split]", {
  types: "words, chars",
  tagName: "span",
});

function setCardsBehavior() {
  const maxOffset = 10;

  gsap.set(".boards-model_card", { scale: 0.8 });
  gsap.set(".boards-model_card-title", { opacity: 0 });
  gsap.set($(".boards-model_info-wrapper").find(".char"), {
    yPercent: 120,
  });

  $(".boards-model_card-wrapper").on("click", activeCardMarkee);

  $(".boards-model_cards-container").on("mousemove", function (e) {
    let mouseX = e.clientX / $(window).width(); // 0 (gauche) à 1 (droite)
    let offset = -maxOffset + mouseX * maxOffset * 2; // Déplacement de -20% à +20%

    gsap.to($(".boards-model_cards-track"), {
      xPercent: -offset,
      duration: 0.3,
      ease: "power1.out",
    });
  });

  $(".boards-model_cards-container").on("mouseleave", function (e) {
    gsap.to($(".boards-model_cards-track"), {
      xPercent: 0,
      duration: 0.7,
      ease: "power1.out",
    });
  });
}

function activeCardMarkee() {
  let element;
  if (!this) {
    const $items = $(".boards-model_card-wrapper");
    const middleIndex = Math.floor($items.length / 2);
    element = $(".boards-model_card-wrapper")[middleIndex];
  } else {
    element = this;
  }
  const text = $(element).find(".boards-model_card-title");
  const container = $(element).find(".boards_model_title-container");
  const index = $(element).index(".boards-model_card-wrapper");

  //disable previous actived card
  const $activeCard = $('[markee-activated="true"]');
  const activeText = $activeCard.find(".boards-model_card-title")
  const activeContainer = $activeCard.find(".boards_model_title-container");
  if ($activeCard.length && !$activeCard.is(element)) {
    gsap.to($activeCard.find(".boards-model_card"), {
      scale: 0.8,
      duration: 0.3,
    });
    gsap.to(activeText, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        gsap.set(activeContainer, { display: "none" });
        gsap.killTweensOf(activeText);
        gsap.set(activeText, { xPercent: 0 });
      },
    });
    $activeCard.removeAttr("markee-activated");
  }

  //Activate card
  if (!$activeCard.is(element)) {
    gsap.set(container, { display: "flex" });
    gsap.to($(element).find(".boards-model_card"), { scale: 1, duration: 0.3 });
    gsap.to(text, {
      opacity: 1,
      duration: 0.3,
    });
    gsap.to(text, {
      xPercent: -200,
      repeat: -1,
      ease: "linear",
      duration: 3,
    });
    $(element).attr("markee-activated", "true");
    refreshInfo(index);
  }
}

let targetWrapper;
let infoMainTl;

function refreshInfo(index) {
  if (infoMainTl) {
    infoMainTl.kill();
  }
  infoMainTl = gsap.timeline();

  //hide the previous active card's related infos
  if (targetWrapper) {
    infoMainTl.to(
      $(targetWrapper).find(".char"),
      {
        yPercent: 120,
        stagger: { amount: 0.2 },
        duration: 0.15,
        onComplete: () => {
          //ensure all infos are hidden
          gsap.set($(".boards-model_info-item").find(".char"), {
            yPercent: 120,
          });
        },
      },
      "<"
    );
  }

  //select new active acreds infos
  targetWrapper = $(".boards-model_info-item")[index];

  infoMainTl.to($(targetWrapper).find(".char"), {
    yPercent: 0,
    stagger: { amount: 0.5 },
    duration: 0.3,
  });

  $(".boards-model_info-item").each(function () {
    const lineTl = gsap.timeline();
    lineTl.to(
      $(this).find(".horizontal-line"),
      {
        scaleX: 0,
        stagger: { amount: 0.2 },
        duration: 0.15,
      },
      "<"
    );

    lineTl.to(
      $(this).find(".horizontal-line"),
      {
        scaleX: 1,
        stagger: { amount: 0.5 },
        duration: 0.3,
        delay: 0.4,
      },
      "<"
    );
  });
}
