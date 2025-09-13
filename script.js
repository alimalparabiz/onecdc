document.addEventListener("DOMContentLoaded", () => {
  /**
   * Mobile Navigation Toggle
   * Why: Manages the open/close state of the mobile navigation menu.
   */
  const menuToggle = document.querySelector(".header__menu-toggle");
  const nav = document.querySelector(".header__nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", !isExpanded);
      nav.classList.toggle("is-open");
    });

    // Close menu when a link is clicked
    const navLinks = nav.querySelectorAll(".header__nav-link, .header__button");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (nav.classList.contains("is-open")) {
          menuToggle.setAttribute("aria-expanded", "false");
          nav.classList.remove("is-open");
        }
      });
    });
  }

  /**
   * Interactive Hero Chat Mockup
   * Why: Creates an authentic, animated chat sequence to engage users immediately.
   */
  const chatBody = document.getElementById("chat-body");
  const chatSequence = [
    {
      type: "bot",
      text: "Welcome! I'm your personal dining assistant. What are you in the mood for tonight?",
      delay: 500,
    },
    {
      type: "user",
      text: "I'm craving something with Korean flavors, but make it vegetarian.",
      delay: 2000,
    },
    { type: "typing", delay: 1200 },
    {
      type: "bot",
      text: "An excellent choice! Based on our chef's notes, you'll love the Gochujang Glazed Paneer Skewers. It has that perfect spicy-sweet kick.",
      delay: 3000,
    },
    { type: "typing", delay: 1200 },
    {
      type: "bot",
      text: "That pairs wonderfully with our signature Sparkling Mint Lemonade. Shall I add one?",
      delay: 2500,
    },
    { type: "user", text: "Yes, please!", delay: 1500 },
  ];

  function playChatAnimation() {
    if (!chatBody) return;
    chatBody.innerHTML = ""; // Clear previous animation
    let cumulativeDelay = 0;

    chatSequence.forEach((message) => {
      cumulativeDelay += message.delay;
      setTimeout(() => {
        const typingIndicator = chatBody.querySelector(".hero__chat-typing");
        if (typingIndicator) {
          typingIndicator.remove();
        }

        const el = document.createElement("div");
        if (message.type === "typing") {
          el.classList.add("hero__chat-typing");
          el.innerHTML = "<span></span><span></span><span></span>";
        } else {
          el.classList.add(
            "hero__chat-message",
            `hero__chat-message--${message.type}`
          );
          el.textContent = message.text;
        }
        chatBody.appendChild(el);
        chatBody.scrollTop = chatBody.scrollHeight;
      }, cumulativeDelay);
    });
  }

  if (chatBody) {
    const chatObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playChatAnimation();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    chatObserver.observe(chatBody);
  }

  /**
   * Animate elements on scroll
   * Why: Adds a subtle fade-in effect to sections as they enter the viewport.
   */
  const animatedElements = document.querySelectorAll(".animate-on-scroll");
  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          scrollObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  animatedElements.forEach((element) => {
    scrollObserver.observe(element);
  });
});
