export function setLenis() {
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
}

//function to scroll back to top
export function scrollToTopInstant() {
  gsap.to(window, { scrollTo: { y: 0 } });
}

//function to scroll back to top
export function scrollToTop() {
  console.log("scroll");
  gsap.to(window, { scrollTo: 0, duration: 1, ease: "power2.out" });
}

export function setFooterScrollTop() {
  $(".footer_scrolltop_link").on("click", () => {
    scrollToTop();
  });
}
// function to make to clock working
export function updateClock() {
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
  $("[clock]").text("vannes, " + timeString);
}

export function setNavBarMenu() {
  gsap.set(".nav_blurbackdrop", { opacity: 0, display: "none" });
  // gsap.set(".nav_menu-container", { display: "none" });
  let isOpen = false;

  //Seting the timeline animation
  const navOpenTl = gsap.timeline({ paused: true });
  navOpenTl.set(".nav_menu-container", { display: "block" });
  navOpenTl.from(".nav_menu", {
    yPercent: -120,
    duration: 0.5,
    ease: "power3.inOut",
  });
  navOpenTl.to(
    ".nav_blurbackdrop",
    {
      opacity: 1,
      display: "block",
      ease: "power2.inOut",
      duration: 0.5,
    },
    "<"
  );
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

    delay = Math.random() * (0.06 - 0.01) + 0.01;
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

  navOpenTl.from(
    "[barcode-up] .barcode_track",
    {
      ease: "power2.inOut",
      duration: 0.5,
      yPercent: -120,
    },
    "<"
  );

  navOpenTl.from(
    "[barcode-down] .barcode_track",
    {
      ease: "power2.inOut",
      duration: 0.5,
      yPercent: 120,
    },
    "<"
  );

  //Select text, wrapp then in span, to animate the span later. giving overflow hidden to p elements
  $("[barcode-up] p, [barcode-down] p").each(function () {
    let $this = $(this);
    let text = $this.text();
    $this
      .empty()
      .append(
        $(
          "<span class='text-content' style='display: inline-block;'></span>"
        ).text(text)
      );
    $this.css("overflow", "hidden");
  });

  navOpenTl.from(
    ".nav_menu_animated-ico",
    {
      ease: "power2.inOut",
      duration: 0.5,
      opacity: 0,
    },
    "<"
  );

  navOpenTl.from(
    "[barcode-up] .nav_menu_link-sub .text-content, [barcode-down] .nav_menu_link-main .text-content",
    {
      ease: "power2.inOut",
      duration: 0.5,
      yPercent: 120,
      delay: 0.1,
    },
    "<"
  );

  navOpenTl.from(
    "[barcode-down] .nav_menu_link-sub .text-content, [barcode-up] .nav_menu_link-main .text-content",
    {
      ease: "power2.inOut",
      duration: 0.5,
      yPercent: -120,
      delay: 0.15,
    },
    "<"
  );

  navOpenTl.from(
    ".nav_menu_close_text .char",
    {
      ease: "power2.inOut",
      duration: 0.5,
      yPercent: -120,
    },
    "<"
  );

  navOpenTl.from(
    ".nav_menu_close_button .char",
    {
      ease: "power2.inOut",
      duration: 0.5,
      yPercent: 120,
    },
    "<"
  );

  $(".nav_menu_link-main p").css("padding", "0px 1px 0px 1px");

  $(".nav_button").click(function () {
    if (!isOpen) {
      navOpenTl.play();
      isOpen = true;
      disableScroll();
    }
  });

  $(".nav_menu_close_button").click(function () {
    if (isOpen == true) {
      navOpenTl.reverse();
      isOpen = false;
      enableScroll();
    }
  });
}

export function disableScroll() {
  $(".page-wrapper").css("overflow", "hidden");
  $(".page-wrapper").css("height", "100vh");
}

export function enableScroll() {
  $(".page-wrapper").css("overflow", "");
  $(".page-wrapper").css("height", "");
}

