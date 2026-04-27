const menuButton = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");
const typingElement = document.getElementById("typing");
const titleSmoke = document.querySelector(".title-smoke");
const topButton = document.getElementById("btn-topo");
const whatsappButton = document.getElementById("btn-whatsapp");
const revealElements = document.querySelectorAll(".reveal");
const productCards = document.querySelectorAll(".product-card");
const heroButtons = document.querySelectorAll(".hero-actions a");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");

    menuButton.classList.toggle("is-active", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuButton.classList.remove("is-active");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

function decodeHtmlText(text) {
  const parser = document.createElement("textarea");
  parser.innerHTML = text;
  return parser.value;
}

function runTypingEffect() {
  if (!typingElement) {
    return;
  }

  const fullText = decodeHtmlText(typingElement.dataset.text || "");
  let currentIndex = 0;

  typingElement.textContent = "";

  const typeNextCharacter = () => {
    if (currentIndex >= fullText.length) {
      return;
    }

    typingElement.textContent += fullText.charAt(currentIndex);
    currentIndex += 1;

    const nextDelay = currentIndex < 6 ? 34 : 24;
    window.setTimeout(typeNextCharacter, nextDelay);
  };

  window.setTimeout(typeNextCharacter, 140);
}

function setupRevealAnimation() {
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -60px 0px",
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function setupTopButton() {
  if (!topButton) {
    return;
  }

  const toggleButtonVisibility = () => {
    topButton.classList.toggle("show", window.scrollY > 320);
  };

  window.addEventListener("scroll", toggleButtonVisibility, { passive: true });
  toggleButtonVisibility();

  topButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

function setupWhatsAppButton() {
  if (!whatsappButton) {
    return;
  }

  whatsappButton.addEventListener("click", () => {
    const phoneNumber = "5599999999999";
    const message = "Ola, tenho interesse em um veiculo!";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener");
  });
}

function setupProductCards() {
  if (!productCards.length) {
    return;
  }

  const touchMedia = window.matchMedia("(hover: none)");

  productCards.forEach((card) => {
    card.addEventListener("pointerenter", () => {
      if (touchMedia.matches) {
        return;
      }

      card.classList.add("is-active");
    });

    card.addEventListener("pointerleave", () => {
      if (touchMedia.matches) {
        return;
      }

      card.classList.remove("is-active");
    });

    card.addEventListener("click", () => {
      if (!touchMedia.matches) {
        return;
      }

      productCards.forEach((item) => {
        if (item !== card) {
          item.classList.remove("is-active");
        }
      });

      card.classList.toggle("is-active");
    });
  });
}

function setupHeroButtons() {
  if (!heroButtons.length || !window.matchMedia("(hover: hover)").matches) {
    return;
  }

  heroButtons.forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const bounds = button.getBoundingClientRect();
      const offsetX = event.clientX - bounds.left - bounds.width / 2;
      const offsetY = event.clientY - bounds.top - bounds.height / 2;
      const shiftX = Math.max(-10, Math.min(10, offsetX * 0.12));
      const shiftY = Math.max(-8, Math.min(8, offsetY * 0.12));

      button.style.setProperty("--button-shift-x", `${shiftX}px`);
      button.style.setProperty("--button-shift-y", `${shiftY}px`);
      button.style.setProperty("--glow-shift-x", `${shiftX * 1.6}px`);
      button.style.setProperty("--glow-shift-y", `${shiftY * 1.6}px`);
      button.classList.add("is-magnetic");
    });

    button.addEventListener("pointerleave", () => {
      button.style.setProperty("--button-shift-x", "0px");
      button.style.setProperty("--button-shift-y", "0px");
      button.style.setProperty("--glow-shift-x", "0px");
      button.style.setProperty("--glow-shift-y", "0px");
      button.classList.remove("is-magnetic");
    });
  });
}

function setupTitleRepel() {
  if (!typingElement || !titleSmoke || !window.matchMedia("(hover: hover)").matches) {
    return;
  }

  titleSmoke.addEventListener("pointermove", (event) => {
    const bounds = titleSmoke.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    const distanceX = event.clientX - centerX;
    const distanceY = event.clientY - centerY;
    const normalizedX = distanceX / (bounds.width / 2 || 1);
    const normalizedY = distanceY / (bounds.height / 2 || 1);
    const shiftX = Math.max(-18, Math.min(18, -normalizedX * 16));
    const shiftY = Math.max(-12, Math.min(12, -normalizedY * 10));

    typingElement.style.setProperty("--title-shift-x", `${shiftX}px`);
    typingElement.style.setProperty("--title-shift-y", `${shiftY}px`);
    titleSmoke.classList.add("is-repelling");
  });

  titleSmoke.addEventListener("pointerleave", () => {
    typingElement.style.setProperty("--title-shift-x", "0px");
    typingElement.style.setProperty("--title-shift-y", "0px");
    titleSmoke.classList.remove("is-repelling");
  });
}

window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-loaded");

  runTypingEffect();
  setupRevealAnimation();
  setupTopButton();
  setupWhatsAppButton();
  setupProductCards();
  setupHeroButtons();
  setupTitleRepel();
});
