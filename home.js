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
  setImageOnScroll,
  setTextOnScroll,
  setFooterScrollTop,
  setLenis,
  setLinkHover,
  setPatchAppearOnScroll,
  setButtonAppearOnScroll,
  LottieScrollTrigger,
  
} from "./utils.js";



document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);
  if (sessionStorage.getItem("visited") !== "true") {
    $(".transition_wrapper").css("display", "none");
    disableScroll();
    setTimeout(preloaderAnimation, 500)
  } else {
    $(".preloader_wrapper").css("display", "none");
  }
  scrollToTopInstant();
});

window.addEventListener("load", () => {
  cookieConsentHandler();
  setInterval(updateClock, 1000);
  updateClock();
  setLenis();
  if (sessionStorage.getItem("visited") !== "true") {
    EntranceAnimation();
  }
  if ($(window).width() > 991) {
    sectBarCodeMovement();
    setTimeout(setParallax, 500);
    setButtonHover();
    setSectionHeaderAppear();
    setTextOnScroll();
    setImageOnScroll();
    setTimeout(setProcessHover, 500);
    setTimeout(setFooterAppear, 500);
    setLinkHover();
    setButtonAppearOnScroll();
    setPatchAppearOnScroll();
    setProcessFade();
  };
  setFooterScrollTop();
  setNavBarMenu();
  setIntroLottie();
  setFooterLottie();
  setProcessLottie();
  setTimeout(setProcessFadingText, 500);
  setTimeout(setBoardsScrollAnimation, 500);
  setTimeout(setPageTransition, 500);
  setPhilosophyColumnTextHover();
});

// seting original state before animation
function setPreloaderInitalState() {
  gsap.set(".preloader_horizon-border", {
    scaleX: 0,
  });

  gsap.set(".preloader_sun-border-wrapper", {
    rotation: 180,
  });
}

// // Split text into spans
const SplitType = window.SplitType;
let typeSplit = new SplitType("[text-split]", {
  types: "words, chars",
  tagName: "span",
});

////////Functions used for preloader animation///////////

//Set the GSAP animation of the prealoader
function preloaderAnimation() {
  //seting timeline
  const preloadertl = gsap.timeline({
    defaults: { duration: 1, ease: "power2.out" },
  });

  preloadertl.to({}, { duration: 0.5 });

  // 1st step: tracing the line
  preloadertl.to(".preloader_horizon-border", {
    scaleX: 1,
  });

  // 2nd: tracing the sun border
  preloadertl.to(
    ".preloader_sun-border-wrapper",
    {
      borderColor: "#fff",
      rotation: 0,
      duration: 1,
      onComplete: () => {
        createReflectLines(); // Call the function to generate reflective lines.
      },
    },
    "-=0.5"
  );
}

// Animation loop for reflective lines using SVG
//Called in preloaderAnimation()
function createReflectLines() {
  //const svg = createSVGContainer();
  const svg = document.querySelector(".preloader_reflect_svg");
  for (let i = 0; i < 6; i++) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", "0");
    line.setAttribute("y1", "100");
    line.setAttribute("x2", "200");
    line.setAttribute("y2", "100");
    line.setAttribute("stroke", "var(--base-color-brand--pink)");
    line.setAttribute("stroke-width", "4");
    svg.appendChild(line);

    const delay = i * 1; // Staggering the start of each line
    gsap.fromTo(
      line,
      {
        opacity: 1,
        attr: { y1: 100, y2: 100, "stroke-width": 4 },
      },
      {
        opacity: 0,
        attr: { y1: 200, y2: 200, "stroke-width": 0 },
        duration: 5,
        delay: delay,
        repeat: -1,
        repeatDelay: 1,
        ease: "linear",
        onComplete: () => line.remove(), // Clean up after animation
      }
    );
  }
}