export function sectBarCodeMovement() {
  gsap.to(".barcode_track", {
    xPercent: -200,
    repeat: -1,
    ease: "linear",
    duration: Math.floor(Math.random() * 6) + 20,
  });
}

export function setParallax() {
  $("[parallax]").each(function () {
    let parallaxTl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top bottom",
        end: "bottom top",
        ease: "linear",
        scrub: true,
      },
    });
    parallaxTl.from($(this), { yPercent: 16.66, duration: 1 });
  });
}

export function setButtonHover() {
  $(".button").each(function () {
    const $btn = $(this).find(".button_second-row");
    const $text = $btn.find(".heading-style-h2");
    const $svg = $btn.find("svg");
    const $horizontal = $svg.find(".horizontal");
    const $vertical = $svg.find(".vertical");
    const $background = $btn.find(".button_background");

    $btn.on("mousemove", function (e) {
      const offset = $btn.offset();
      const width = $btn.outerWidth();
      const height = $btn.outerHeight();

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

    gsap.set([$horizontal, $vertical, $background], { opacity: 0 });

    $btn.on("mouseleave", function () {
      gsap.to([$horizontal, $vertical, $background], {
        opacity: 0,
        duration: 0.3,
      });

      gsap.to($text, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
      });
    });

    $btn.on("mouseenter", function () {
      gsap.to([$horizontal, $vertical, $background], {
        opacity: 1,
        duration: 0.3,
      });

      gsap.to($text, {
        opacity: 0.8,
        scale: 0.95,
        duration: 0.3,
      });
    });
  });
}


export function setFooterAppear() {
  let $footer = $(".footer");
  let $lines = $footer.find(".horizontal-line");
  let $clock = $footer.find("[clock]");

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: $footer,
      start: "90% bottom",
      end: "bottom bottom",
    },
  });

  $lines.each(function (index) {
    $(this).css("transform-origin", index % 2 === 0 ? "left" : "right");
  });

  tl.from($lines, {
    scaleX: 0,
    stagger: 0.05,
    duration: 0.5,
  });

  tl.from(
    $clock,
    {
      clipPath: "inset(100% 0 0 0)",
      duration: 0.35,
      delay: 0.3,
    },
    "<"
  );

  tl.from(
    $footer.find(".char"),
    {
      yPercent: 120,
      stagger: 0.002,
      duration: 0.35,
    },
    "<"
  );
}

export function setImageOnScroll() {
  let $images = $("[scale-on-scroll]");

  $images.each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top 40%",
        end: "bottom top",
      },
    });

    tl.from($(this), { scale: 0.8, duration: 0.7, ease: "power2.out" });
  });
}

export function setTextOnScroll() {
  let $texts = $("[appear-on-scroll]");

  $texts.each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top 40%",
        end: "bottom top",
      },
    });
    tl.from($(this).find(".char"), {
      yPercent: 120,
      stagger: 0.002,
      duration: 0.35,
    });
  });
}

export function setTransitionDimension() {
  //Abritrary choice. bigger t is, thinner and longer is the triangle
  const t = 2;

  const u = 1.5;

  //setting screen size
  const x = 100;
  const y = 100;

  // Compute point A (summit)
  const Ax = t * x;
  const Ay = -t * y;

  // s is the parametter defining the triangle
  const s = y / (2 - 1 / t);

  // compute rest of points
  const Bx = s;
  const By = s;
  const Cx = -s;
  const Cy = -s;

  $($("polygon")[0]).attr("points", `${Ax},${-Ay} ${Bx},${-By} ${Cx},${-Cy}`);
  $($("polygon")[1]).attr(
    "points",
    `${Ax},${-Ay} ${Bx * u},${-By * u} ${Cx * u},${-Cy * u}`
  );
}

