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
} from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);
});

window.addEventListener("load", () => {
  setInterval(updateClock, 1000);
  updateClock();
  setNavBarMenu();
  sectBarCodeMovement();
  // setInterval(galleryBehavior, 7000);
  galleryBehavior();
  setButtonHover();
  setGalleryHover();
});

const SplitType = window.SplitType;
let typeSplit = new SplitType("[text-split]", {
  types: "words, chars",
  tagName: "span",
});

const imagesLinks = [
  "https://cdn.prod.website-files.com/67939e9483ef1b9e88e964c0/67b4d3d072a1e43212cef474_markless_sectionbpards-bg%20(1).jpg",
  "https://cdn.prod.website-files.com/67939e9483ef1b9e88e964c0/67b4d3d0f40eea748da534f8_markless_sectionbpards-bg%20(2).jpg",
  "https://cdn.prod.website-files.com/67939e9483ef1b9e88e964c0/67b4d3cf8a530e534116901b_markless_sectionbpards-bg%20(5).jpg",
  "https://cdn.prod.website-files.com/67939e9483ef1b9e88e964c0/67b4d3d031a9034eed09dc62_markless_sectionbpards-bg%20(4).jpg",
  "https://cdn.prod.website-files.com/67939e9483ef1b9e88e964c0/67b4d3cf2be65ff50c3d38a4_markless_sectionbpards-bg%20(3).jpg",
  "https://cdn.prod.website-files.com/67939e9483ef1b9e88e964c0/67b248857fe81537890c3e6c_markless-illustration.jpg",
  "https://cdn.prod.website-files.com/67939e9483ef1b9e88e964c0/67a4b6694ac72d93373f2a3a_surfer-blur-pict.jpg",
];
let imagesLinksReplicate = imagesLinks.slice();
const formats = [
  "16/9",
  "4/3",
  "3/2",
  "21/9",
  "2.39/1",
  "9/16",
  "3/4",
  "2/3",
  "1/1",
];
let formatsReplicate = formats.slice();

function galleryBehavior() {
  $(".gallery-gallery_pictures-wrapper").empty();
  setGallery();
  galleryWaveAnimation();
}

function setGallery() {
  const wrappers = $(".gallery-gallery_pictures-wrapper");

  //until the containers are full: create a div with format. Inject inmage with 120% of width. Inject div in container
  for (let i = 0; i < 10; i++) {
    wrappers.each(function () {
      const divHeight = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
      const randomFormatIndex = Math.floor(
        Math.random() * formatsReplicate.length
      );
      const randomImageIndex = Math.floor(
        Math.random() * imagesLinksReplicate.length
      );
      const divFormat = formatsReplicate.splice(randomFormatIndex, 1)[0];
      const imageLink = imagesLinksReplicate.splice(randomImageIndex, 1)[0];

      let $div = $("<div></div>").css({
        height: divHeight + "%",
        "aspect-ratio": divFormat,
        overflow: "hidden",
        "clip-path": "inset(0 0 0 0)",
      });

      $div.attr("class", "gallery-gallery_item-wrapper");
      $(this).append($div);

      let $image = $("<img>");

      $image.attr("src", imageLink);
      $image.attr("class", "gallery-gallery_item");
      $image.css({
        width: "120%",
        height: "100%",
        "object-fit": "cover",
      });

      $div.append($image);
      checkFormatArray();
      checkImagesArray();
    });
  } //end loop for
}

function galleryWaveAnimation() {
  //faire deux tl, une top une bottom, les mettre dans une main
  //recup top et bottom puis .find les wrappers
  let tl = gsap.timeline();
  tl.from(".gallery-gallery_item-wrapper", {
    clipPath: "inset(0 0 100% 0)",
    duration: 0.5,
    ease: "power2.out",
    stagger: 0.07,
  });

  tl.from(
    ".gallery-gallery_item",
    {
      scale: 1.5,
      duration: 1,
      ease: "power3.out",
      stagger: 0.07,
    },
    "<"
  );

  tl.to(
    ".gallery-gallery_item-wrapper",
    {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.07,
      onComplete: () => {
        galleryBehavior();
      },
    },
    "+=3"
  );

  $(".gallery-gallery_pictures-wrapper").on("mouseenter", () => {
    tl.pause();
  });
  $(".gallery-gallery_pictures-wrapper").on("mouseleave", () => {
    tl.play();
  });
}

function setGalleryHover() {
  const $wrapper = $(".gallery-gallery_pictures-wrapper");
  const maxOffset = 10;

  $(".gallery-gallery_pictures-wrapper").each(function () {
    $(this).on("mousemove", function (e) {
      let mouseX = e.clientX / $(window).width(); // 0 (gauche) à 1 (droite)
      let offset = -maxOffset + mouseX * maxOffset * 2; // Déplacement de -20% à +20%

      gsap.to($(this), {
        xPercent: -offset,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    $(this).on("mouseleave", function (e) {
      gsap.to($(this), {
        xPercent: 0,
        duration: 0.7,
        ease: "power2.out",
      });
    });
  });
}

function setGalleryClick() {}

function checkImagesArray() {
  if (imagesLinksReplicate.length == 0) {
    imagesLinksReplicate = imagesLinks.slice();
  }
}

function checkFormatArray() {
  if (formatsReplicate.length == 0) {
    formatsReplicate = formats.slice();
  }
}
