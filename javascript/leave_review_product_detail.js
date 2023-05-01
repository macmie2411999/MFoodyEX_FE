const stars = document.querySelectorAll('.star');
const ratingInput = document.getElementById('rating');
const form = document.getElementById('rating-form');
const commentInput = document.getElementById('comment');

stars.forEach((star) => {
    star.addEventListener('mouseenter', () => {
        const rating = star.dataset.rating;
        fillStars(rating);
    });

    star.addEventListener('click', () => {
        ratingInput.value = star.dataset.rating;
    });
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const rating = ratingInput.value;
    const comment = commentInput.value.trim();

    if (!rating || !comment) {
        alert('Please provide full review information!');
        return;
    }

    console.log(`Rating: ${rating}, Comment: ${comment}`);
    // Gửi thông tin đánh giá sản phẩm tại đây
});

function fillStars(rating) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.style.color = 'gold';
        } else {
            star.style.color = '#ccc';
        }
    });
}

document.body.addEventListener('mouseleave', () => {
    const rating = ratingInput.value;
    fillStars(rating);
});
