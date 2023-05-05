window.addEventListener("scroll", function () {
    const header = document.querySelector(".navbar_top_header");
    header.classList.toggle("scrolled", window.scrollY > 0);
  });