document.addEventListener('DOMContentLoaded', function () {
    // Select all elements with the class 'splide-slider'
    var splideSliders = document.querySelectorAll('.splide-slider-CD');

    // Iterate through all the sliders and initialize them
    splideSliders.forEach(function(slider, index) {
        var splideInstance = new Splide(slider, {
            type: 'loop',
            perPage: 3,
            rewind: true,
            autoplay: false,
            interval: 4000,
            speed: 2000,
            pauseOnHover: false,
            pauseOnFocus: false,
        }).mount();

    });
});