export function transitionEntrance() {
  const angleBoard = 45;

  gsap.set(".transition_board-ellipse", {
    attr: { transform: `rotate(${angleBoard}, 0, 0)` },
  });

  let transitionEntranceTl = gsap.timeline({ delay: 0.3 });
  transitionEntranceTl.to($(".triangleGroup"), {
    attr: { transform: "translate(0, 0)" },
    duration: 1,
    ease: "power1.inOut",
    onStart: () => {
      gsap.set(".transition_wrapper", { display: "block" });
    },
    onComplete: () => {
      gsap.set($(".transition_wrapper"), { display: "none" });
      gsap.set($(".triangleGroup"), {
        attr: { transform: "translate(-1.50, -200)" },
      });
    },
  });

  transitionEntranceTl.to(
    ".transition_board-group",
    {
      duration: 1,
      ease: "power1.inOut",
      x: 200, // Ajuster en fonction de la position initiale
      y: 200, // Ajuster en fonction de la position initiale
    },
    "<"
  );
}

export function transitionExit(destination) {
  const pageTransitionTl = gsap.timeline();
  const transtionDuration = 0.2;
  gsap.set(".transition_panel-svg", {
    clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
  });

  pageTransitionTl.to(".transition_panel-svg", {
    clipPath: "polygon(0 56%, 100% 44%, 100% 100%, 0% 100%)",
    duration: transtionDuration,
    stagger: 0.05,
    ease: "power1.in",
    onStart: () => {
      gsap.set(".transition_wrapper", { display: "block" });
    },
  });

  pageTransitionTl.to(
    ".transition_panel-svg",
    {
      clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
      duration: transtionDuration,
      delay: transtionDuration,
      stagger: 0.05,
      ease: "power1.out",
      onComplete: () => {
        window.location = destination;
      },
    },
    "<"
  );
}

export function setPageTransition() {
  setTransitionDimension();
  // Code that runs on pageload

  if (
    window.location.pathname !== "/" ||
    sessionStorage.getItem("visited") === "true"
  ) {
    transitionEntrance();
    sessionStorage.setItem("visited", "true");
  } else if (sessionStorage.getItem("visited") !== "true") {
    sessionStorage.setItem("visited", "true");
  }

  // Code that runs on click of a link

  $("a").on("click", function (e) {
    if (
      $(this).prop("hostname") === window.location.host &&
      $(this).attr("href").indexOf("#") === -1 &&
      $(this).attr("target") !== "_blank"
    ) {
      e.preventDefault();
      let destination = $(this).attr("href");

      transitionExit(destination);
    }
  });

  window.onpageshow = function (event) {
    if (event.persisted) {
      window.location.reload();
    }
  };
}

export function setLinkHover() {
  $("a").hover(
    function () {
      const hoveredLink = this;

      $("h1, h2, h3, h4, h5, h6, p, span, li, a").each(function () {
        const el = this;
        if (
          el === hoveredLink ||
          hoveredLink.contains(el) ||
          el.contains(hoveredLink)
        ) {
          return;
        }
        gsap.to(el, { opacity: 0.7, duration: 0.3 });
      });
    },
    function () {
      gsap.to("h1, h2, h3, h4, h5, h6, p, span, li, a", {
        opacity: 1,
        duration: 0.3,
      });
    }
  );
}

export function setPatchAppearOnScroll() {
  $(".patch").each(function () {
    const patchTl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top 40%",
        end: "bottom top",
      },
    });

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
    patchTl.from($(this).find(".char"), {
      yPercent: 120,
      stagger: 0.002,
      duration: 0.35,
    });
    patchTl.from(
      $(this).find("img"),
      {
        yPercent: -120,
        stagger: 0.002,
        duration: 0.35,
      },
      "<"
    );
  });
}

