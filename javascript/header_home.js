$(".carousel-slider").slick({
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    mobileFirst: true
});

$('.carousel-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    $(slick.$slides[currentSlide]).removeClass('active');
  });
  
  $('.carousel-slider').on('afterChange', function (event, slick, currentSlide) {
    $(slick.$slides[currentSlide]).addClass('active');
  });