import { BLOG } from './model/blog.js';

const blogsPerPage = 8;
let currentPage = 1;

const blogsGeneral = [
    new BLOG('https://chooseveg.com/switch/', 'https://file-cdn.mercyforanimals.org/mercy4animals.wpengine.com/sites/445/2018/11/switch-link-vegan-diet6-768x475.jpg', 'Make the Move', 'Want to eat more delicious plant-based food? Here’s how to do it.'),
    new BLOG('https://chooseveg.com/eat/', 'https://file-cdn.mercyforanimals.org/mercy4animals.wpengine.com/sites/445/2018/11/eat-link-vegan-diet-768x475.jpg', 'Get Food Now', 'Mouthwatering meat-free meals are just a click away. Get groceries, takeout, meal kits, and more'),
    new BLOG('https://chooseveg.com/take-action/', 'https://file-cdn.mercyforanimals.org/mercy4animals.wpengine.com/sites/445/2022/01/CV-Take-Action-Homepage.png', 'Take Action', 'Looking for more plant-based options at restaurants? Let’s bring home the vegan bacon!'),
    new BLOG('https://chooseveg.com/blog/', 'https://file-cdn.mercyforanimals.org/mercy4animals.wpengine.com/sites/445/2018/11/blog-social-image-vegetarian-diet-768x480.jpg', 'The Latest', 'Meal tips, new products, and adorable videos. What more could you want?'),
    new BLOG('https://chooseveg.com/corporate/', 'https://file-cdn.mercyforanimals.org/mercy4animals.wpengine.com/sites/445/2022/01/CV-Corp-Homepage.png', 'Corporate Connections', 'Calling all food-industry leaders looking for plant-based consulting!'),
    new BLOG('https://mealplanner.chooseveg.com/?utm_source=chooseveg&utm_content=home&utm_medium=card', 'https://file-cdn.mercyforanimals.org/mercy4animals.wpengine.com/sites/445/2018/11/mealplanner_cta_home-1-768x475.jpg', 'Get Extra Help', 'Discover deliciousness with a personalized meal planner and caring food coaches by your side.'),
    new BLOG('https://chooseveg.com/switch/', 'https://file-cdn.mercyforanimals.org/mercy4animals.wpengine.com/sites/445/2018/11/switch-link-vegan-diet6-768x475.jpg', 'Make the Move', 'Want to eat more delicious plant-based food? Here’s how to do it.'),
    new BLOG('https://chooseveg.com/eat/', 'https://file-cdn.mercyforanimals.org/mercy4animals.wpengine.com/sites/445/2018/11/eat-link-vegan-diet-768x475.jpg', 'Get Food Now', 'Mouthwatering meat-free meals are just a click away. Get groceries, takeout, meal kits, and more'),
    new BLOG('https://chooseveg.com/take-action/', 'https://file-cdn.mercyforanimals.org/mercy4animals.wpengine.com/sites/445/2022/01/CV-Take-Action-Homepage.png', 'Take Action<', 'Looking for more plant-based options at restaurants? Let’s bring home the vegan bacon!'),
    new BLOG('https://chooseveg.com/blog/', 'https://file-cdn.mercyforanimals.org/mercy4animals.wpengine.com/sites/445/2018/11/blog-social-image-vegetarian-diet-768x480.jpg', 'The Latest', 'Meal tips, new products, and adorable videos. What more could you want?')
];

function createBlogCard(blog) {
    return `
        <a href=${blog.ulrSource} target="" class="link-card">
            <div class="image-link-card"><img 
                src=${blog.urlImage}
                class="attachment-search-and-blogs size-search-and-blogs" alt="" decoding="async" loading="lazy" />
            </div>
            <div class="content-link-card">
                <h3 class="title-link-card">${blog.titleBlog}</h3>
                <div class="text-link-card">
                    <p>${blog.contentBlog}</p>
                </div>
                <p class="button-link-card">
                    <span class="text-button-link-card">Show Me</span>
                    <span class="icon-button-link-card"><i class="fa-solid fa-angle-right"></i></span>
                </p>
            </div>
        </a> `;
}

// function showBlogs() {
//     const blogList = $("#blogList");
//     blogList.empty();

//     const startIndex = (currentPage - 1) * blogsPerPage;
//     const endIndex = Math.min(startIndex + blogsPerPage, blogsGeneral.length);

//     for (let i = startIndex; i < endIndex; i++) {
//         blogList.append(createBlogCard(blogsGeneral[i]));
//     }
// }

function showBlogs() {
    const blogList = $("#blogList");
    blogList.addClass("fade");
    
    setTimeout(() => {
        blogList.empty();

        const startIndex = (currentPage - 1) * blogsPerPage;
        const endIndex = Math.min(startIndex + blogsPerPage, blogsGeneral.length);

        for (let i = startIndex; i < endIndex; i++) {
            blogList.append(createBlogCard(blogsGeneral[i]));
        }

        blogList.removeClass("fade");
    }, 500);
}


function updatePagination() {
    const pagination = $("#pagination");
    pagination.empty();

    const totalPages = Math.ceil(blogsGeneral.length / blogsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const btn = $(`<button class="page-btn">${i}</button>`);
        btn.click(() => {
            currentPage = i;
            showBlogs();
            updatePagination();
        });

        if (i === currentPage) {
            btn.addClass("active");
        }

        pagination.append(btn);
    }
}

$("#prevBtn").click(() => {
    if (currentPage > 1) {
        currentPage--;
        showBlogs();
        updatePagination();
    }
});

$("#nextBtn").click(() => {
    const totalPages = Math.ceil(blogsGeneral.length / blogsPerPage);

    if (currentPage < totalPages) {
        currentPage++;
        showBlogs();
        updatePagination();
    }
});

showBlogs();
updatePagination();