export function setPatchAppear() {
  $(".patch").each(function () {
    const patchTl = gsap.timeline({});

    const patchSplitType = window.SplitType;
    let patchTypeSplit = new patchSplitType($(this).find("p"), {
      types: "words, chars",
      tagName: "span",
    });

    patchTl.from($(this), {
      duration: 1
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
    patchTl.from($(this).find(".char"), {
      yPercent: 120,
      stagger: 0.002,
      duration: 0.35,
    });
    patchTl.from(
      $(this).find("img"),
      {
        yPercent: -120,
        stagger: 0.002,
        duration: 0.35,
      },
      "<"
    );
  });
}

export function setButtonAppearOnScroll() {
  $(".button").each(function () {
    const buttonTl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top 70%",
        end: "bottom top",
      },
    });

    const buttonSplitType = window.SplitType;
    let buttonTypeSplit = new buttonSplitType($(this).find("p"), {
      types: "words, chars",
      tagName: "span",
    });

    buttonTl.from($(this), {
      scaleY: 0,
      transformOrigin: "bottom",
      duration: 0.5,
      ease: "power2.out",
    });
    buttonTl.from($(this).find(".horizontal-line"), {
      scaleX: 0,
      duration: 0.5,
      transformOrigin: "left",
      ease: "power2.out",
      stagger: 0.1,
    });
    buttonTl.from(
      $(this).find(".char"),
      {
        yPercent: 120,
        stagger: 0.002,
        duration: 0.4,
      },
      "<"
    );
    buttonTl.from(
      $(this).find(".barcode_contain"),
      {
        scaleY: 0,
        duration: 0.5,
        transformOrigin: "bottom",
        ease: "power2.out",
        stagger: 0.1,
      },
      "<"
    );
  });
}

export function setButtonAppear() {
  $(".button").each(function () {
    const buttonTl = gsap.timeline({});

    const buttonSplitType = window.SplitType;
    let buttonTypeSplit = new buttonSplitType($(this).find("p"), {
      types: "words, chars",
      tagName: "span",
    });

     buttonTl.from($(this), {duration: 1})
    buttonTl.from($(this), {
      scaleY: 0,
      transformOrigin: "bottom",
      duration: 0.5,
      ease: "power2.out",
    });
    buttonTl.from($(this).find(".horizontal-line"), {
      scaleX: 0,
      duration: 0.5,
      transformOrigin: "left",
      ease: "power2.out",
      stagger: 0.1,
    });
    buttonTl.from(
      $(this).find(".char"),
      {
        yPercent: 120,
        stagger: 0.002,
        duration: 0.4,
      },
      "<"
    );
    buttonTl.from(
      $(this).find(".barcode_contain"),
      {
        scaleY: 0,
        duration: 0.5,
        transformOrigin: "bottom",
        ease: "power2.out",
        stagger: 0.1,
      },
      "<"
    );
  });
}

export function LottieScrollTrigger(vars) {
  let playhead = { frame: 0 },
    target = gsap.utils.toArray(vars.target)[0],
    speeds = { slow: '+=2000', medium: '+=1000', fast: '+=500' },
    st = {
      trigger: target,
      pin: true,
      start: 'top top',
      end: speeds[vars.speed] || '+=1000',
      scrub: 1,
    },
    animation = lottie.loadAnimation({
      container: target,
      renderer: vars.renderer || 'svg',
      loop: false,
      autoplay: false,
      path: vars.path,
      animationData: vars.animationData,
    });
  for (let p in vars) {
    // let users override the ScrollTrigger defaults
    st[p] = vars[p];
  }
  animation.addEventListener('DOMLoaded', function () {
    gsap.to(playhead, {
      duration: vars.duration || 0.5,
      delay: vars.delay || 0,
      frame: animation.totalFrames - 1,
      ease: vars.ease || 'none',
      onUpdate: () => animation.goToAndStop(playhead.frame, true),
      scrollTrigger: st,
    });
    // in case there are any other ScrollTriggers on the page and the loading of this Lottie asset caused layout changes
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  });

  return animation;
}
