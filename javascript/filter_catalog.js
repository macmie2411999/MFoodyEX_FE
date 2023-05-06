function updatePriceSlider() {
    const lower = parseInt(document.getElementById('price-range-lower').value);
    const upper = parseInt(document.getElementById('price-range-upper').value);

    $("#price-range-slider").slider("values", [lower, upper]);
}

document.addEventListener('DOMContentLoaded', function () {
    $("#price-range-slider").slider({
        range: true,
        min: 0,
        max: 10000,
        step: 10,
        values: [0, 10000],
        slide: function (event, ui) {
            document.getElementById('price-range-lower').value = ui.values[0];
            document.getElementById('price-range-upper').value = ui.values[1];
        }
    });

    updatePriceSlider();
});
