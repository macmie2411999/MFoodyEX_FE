document.addEventListener('DOMContentLoaded', function () {
    // Select all elements with the class 'splide-slider'
    let splideSliders = document.querySelectorAll('.splide-slider-CD');

    // Iterate through all the sliders and initialize them
    splideSliders.forEach(function (slider, index) {
        let splideInstance = new Splide(slider, {
            type: 'loop',
            perPage: 3,
            rewind: true,
            autoplay: true,
            interval: 3000,
            speed: 1000,
            pauseOnHover: false,
            pauseOnFocus: false,
        }).mount();

        // Get the next button element
        let nextButton = slider.querySelector('.splide__arrow--next');

        // Add event listener for the next button click
        nextButton.addEventListener('click', function () {
            console.log("click")
            splideInstance.go('<');
        });

        // Get the previous button element
        let prevButton = slider.querySelector('.splide__arrow--prev');

        // Add event listener for the previous button click
        prevButton.addEventListener('click', function () {
            splideInstance.go('>');
        });

    });
});
