$(document).ready(function () {
    //-- Click on detail
    // Ẩn tất cả các container-content-bottom-product-detail trừ container-content-bottom-product-detail.active
    $(".container-content-bottom-product-detail").not(".active").hide();
    $("ul.menu-items > li").on("click", function () {
        // Remove active class from all menu items
        $("ul.menu-items > li").removeClass("active");

        // Add active class to clicked menu item
        $(this).addClass("active");

        // Hide all content containers
        $(".container-content-bottom-product-detail").hide();

        // Show the corresponding content container based on the clicked menu item's data attribute
        $("#" + $(this).data("content")).show();
    });
});

// Zoom Image Start
const productImage = document.getElementById("product-image");
const magnifier = document.getElementById("magnifier");

productImage.addEventListener("mousemove", (e) => {
    magnifier.style.display = "block";
    const rect = productImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const zoomLevel = 0.5;
    const scaleX = productImage.naturalWidth / productImage.clientWidth * zoomLevel;
    const scaleY = productImage.naturalHeight / productImage.clientHeight * zoomLevel;

    magnifier.style.backgroundImage = `url('${productImage.src}')`;
    magnifier.style.backgroundSize = `${productImage.clientWidth * scaleX}px ${productImage.clientHeight * scaleY}px`;
    magnifier.style.backgroundPosition = `-${x * scaleX - 10}px -${y * scaleY - 10}px`;

    magnifier.style.left = `${x - 10}px`;
    magnifier.style.top = `${y - 10}px`;
});

productImage.addEventListener("mouseout", () => {
    magnifier.style.display = "none";
});

productImage.style.cursor = "none";

// Zoom Image End

// Rating Stars Start
function displayRating(rating) {
    const ratingStars = document.querySelectorAll('.rating .fa-star');
    const fullStars = Math.floor(rating);
    const hasHalfStar = (rating - fullStars) >= 0.5;

    for (let i = 0; i < ratingStars.length; i++) {
        if (i < fullStars) {
            ratingStars[i].classList.add('yellow');
        } else if (i === fullStars && hasHalfStar) {
            ratingStars[i].classList.add('fas', 'fa-star-half-alt', 'yellow');
        } else {
            ratingStars[i].classList.add('gray');
        }
    }
}

// Thay đổi giá trị này để kiểm tra chức năng với các rating khác nhau
const productRating = 4.7;
displayRating(productRating);
// Rating Stars End

// Scroll Button
function scrollLeftSM() {
    let scrollingContainer = document.querySelector(".scrolling-container");
    scrollingContainer.scrollBy({ top: 0, left: -300, behavior: 'smooth' });
    setTimeout(updateArrows, 300);
}

function scrollRightSM() {
    let scrollingContainer = document.querySelector(".scrolling-container");
    scrollingContainer.scrollBy({ top: 0, left: 300, behavior: 'smooth' });
    setTimeout(updateArrows, 300);
}


