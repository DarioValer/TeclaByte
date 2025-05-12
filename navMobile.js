const nav = document.querySelector(".mobile-nav");
const toggle = nav?.querySelector(".menu-toggle");

if (nav && toggle) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}
