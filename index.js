document.addEventListener("DOMContentLoaded", () => {
  setPreloaderInitalState();
  preloaderAnimation();
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollTo);
  disableScroll();
  scrollToTopInstant();
});

window.addEventListener("load", () => {
  setInterval(updateClock, 1000);
  updateClock();
  EntranceAnimation();
  setNavBarMenu();
  setIntroLottie();
  setProcessLottie();
  sectBarCodeMovement();
  setTimeout(setProcessFadingText, 1000);
});

const lenis = new Lenis({
  // Value between 0 and 1, smaller more fluid
  lerp: 0.1,
  wheelMultiplier: 1,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

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
let typeSplit = new SplitType("[text-split]", {
  types: "words, chars",
  tagName: "span",
});

//function to scroll back to top
function scrollToTopInstant() {
  gsap.to(window, { scrollTo: 0 });
}

//function to scroll back to top
function scrollToTop() {
  gsap.to(window, { scrollTo: 0, duration: 1, ease: "power2.out" });
}
////////Functions used for preloader animation///////////

//Set the GSAP animation of the prealoader
function preloaderAnimation() {
  //seting timeline
  const preloadertl = gsap.timeline({
    defaults: { duration: 1, ease: "power2.out" },
  });

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
    line.setAttribute("stroke", "#fff");
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

  landingEntranceTl.to(
    ".hero_background",
    {
      //scale the sun
      scale: 1.5, //dynamicallly compute the needed scale
      duration: 1.4,
      ease: "power2.out",
    },
    "<"
  );

  landingEntranceTl.from(
    ".cookie_container",
    {
      scaleX: 0,
      duration: 0.5,
      ease: "power1.in",
    },
    "-=0.5"
  );

  landingEntranceTl.from(
    ".section_hero .patch",
    {
      y: "30vh",
      duration: 0.8,
      ease: "power2.out",
    },
    "<"
  );

  landingEntranceTl.from(
    ".section_hero .patch2",
    {
      y: "30vh",
      duration: 0.8,
      delay: 0.2,
      ease: "power2.out",
    },
    "<"
  );

  landingEntranceTl.from(
    "[entrance-typing-effect] .char",
    { opacity: 0, duration: 0.00001, stagger: 0.004 },
    ">"
  );
  landingEntranceTl.from(
    ".nav_clock",
    { yPercent: -200, ease: "power2.out", duration: 0.3 },
    "-=1"
  );
  landingEntranceTl.from(
    ".hero_header_firstrow .char",
    { yPercent: 120, ease: "power2.out", duration: 0.1, stagger: 0.05 },
    "-=0.2"
  );
  landingEntranceTl.from(
    ".hero_header_secondrow .char",
    { yPercent: -120, ease: "power2.out", duration: 0.1, stagger: 0.05 },
    "+=0.2"
  );
  landingEntranceTl.from(
    "[entrance-paragraph-slide-down] .char",
    {
      yPercent: 120,
      ease: "power2.out",
      duration: 0.6,
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

// function to make to clock working
function updateClock() {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Format 24 hours
    timeZone: "Europe/Paris", // paris time zone
  };

  const now = new Date(); // fetch actual hour
  const timeString = new Intl.DateTimeFormat("fr-FR", options).format(now); // use french format

  // inject text into p element
  $(".nav_clock").text("vannes, " + timeString);
}

function setNavBarMenu() {
  gsap.set(".nav_blurbackdrop", { opacity: 0, display: "none" });
  gsap.set(".nav_menu-container", { display: "none" })
  let isOpen = false;

  //Seting the timeline animation
  const navOpenTl = gsap.timeline({paused: true});
  navOpenTl.set(".nav_menu-container", { display: "block" })
  navOpenTl.from(".nav_menu", { yPercent: -120, duration: 0.5, ease: "power3.inOut" });
  navOpenTl.to(".nav_blurbackdrop", {
    opacity: 1,
    display: "block",
    ease: "power2.inOut",
    duration: 0.5,
  }, "<");
  let delay = 0.5;

  $(".nav_menu .horizontal-line").each(function (index, element) {
    navOpenTl.from(
      $(element),
      {
        scaleX: 0,
        transformOrigin: `${gsap.utils.random(["0", "100"])}% 0%`,
        duration: 0.4,
         ease: "power2.inOut",
        delay: delay,
      },
      "<"
    );

    delay = Math.random() * (0.1 - 0.01) + 0.01;
  });

  $(".nav_menu .vertical-line").each(function (index, element) {
    navOpenTl.from(
      $(element),
      {
        scaleY: 0,
        transformOrigin: `0% ${gsap.utils.random(["0", "100"])}%`,
        duration: 0.4,
        delay: delay,
      },
      "<"
    );

    delay = Math.random() * (0.1 - 0.01) + 0.01;
  });

  navOpenTl.from("[barcode-up] .barcode_track", {
    ease: "power2.inOut",
    duration: 0.5,
    yPercent: -120,
  }, "<");

  navOpenTl.from("[barcode-down] .barcode_track", {
    ease: "power2.inOut",
    duration: 0.5,
    yPercent: 120,
  }, "<")

  //Select text, wrapp then in span, to animate the span later. giving overflow hidden to p elements
  $("[barcode-up] p, [barcode-down] p").each(function() {
    let $this = $(this);
    let text = $this.text();
    $this.empty().append(
            $("<span class='text-content' style='display: inline-block;'></span>").text(text)
    );
    $this.css("overflow", "hidden");
  });

  navOpenTl.from(".nav_menu_animated-ico", {
    ease: "power2.inOut",
    duration: 0.5,
    opacity: 0,
  }, "<");
  

  navOpenTl.from("[barcode-up] .nav_menu_link-sub .text-content, [barcode-down] .nav_menu_link-main .text-content", {
    ease: "power2.inOut",
    duration: 0.5,
    yPercent: 120,
    delay: 0.1,
  }, "<");

  navOpenTl.from("[barcode-down] .nav_menu_link-sub .text-content, [barcode-up] .nav_menu_link-main .text-content", {
    ease: "power2.inOut",
    duration: 0.5,
    yPercent: -120,
    delay: 0.2,
  }, "<")

  navOpenTl.from(".nav_menu_close_text .char", {
    ease: "power2.inOut",
    duration: 0.5,
    yPercent: -120,
  }, "<")

  navOpenTl.from(".nav_menu_close_button .char", {
    ease: "power2.inOut",
    duration: 0.5,
    yPercent: 120,
  }, "<")


  $(".nav_button").click(function () {
    if (!isOpen) {
      navOpenTl.play()
      isOpen = true;
    }
  });

  $(".nav_menu_close_button").click(function () {
    if (isOpen == true) {
      navOpenTl.reverse();
      isOpen = false;
    }
  });
}

function setIntroLottie() {
  let anim = lottie.loadAnimation({
    container: document.querySelector(".section_intro"),
    renderer: "svg",
    loop: false, // or false if you don't want it to loop
    autoplay: false, // Disable autoplay
    path: "https://cdn.prod.website-files.com/67939e9483ef1b9e88e964c0/67a3abaf4e23619f5632ed13_markless---lottie-logo-animation.json",
  });

  ScrollTrigger.create({
    trigger: $(".section_intro"),
    start: "top 80%",
    end: "bottom 20%",
    onEnter: () => anim.play(),
    // onLeaveBack: () => anim.stop(),
    //toggleActions: "play none none reverse",
    toggleActions: "play none none none",
  });
}

function disableScroll() {
  $("body").css("overflow", "hidden"); // Désactive le scroll
}

function enableScroll() {
  $("body").css("overflow", ""); // Réactive le scroll
}

function setProcessLottie() {
  let animProcess = lottie.loadAnimation({
    container: document.querySelector(".process_lottie"),
    renderer: "svg",
    loop: false, // or false if you don't want it to loop
    autoplay: false, // Disable autoplay
    path: "https://cdn.prod.website-files.com/67939e9483ef1b9e88e964c0/67a4d1c2bc2edae311b3c99f_d937c29ac586995a3cd6c34243c8601a_markless---schema.json",
  });

  ScrollTrigger.create({
    trigger: $(".section_process"),
    start: "10% 20%",
    end: "bottom 80%",
    onEnter: () => animProcess.play(),
    // onLeaveBack: () => animProcess.stop(),
    //toggleActions: "play none none reverse",
    toggleActions: "play none none none",
  });
}

function sectBarCodeMovement() {
  gsap.to(".barcode_track", {
    xPercent: -200,
    repeat: -1,
    ease: "linear",
    duration: Math.floor(Math.random() * 6) + 20,
  });
}

function setProcessFadingText() {
  $(".process_text-wrapper").each(function() {
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: $(this), // Utilisation de l'élément DOM pur pour ScrollTrigger
            start: "top 65%",   // Animation commence à 75% de l'écran
            end: "bottom 35%",     // Animation termine à 25% de l'écran
            ease: "linear",
            scrub: true,
        }
    });

    tl.from($(this), { opacity: 0.2, duration: 0.3 })  // Passe à 100%
      .to($(this), { opacity: 0.2, duration: 0.3, delay: 0.1}); // Reprend 50%
});
}