//////function use for transition preloader / site content //////////////
//Animation used to enter the site, by scale the sun so it wrap the all page
let landingEntranceTl = gsap.timeline();
function EntranceAnimation() {
  
  landingEntranceTl.to(
    ".preloader_reflect_svg",
    {
      //fade out refflects
      opacity: 0,
      duration: 0.7,
    },
    "+=3"
  );

  landingEntranceTl.to(
    ".preloader_sun-cover",
    {
      //reveal the side, in the sun (mask)
      opacity: 0,
      duration: 0.7,
      ease: "power2.in",
    },
    "+=0.5"
  );

  landingEntranceTl.to(
    ".preloader",
    {
      //scale the sun
      scale: computeSunScale(), //dynamicallly compute the needed scale
      y: "50vh",
      duration: 0.7,
      ease: "power3.in",
      onComplete: () => {
        gsap.set(".preloader_wrapper", {
          display: "none",
        });
      },
    },
    "<"
  );

  landingEntranceTl.from(".cookie_container", {
    scaleX: 0,
    duration: 0.5,
    ease: "power1.in",
  });

  $(".home-hero_patch, .home-hero_patch-2").each(function () {
    const patchTl = gsap.timeline({    });
   
    const patchSplitType = window.SplitType;
    let patchTypeSplit = new patchSplitType($(this).find("p"), {
      types: "words, chars",
      tagName: "span",
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
    landingEntranceTl.add(patchTl, "<")
  });

  landingEntranceTl.from(
    "[entrance-typing-effect] .char",
    { yPercent: 120, stagger: 0.002, duration: 0.35 },
    ">"
  );

  landingEntranceTl.from(
    ".nav_clock",
    { yPercent: -200, ease: "power2.out", duration: 0.3 },
    "-=1"
  );
  landingEntranceTl.from(
    ".home-hero_header_firstrow .char",
    { yPercent: 120, ease: "power2.out", duration: 0.5, stagger: 0.01 },
    "-=0.2"
  );
  landingEntranceTl.from(".home-hero_header_secondrow .char", {
    yPercent: -120,
    ease: "power2.out",
    duration: 0.5,
    stagger: 0.01,
  });
  landingEntranceTl.from(
    "[entrance-paragraph-slide-down] .char",
    {
      yPercent: 120,
      ease: "power2.out",
      duration: 0.5,
      onComplete: () => {
        enableScroll();
      },
    },
    ">"
  );
}

// compute the needed scale for the sun to wrap the all screen
// called in setEntranceAnimation()
function computeSunScale() {
  const width = $(window).width();
  const height = $(window).height();
  const diameter = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height, 2)) * 2;
  const scale = diameter / $(".preloader_sun-border").width();
  return scale;
}

function setIntroLottie() {
  let anim = lottie.loadAnimation({
    container: document.querySelector(".home-intro_section"),
    renderer: "svg",
    loop: false, // or false if you don't want it to loop
    autoplay: false, // Disable autoplay
    path: "https://cdn.prod.website-files.com/67939e9483ef1b9e88e964c0/67a3abaf4e23619f5632ed13_51c4f712edb2397350bc401f90277c1e_markless---lottie-logo-animation.json",
  });

  ScrollTrigger.create({
    trigger: $(".home-intro_section"),
    start: "top 80%",
    end: "bottom 20%",
    onEnter: () => anim.play(),
    // onLeaveBack: () => anim.stop(),
    //toggleActions: "play none none reverse",
    toggleActions: "play none none none",
  });
}

function setFooterLottie() {
  let anim = lottie.loadAnimation({
    container: document.querySelector(".footer_lottie"),
    renderer: "svg",
    loop: false, // or false if you don't want it to loop
    autoplay: false, // Disable autoplay
    path: "https://cdn.prod.website-files.com/67939e9483ef1b9e88e964c0/67a3abaf4e23619f5632ed13_51c4f712edb2397350bc401f90277c1e_markless---lottie-logo-animation.json",
  });

  ScrollTrigger.create({
    trigger: $(".footer_lottie"),
    start: "top 80%",
    end: "bottom 20%",
    onEnter: () => anim.play(),
    // onLeaveBack: () => anim.stop(),
    //toggleActions: "play none none reverse",
    toggleActions: "play none none none",
  });
}

function setProcessLottie() {
  
  // let animProcess = lottie.loadAnimation({
  //   container: document.querySelector(".home-process_lottie"),
  //   renderer: "svg",
  //   loop: false, // or false if you don't want it to loop
  //   autoplay: false, // Disable autoplay
  //   path: "https://cdn.prod.website-files.com/67939e9483ef1b9e88e964c0/67a4d1c2bc2edae311b3c99f_be0111218b8d809cb2c82fdaaff50839_markless---schema.json",
  // });

  // ScrollTrigger.create({
  //   trigger: $(".home-process_section"),
  //   start: "10% 20%",
  //   end: "bottom 80%",
  //   onEnter: () => animProcess.play(),
  //   // onLeaveBack: () => animProcess.stop(),
  //   //toggleActions: "play none none reverse",
  //   toggleActions: "play none none none",
  // });

  LottieScrollTrigger({
    trigger: $(".home-process_section"),
    target: ".home-process_lottie",
    path: "https://cdn.prod.website-files.com/67939e9483ef1b9e88e964c0/67a4d1c2bc2edae311b3c99f_be0111218b8d809cb2c82fdaaff50839_markless---schema.json",
    speed: "medium",
    scrub: true,
    start: "top top",
    end: "bottom bottom",
    pin: false,
    // markers: true
  });

}

