
$(document).ready(function () {
  $('.carousel-slider').slick({
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    arrows: false,
    speed: 1000,
    fade: true,
    cssEase: 'linear'
  });


  $('.slick-prev').click(function () {
    $('.carousel-slider').slick('slickPrev');
  });

  $('.slick-next').click(function () {
    $('.carousel-slider').slick('slickNext');
  });
});
