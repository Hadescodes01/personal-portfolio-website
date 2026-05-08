/* =============================================
   script.js — Thanaa Alamutu Portfolio
   ============================================= */

// Wait for the whole page to load before running any JS.
// This is the fix for the slideshow not showing on VS Code Live Server.
document.addEventListener("DOMContentLoaded", function () {

/* ---- 1. MOBILE NAV TOGGLE ---- */
// Adds a hamburger menu button on small screens
// When tapped, it slides the nav links in and out

const nav = document.querySelector("nav ul");

// Create the hamburger button
const menuBtn = document.createElement("div");
menuBtn.id = "menu-btn";
menuBtn.innerHTML = "&#9776;"; // ☰ icon
document.querySelector("nav").appendChild(menuBtn);

menuBtn.addEventListener("click", function () {
  nav.classList.toggle("nav-open");
});

// Close the menu when a link is tapped (good UX on mobile)
document.querySelectorAll("nav ul li a").forEach(function (link) {
  link.addEventListener("click", function () {
    nav.classList.remove("nav-open");
  });
});


/* ---- 2. TAB SWITCHING (moved from index.html) ---- */

var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname, event) {
  for (let tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (let tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

// Make opentab available globally (called from onclick in HTML)
window.opentab = opentab;


/* ---- 3. SLIDESHOW (about section) ---- */

var slides = document.querySelectorAll(".about-slide");
var current = 0;

function nextSlide() {
  slides[current].classList.remove("active");
  current = (current + 1) % slides.length;
  slides[current].classList.add("active");
}

setInterval(nextSlide, 3500);


/* ---- 4. ACTIVE NAV LINK on scroll ---- */
// Highlights the correct nav link as you scroll through sections

const sections = document.querySelectorAll("div[id], section[id]");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", function () {
  let current = "";

  sections.forEach(function (section) {
    // If the section top is within 200px of the top of the viewport, mark it active
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(function (link) {
    link.classList.remove("active-nav");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active-nav");
    }
  });
});


/* ---- 6. SCROLL FADE-IN for sections ---- */
// Sections gently fade in as you scroll down to them
// Uses IntersectionObserver — no extra libraries needed

const fadeEls = document.querySelectorAll(
  "#about, #achievements .card, #hobbies .hobby-item, #contact"
);

const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // only animate once
      }
    });
  },
  { threshold: 0.15 }
);

fadeEls.forEach(function (el) {
  el.classList.add("fade-in");
  observer.observe(el);
});

}); // end DOMContentLoaded