function setProcessFadingText() {
  $(".home-process_text-wrapper").each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top 65%",
        end: "bottom 35%",
        ease: "linear",
        scrub: true,
      },
    });

    tl.from($(this), { 
      opacity: 0.2, 
      duration: 0.3 
    })
    .to($(this), {
      opacity: 0,
      duration: 0.3,
      delay: 0.1,
    });
  });
}

function setBoardsScrollAnimation() {
  let images = $(".home-boards_list-background").toArray();
  images.shift();

  let maintl = gsap.timeline({
    scrollTrigger: {
      trigger: ".home-boards_section",
      start: "top -5%",
      end: "bottom bottom",
      scrub: true,
      ease: "linear",
      invalidateOnRefresh: true,
    },
  });

  images.forEach((image) => {
    let tl = gsap.timeline();

    gsap.set(image, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
    });

    tl.to(image, {
      clipPath: "polygon(0 56%, 100% 44%, 100% 100%, 0% 100%)",
      ease: "power1.in",
      duration: 0.5,
    });

    tl.to(
      image,
      {
        clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
        ease: "power1.out",
        duration: 0.5,
      },
      ">"
    );

    maintl.add(tl, ">");
  });

  let boardCards = $(".home-boards_list-item").toArray();
  let boardCardsShifted = boardCards.slice(1);
  let boardCardsPoped = boardCards.slice(0, -1);

  let boardTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".home-boards_section",
      start: "top -5%",
      end: "bottom bottom",
      scrub: true,
      ease: "linear",
    },
  });

  for (let index = 0; index < boardCardsShifted.length; index++) {
    boardTl.from(boardCardsShifted[index], {
      y: "100vh",
      scale: 1.2,
      ease: "power1.out",
      duration: 1,
    });
     boardTl.from($(boardCardsShifted[index]).find(".horizontal-line"), {
      scaleX: 0,
      delay: .5,
      ease: "power1.out",
      duration: .7,
    }, "<");
    boardTl.from($(boardCardsShifted[index]).find(".vertical-line"), {
      scaleY: 0,
      delay: .5,
      ease: "power1.out",
      duration: .7,
    }, "<");

    if (boardCardsPoped[index]) {
      boardTl.to(
        boardCardsPoped[index],
        {
          duration: 1,
          ease: "power1.out",
          scale: 0.95,
          filter: "blur(2px)",
        },
        "<"
      );
    }
  }

  let imageSeparators = $(".home-boards_list-white-panel").toArray();
  imageSeparators.shift();
  let separatortl = gsap.timeline({
    scrollTrigger: {
      trigger: ".home-boards_section",
      start: "top -5%",
      end: "bottom bottom",
      scrub: true,
      ease: "linear",
    },
  });

  imageSeparators.forEach((separator) => {
    let tl = gsap.timeline();
    gsap.set(separator, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
    });

    tl.to(separator, {
      clipPath: "polygon(0 56%, 100% 44%, 100% 100%, 0% 100%)",
      ease: "power1.in",
      duration: 0.45,
    });

    tl.to(
      separator,
      {
        clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
        ease: "power1.out",
        duration: 0.45,
      },
      ">"
    );

    tl.to({}, { duration: 0.1 });

    separatortl.add(tl, ">");
  });

  let ctas = $(".boards_cta").toArray();
  ctas.shift();
  let ctaTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".home-boards_section",
      start: "top -5%",
      end: "bottom bottom",
      scrub: true,
      ease: "linear",
    },
  });

  ctas.forEach((cta) => {
    ctaTl.from(
      cta,
      {
        opacity: 0,
        duration: 0.5,
      },
      "+=1"
    );
  });
}

function setSectionHeaderAppear() {
  let $sectionHeaders = $(".section-heading");

  $sectionHeaders.each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top 40%",
        end: "bottom top",
        ease: "linear",
      },
    });

    $(this).find(".horizontal-line").css("transform-origin", "left");
    tl.from($(this).find(".horizontal-line"), {
      scaleX: 0,
      ease: "power1.out",
      duration: 0.7,
      stagger: 0.05,
    });

    tl.from($(this).find(".char"), {
      yPercent: 120,
      ease: "power2.out",
      duration: 0.5,
      stagger: 0.01,
    }),
      "+=0.7";
  });
}

