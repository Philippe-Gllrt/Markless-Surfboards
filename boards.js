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
} from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);
  setPageTransition();
});

window.addEventListener("load", () => {
  setLenis();
  setInterval(updateClock, 1000);
  setFooterScrollTop();
  updateClock();
  setNavBarMenu();
  sectBarCodeMovement();
  setButtonHover();
  setFooterAppear();
  setCardsBehavior();
  setParallax();
  setImageOnScroll();
  setTextOnScroll();
  activeCardMarkee();
});

const SplitType = window.SplitType;
let typeSplit = new SplitType("[text-split]", {
  types: "words, chars",
  tagName: "span",
});

function setCardsBehavior() {
  gsap.set(".boards-model_card", { scale: 0.8 });
  gsap.set(".boards-model_card-title", { opacity: 0 });
  gsap.set($(".boards-model_info-wrapper").find(".char"), {
    yPercent: 120,
  });

  gsap.registerPlugin(Draggable);

  const $container = $(".boards-model_cards-container");
  const $track = $(".boards-model_cards-track");
  let $cardsList = $(".boards-model_cards");

  if (
    $container.length === 0 ||
    $track.length === 0 ||
    $cardsList.length === 0
  ) {
    console.error("Un des éléments nécessaires est introuvable !");
    return;
  }

  const cardWidth = $cardsList.first().outerWidth(true);
  const totalWidth = cardWidth * $cardsList.length;

  // Clone les cards pour effet infini
  $track.append($cardsList.clone());
  $track.append($cardsList.clone());
  $cardsList = $(".boards-model_cards"); // Re-sélectionner avec les clones
  $track.width(totalWidth * 2);

  const draggable = Draggable.create($track[0], {
    type: "x",
    bounds: { minX: -totalWidth, maxX: 0 },
    inertia: true,
    onDrag: () => {
      checkLoop();
      scaleActiveCard();
    },
    onDragEnd: () => {
      checkLoop();
      scaleActiveCard();
      activeCardMarkee();
    },
    onThrowUpdate: () => {
      checkLoop();
    },
  })[0];

  function checkLoop() {
    const currentX = gsap.getProperty($track[0], "x");

    if (currentX <= -totalWidth) {
      gsap.set($track, { x: currentX + totalWidth });
      setTimeout(() => draggable.update(), 0);
    } else if (currentX >= 0) {
      gsap.set($track, { x: currentX - totalWidth });
      setTimeout(() => draggable.update(), 0);
    }
  }

  function scaleActiveCard() {
    const windowCenter = window.outerWidth / 2;
    const $cards = $(".boards-model_card");

    let closestCard = null;
    let closestDistance = Infinity;

    $cards.each(function () {
      const $card = $(this);
      const cardOffset = $card.offset().left;
      const cardCenter = cardOffset + $card.outerWidth() / 2;

      const distance = Math.abs(windowCenter - cardCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestCard = $card;
      }
    });

    //for all cards : if closest, upscale, if not, downscale
    $cards.each(function () {
      const track = $(this).find(".boards_model_title-track");
      const text = $(this).find(".boards-model_card-title");
      if (this === closestCard[0]) {
        gsap.to(this, { scale: 1, duration: 0.3 });
      } else {
        gsap.to(this, {
          scale: 0.8,
          duration: 0.3,
        });
      }
    });
  }
  scaleActiveCard();
}

function activeCardMarkee() {
  const windowCenter = window.outerWidth / 2;
  const $cards = $(".boards-model_card");

  let closestCard = null;
  let closestDistance = Infinity;

  //loop selecting the closest card
  $cards.each(function () {
    const $card = $(this);
    const cardOffset = $card.offset().left;
    const cardCenter = cardOffset + $card.outerWidth() / 2;

    const distance = Math.abs(windowCenter - cardCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestCard = $card;
    }
  });

  //For all cards : if closest, display flex the marquee and launch the loop. if not, fade out and display none
  $cards.each(function (index) {
    const track = $(this).find(".boards_model_title-track");
    const text = $(this).find(".boards-model_card-title");
    const container = $(this).find(".boards_model_title-container");

    if (this === closestCard[0] && !$(this).hasClass("marquee-active")) {
      gsap.set(container, { display: "flex" });
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

      $(this).addClass("marquee-active");
      refreshInfo(
        index %
          $($(".boards-models_info-list")[0]).find(".boards-model_info-item")
            .length
      );
    } else if (this != closestCard[0] && $(this).hasClass("marquee-active")) {
      gsap.to(text, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.set(container, { display: "none" });
          gsap.killTweensOf(text);
          gsap.set(text, { xPercent: 0 });
          $(this).removeClass("marquee-active");
        },
      });
    }
  });
}

var targetWrapper = $(".boards-model_info-item")[0];

function refreshInfo(index) {
  const mainTl = gsap.timeline();

  mainTl.to(
    $(targetWrapper).find(".char"),
    {
      yPercent: 120,
      stagger: { amount: 0.5 },
      duration: 0.3,
      onComplete: () => {
        gsap.set($(".boards-model_info-item").find(".char"), { yPercent: 120 });
      },
    },
    "<"
  );

  // const textsTl = gsap.timeline()
  targetWrapper = $(".boards-model_info-item")[index];

  // gsap.killTweensOf($(targetWrapper).find(".char"))
  mainTl.to($(targetWrapper).find(".char"), {
    yPercent: 0,
    stagger: { amount: 0.5 },
    duration: 0.3,
  });

  $(".boards-model_info-item").each(function () {
    const textTl = gsap.timeline();
    textTl.to(
      $(this).find(".horizontal-line"),
      {
        scaleX: 0,
        stagger: { amount: 0.5 },
        duration: 0.3,
      },
      "<"
    );

    textTl.to(
      $(this).find(".horizontal-line"),
      {
        scaleX: 1,
        stagger: { amount: 0.5 },
        duration: 0.3,
        delay: 0.8,
      },
      "<"
    );
  });
}

