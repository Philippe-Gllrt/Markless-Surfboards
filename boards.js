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
    setButtonHover();
    setFooterAppear();
    setParallax();
    setImageOnScroll();
    setTextOnScroll();
  }
  setLenis();
  setInterval(updateClock, 1000);
  setFooterScrollTop();
  updateClock();
  setNavBarMenu();
  setCardsBehavior();
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
    console.error("one of the elements cannot be found!");
    return;
  }

  const cardWidth = $cardsList.first().outerWidth(true);
  const totalWidth = cardWidth * $cardsList.length;
  // $track.width(totalWidth * 2);

  // Clone three to ensure covering all screen
  $track.append($cardsList.clone());
  $track.append($cardsList.clone());
  $track.append($cardsList.clone());
  $cardsList = $(".boards-model_cards"); // Re-select, including clones this time

  const draggable = Draggable.create($track[0], {
    type: "x",
    // bounds: { minX: -totalWidth, maxX: 0 },
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

    //define the closest card
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
      if ($(this).attr("card-model") === closestCard.attr("card-model")) {
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
  let infoRefreshed = false;
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
    if (
      $(this).attr("card-model") === closestCard.attr("card-model") &&
      !($(this).attr("markee-activated") === "true")
    ) {
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
      $(this).attr("markee-activated", "true");

      if (!infoRefreshed) {
        refreshInfo(
          index %
            $($(".boards-models_info-list")[0]).find(".boards-model_info-item")
              .length
        );

        infoRefreshed = true;
      }
    } else if (
      $(this).attr("card-model") !== closestCard.attr("card-model") &&
      $(this).attr("markee-activated") === "true"
    ) {
      gsap.to(text, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.set(container, { display: "none" });
          gsap.killTweensOf(text);
          gsap.set(text, { xPercent: 0 });
        },
      });
      $(this).removeAttr("markee-activated");
    }
  });
}

let targetWrapper;
let infoMainTl;

function refreshInfo(index) {
  if (infoMainTl) {
    infoMainTl.kill();
  }
  infoMainTl = gsap.timeline();

  //hide the previous active card's related infos

  infoMainTl.to(
    $(targetWrapper).find(".char"),
    {
      yPercent: 120,
      stagger: { amount: 0.5 },
      duration: 0.3,
      onComplete: () => {
        //ensure all infos are hidden
        gsap.set($(".boards-model_info-item").find(".char"), { yPercent: 120 });
      },
    },
    "<"
  );

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
        stagger: { amount: 0.5 },
        duration: 0.3,
      },
      "<"
    );

    lineTl.to(
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
