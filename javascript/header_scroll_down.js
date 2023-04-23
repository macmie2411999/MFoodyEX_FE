window.addEventListener("scroll", function () {
    const header = document.querySelector(".container_navbar_top_header");
    header.classList.toggle("scrolled", window.scrollY > 0);
  });