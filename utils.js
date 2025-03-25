//function to scroll back to top
export function scrollToTopInstant() {
  gsap.to(window, { scrollTo: { y: 0 } });
}

//function to scroll back to top
export function scrollToTop() {
  gsap.to(window, { scrollTo: 0, duration: 1, ease: "power2.out" });
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
  gsap.set(".nav_menu-container", { display: "none" });
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
      delay: 0.2,
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

  $(".nav_button").click(function () {
    if (!isOpen) {
      navOpenTl.play();
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
        duration: 0.2,
      });
    });

    $btn.on("mouseenter", function () {
      gsap.to([$horizontal, $vertical, $background], {
        opacity: 1,
        duration: 0.2,
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
      yPercent: 120,
      opacity: 0,
      duration: 0.35,
      delay: 1.2,
    },
    "<"
  );

  tl.from(
    $footer.find(".char"),
    {
      yPercent: 120,
      stagger: 0.002,
      duration: 0.35,
      delay: 0.3,
    },
    "<"
  );
}
