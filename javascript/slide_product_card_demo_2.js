document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded triggered');

    var splide = new Splide('.splide', {
        type: 'loop',
        perPage: 3,
        rewind: true,
        autoplay: true,
        interval: 3000,
        speed: 2000,
        pauseOnHover: false,
        pauseOnFocus: false,
    }).mount();

    console.log('Splide initialized');
});