function setProcessHover() {
  const $processSection = $(".home-process_section");
  const $processCursor = $(".home-process_cursor");
  const $horizontal = $processCursor.find(".horizontal");
  const $vertical = $processCursor.find(".vertical");

  $processSection.on("mousemove", function (e) {
    const offset = $processCursor.offset();
    const width = $processCursor.outerWidth();
    const height = $processCursor.outerHeight();

    const x = e.pageX - offset.left;
    const y = e.pageY - offset.top;

    gsap.to($horizontal, {
      duration: 0.2,
      attr: { y1: y, y2: y, x1: 0, x2: width },
      ease: "power2.out",
    });

    gsap.to($vertical, {
      duration: 0.2,
      attr: { x1: x, x2: x, y1: 0, y2: height },
      ease: "power2.out",
    });
  });

  gsap.set([$horizontal, $vertical], { opacity: 0 });

  $processSection.on("mouseleave", function () {
    gsap.to([$horizontal, $vertical], {
      opacity: 0,
      duration: 0.2,
    });
  });

  $processSection.on("mouseenter", function () {
    gsap.to([$horizontal, $vertical], {
      opacity: 1,
      duration: 0.2,
    });
  });
}

function cookieConsentHandler() {
  // check is user already accepted cookies
  const cookieConsent = localStorage.getItem("cookieConsent");
  if (cookieConsent === "rejected") {
    $(".cookie_rejected").css("display", "flex");
    gsap.set($(".cookie_default").find(".char"), { y: 120 });
  } else if (cookieConsent === "accepted") {
    $(".cookie_accepted").css("display", "flex");
    gsap.set($(".cookie_default").find(".char"), { y: 120 });
    //initializeGoogleAnalytics();
  }

  $(".cookie_accept").click(function () {
    localStorage.setItem("cookieConsent", "accepted");
    //initializeGoogleAnalytics();

    const tl = gsap.timeline();
    tl.to($(".cookie_default").find(".char"), {
      yPercent: 120,
      stagger: 0.002,
      duration: 0.35,
      onComplete: () => {
        $(".cookie_accepted").css("display", "flex");
      },
    });
    tl.from($(".cookie_accepted").find(".char"), {
      yPercent: 120,
      stagger: 0.002,
      duration: 0.35,
    });
  });

  $(".cookie_deny").click(function () {
    localStorage.setItem("cookieConsent", "rejected");
    // disable Google Analytics
    //window['ga-disable-UA-XXXXXXXXX-X'] = true;

    const tl = gsap.timeline();
    tl.to($(".cookie_default").find(".char"), {
      yPercent: 120,
      stagger: 0.002,
      duration: 0.35,
      onComplete: () => {
        $(".cookie_rejected").css("display", "flex");
      },
    });
    tl.from($(".cookie_rejected").find(".char"), {
      yPercent: 120,
      stagger: 0.002,
      duration: 0.35,
    });
  });
};

function setProcessFade() {

  $(".home-process_section").addClass("brown-background")
  const fadeTl = gsap.timeline({
    scrollTrigger: {
       trigger: $(".home-process_section"),
       start: "top 20%",
       end: "bottom 20%",
       onEnter: ()=>{
        $('.home-process_background').css("display", "block");
        $(".home-about_section, .home-philosophy_section, .home-process_section").removeClass("brown-background");
        $(".home-about_section, .home-philosophy_section, .home-process_section").addClass("pink-background");
       },
       onEnterBack: ()=>{
        $('.home-process_background').css("display", "block")
        $(".home-about_section, .home-philosophy_section, .home-process_section").removeClass("brown-background");
        $(".home-about_section, .home-philosophy_section, .home-process_section").addClass("pink-background");
       },
       onLeave: ()=>{
        $('.home-process_background').css("display", "none")
        $(".home-about_section, .home-philosophy_section, .home-process_section").removeClass("pink-background");
        $(".home-about_section, .home-philosophy_section, .home-process_section").addClass("brown-background");
       },
       onLeaveBack: ()=>{
        $('.home-process_background').css("display", "none")
        $(".home-about_section, .home-philosophy_section, .home-process_section").removeClass("pink-background");
        $(".home-about_section, .home-philosophy_section, .home-process_section").addClass("brown-background");
       },
    },
 });
};

function setPhilosophyColumnTextHover() {
  const $items = $('.home-philosophy_column.is-right').find("p");

  $items.each(function(index) {
    $(this).on("mouseenter", function() {
      const baseOffset = 40;
      const decayFactor = 0.7;

      $items.each(function(i) {
        const distanceFromHovered = Math.abs(i - index);
        // const direction = i < index ? -1 : 1;

        // L'élément lui-même (distance = 0) se déplace de 80px
        const offset = baseOffset * Math.pow(decayFactor, distanceFromHovered);
        gsap.killTweensOf($(this));
        gsap.to(this, {
          paddingLeft: offset,
          duration: 0.4,
          ease: "power2.out"
        });
      });
    });

    $(this).on("mouseleave", function() {
      // Tout revient à 0
      $items.each(function() {
        gsap.to(this, {
          paddingLeft: 0,
          duration: 0.4,
          ease: "power2.inOut",
          delay: .5
        });
      });
    });
  });
}
