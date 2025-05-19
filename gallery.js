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
  setPageTransition,
  setLenis,
  setLinkHover,
  setButtonAppear,
} from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);
  setPageTransition();
});

window.addEventListener("load", () => {
  $(".gallery-gallery_container-cover").css("display", "block");
  if ($(window).width() > 991) { 
    setGalleryHover();
    setButtonHover();
    setLinkHover();
    setImageHover();
    sectBarCodeMovement();
    setButtonAppear();
  }
  setLenis();
  setInterval(updateClock, 1000);
  updateClock();
  setNavBarMenu();
  galleryBehavior();
  setGalleryClick();
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
  // "9/16",
  // "3/4",
  "2/3",
  "1/1",
];
let formatsReplicate = formats.slice();
let isAnimating = false;

function galleryBehavior() {
  $(".gallery-gallery_pictures-wrapper").empty();
  setGallery();
  galleryWaveAnimation();
  setImageHover();
  setGalleryClick();
}

function setGallery() {
  const wrappers = $(".gallery-gallery_pictures-wrapper");
  let itemCount;

  if ($(window).width() <= 991) {
    itemCount = 6;
  } else {
    itemCount = 10;
  }

  //until the containers are full: create a div with format. Inject inmage with 120% of width. Inject div in container
  for (let i = 0; i < itemCount; i++) {
    wrappers.each(function () {
      // const divHeight = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
      const randomFormatIndex = Math.floor(
        Math.random() * formatsReplicate.length
      );
      const randomImageIndex = Math.floor(
        Math.random() * imagesLinksReplicate.length
      );
      const divFormat = formatsReplicate.splice(randomFormatIndex, 1)[0];
      const imageLink = imagesLinksReplicate.splice(randomImageIndex, 1)[0];

      let $div = $("<div></div>").css({
        height: "80%",
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

let waveTl = gsap.timeline();
function galleryWaveAnimation() {
  waveTl.from(".gallery-gallery_item-wrapper", {
    clipPath: "inset(0 0 100% 0)",
    duration: 0.5,
    ease: "power1.out",
    stagger: 0.07,
    onComplete: () => {
      $(".gallery-gallery_container-cover").css("display", "none");
    }
  });

  waveTl.from(
    ".gallery-gallery_item",
    {
      scale: 1.5,
      duration: 1,
      ease: "power3.out",
      stagger: 0.07,
    },
    "<"
  );

  waveTl.to(
    ".gallery-gallery_item-wrapper",
    {
      onStart: () => {
        $(".gallery-gallery_container-cover").css("display", "block");
      },
      clipPath: "inset(0 0 100% 0)",
      duration: 0.5,
      ease: "power1.out",
      stagger: 0.07,
      onComplete: () => {
        galleryBehavior();
      },
    },
    "+=3"
  );

  $(".gallery-gallery_pictures-wrapper").on("mouseenter", () => {
    waveTl.pause();
  });
  $(".gallery-gallery_pictures-wrapper").on("mouseleave", () => {
    waveTl.play();
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
        ease: "power1.out",
      });
    });

    $(this).on("mouseleave", function (e) {
      gsap.to($(this), {
        xPercent: 0,
        duration: 0.7,
        ease: "power1.out",
      });
    });
  });
}

function setImageHover() {
  $(".gallery-gallery_item-wrapper").each(function () {
    $(this).hover(
      function () {
        const levels = [
          { element: $(this), scale: 1.2 },
          { element: $(this).prev(), scale: 1.1 },
          { element: $(this).next(), scale: 1.1 },
          { element: $(this).prev().prev(), scale: 1.05 },
          { element: $(this).next().next(), scale: 1.05 },
        ];

        levels.forEach(({ element, scale }) => {
          if (element.length) {
            gsap.to(element, {
              scaleY: scale,
              duration: 0.4,
              ease: "power1.out",
            });
            gsap.to(element.find("img"), {
              scaleX: scale,
              duration: 0.4,
              ease: "power1.out",
            });
          }
        });
      },
      function () {
        const levels = [
          $(this),
          $(this).prev(),
          $(this).next(),
          $(this).prev().prev(),
          $(this).next().next(),
        ];

        levels.forEach((element) => {
          if (element.length) {
            gsap.to(element, {
              scaleY: 1,
              duration: 0.4,
              ease: "power1.out",
            });
            gsap.to(element.find("img"), {
              scaleX: 1,
              duration: 0.4,
              ease: "power1.out",
            });
          }
        });
      }
    );
  });
}



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

function setGalleryClick() {
  const $modal = $(".gallery-gallery_modal");
  const $imageContainer = $(".gallery-gallery_modal-image-container");
  const $image = $(".gallery-gallery_modal-image");

  gsap.set($modal, { opacity: 0 });
  // gsap.set($image, {clipPath: "inset(100% 0 0 0)"})

  $(".gallery-gallery_item").each(function () {
    $(this).on("click", function () {
      if(isAnimating){return};
      isAnimating = true;
      $(".gallery-gallery_container-cover").css("display", "block");
      const src = $(this).attr("src");
      $image.attr("src", src);
      $(this).addClass("active")
      gsap.set($imageContainer, {
        clipPath: "inset(100% 0 0 0)",
      });

      let tl = gsap.timeline({});

      tl.set($modal, { display: "flex" });

      setTimeout(() => {
        waveTl.pause();
      }, 50);

      tl.to($(this), {
        clipPath: "inset(100% 0 0 0)",
        duration: 0.3,
        ease: "power1.out",
      });

      tl.to(
        $modal,
        {
          opacity: 1,
          duration: 0.4,
          ease: "power1.out",
        },
        "<"
      );

      tl.to($imageContainer, {
        clipPath: "inset(0% 0 0 0)",
        duration: 0.5,
        ease: "power1.out",
        onComplete:()=>{$(".gallery-gallery_container-cover").css("display", "none"); isAnimating = false;}
      });
    });
  });//end each loop

  $modal.on("click", ()=>{
    let tl = gsap.timeline();
    if(isAnimating){return}
    isAnimating = true,

    tl.to($imageContainer, {
      clipPath: "inset(100% 0 0 0)",
      duration: 0.5,
      ease: "power1.out",
    });

    tl.to(
      $modal,
      {
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
      },
    );

    tl.to($(".active"), {
      clipPath: "inset(0% 0 0 0)",
      duration: 0.4,
      ease: "power1.out",
      onComplete: () => {$(".active").removeClass("active"); waveTl.play(); isAnimating = false;}
    }, "<");
    tl.set($modal, { display: "none" });
  });
}
