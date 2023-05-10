// Scroll Button
function scrollLeftSM() {
    let scrollingContainer = document.querySelector(".scrolling-container");
    scrollingContainer.scrollBy({ top: 0, left: -300, behavior: 'smooth' });
    setTimeout(300);
}

function scrollRightSM() {
    let scrollingContainer = document.querySelector(".scrolling-container");
    scrollingContainer.scrollBy({ top: 0, left: 300, behavior: 'smooth' });
    setTimeout(300);
}
