import { BLOG } from './model/blog.js';

const productsPerPage = 10;
let currentPage = 1;

var arrayAllProducts = customLocalStorage.getItemFromLocalStorage("MFoody - arrayAllProducts");

// Check arrays valid
if (arrayAllProducts === null || arrayAllProducts.length === 0) {
    console.log("MFoody - arrayAllProducts is not valid!");
    // Automatically call APIs when page is loaded
    getAllProductsApi();
    arrayAllProducts = customLocalStorage.getItemFromLocalStorage("MFoody - arrayAllProducts");
} 

// var remainProducts = 
var productsGeneral = processlistProducts.getRandomProducts(processlistProducts.getRemainingProducts(
    arrayAllProducts, processlistProducts.getDiscountedlistProducts(arrayAllProducts).slice(0, 20),
    processlistProducts.sortByRatingDesc(arrayAllProducts).slice(0, 20),
    processlistProducts.sortByNewnessDesc(arrayAllProducts).slice(0, 20)), 100);

// const productsGeneral = [
//     new BLOG('https://chooseveg.com/switch/', 'https://file-cdn.mercyforanimals.org/mercy4animals.wpengine.com/sites/445/2018/11/switch-link-vegan-diet6-768x475.jpg', 'Make the Move', 'Want to eat more delicious plant-based food? Here’s how to do it.'),
//     new BLOG('https://chooseveg.com/eat/', 'https://file-cdn.mercyforanimals.org/mercy4animals.wpengine.com/sites/445/2018/11/eat-link-vegan-diet-768x475.jpg', 'Get Food Now', 'Mouthwatering meat-free meals are just a click away. Get groceries, takeout, meal kits, and more'),
//     new BLOG('https://chooseveg.com/take-action/', 'https://file-cdn.mercyforanimals.org/mercy4animals.wpengine.com/sites/445/2022/01/CV-Take-Action-Homepage.png', 'Take Action<', 'Looking for more plant-based options at restaurants? Let’s bring home the vegan bacon!'),
//     new BLOG('https://chooseveg.com/blog/', 'https://file-cdn.mercyforanimals.org/mercy4animals.wpengine.com/sites/445/2018/11/blog-social-image-vegetarian-diet-768x480.jpg', 'The Latest', 'Meal tips, new products, and adorable videos. What more could you want?'),
//     new BLOG('https://chooseveg.com/corporate/', 'https://file-cdn.mercyforanimals.org/mercy4animals.wpengine.com/sites/445/2022/01/CV-Corp-Homepage.png', 'Corporate Connections', 'Calling all food-industry leaders looking for plant-based consulting!'),
//     new BLOG('https://mealplanner.chooseveg.com/?utm_source=chooseveg&utm_content=home&utm_medium=card', 'https://file-cdn.mercyforanimals.org/mercy4animals.wpengine.com/sites/445/2018/11/mealplanner_cta_home-1-768x475.jpg', 'Get Extra Help', 'Discover deliciousness with a personalized meal planner and caring food coaches by your side.'),
//     new BLOG('https://chooseveg.com/switch/', 'https://file-cdn.mercyforanimals.org/mercy4animals.wpengine.com/sites/445/2018/11/switch-link-vegan-diet6-768x475.jpg', 'Make the Move', 'Want to eat more delicious plant-based food? Here’s how to do it.'),
//     new BLOG('https://chooseveg.com/eat/', 'https://file-cdn.mercyforanimals.org/mercy4animals.wpengine.com/sites/445/2018/11/eat-link-vegan-diet-768x475.jpg', 'Get Food Now', 'Mouthwatering meat-free meals are just a click away. Get groceries, takeout, meal kits, and more'),
//     new BLOG('https://chooseveg.com/take-action/', 'https://file-cdn.mercyforanimals.org/mercy4animals.wpengine.com/sites/445/2022/01/CV-Take-Action-Homepage.png', 'Take Action<', 'Looking for more plant-based options at restaurants? Let’s bring home the vegan bacon!'),
//     new BLOG('https://chooseveg.com/blog/', 'https://file-cdn.mercyforanimals.org/mercy4animals.wpengine.com/sites/445/2018/11/blog-social-image-vegetarian-diet-768x480.jpg', 'The Latest', 'Meal tips, new products, and adorable videos. What more could you want?')
// ];

// function createProductCard(product) {

//     // Process Present Ratting Of Products
//     let ratingClass = product.ratingProduct > 0 ? 'active-rating' : 'inactive-rating';

//     return `
//     <div class="card" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
//         <span class="tag-product"> New Product </span>
//         <span class="heart-icon"> <i class="fa-solid fa-heart"></i> </span>
//         <img src="../image/products/${product.albumProduct}.webp" class="card-img-top" alt="...">
//         <div class="card-body">
//             <span class="rated-star card-text"><i class="fa-solid fa-star ${ratingClass}"></i> ${product.ratingProduct} </span>
//             <h5 class="card-title">${product.nameProduct}</h5>
//         </div>
//         <div class="card-footer">
//             <button class="tag-prices">
//                 <span class="tag-sale-price">${product.salePriceProduct}₽</span>
//                 <span class="tag-full-price">${product.fullPriceProduct}₽</span>
//             </button>
//             <button class="more-infor"> <a href="../detail.html?idProduct=1"><i class="fa-solid fa-magnifying-glass"></i></a></button>
//             <button class="to-cart"><i class="fa-solid fa-cart-plus"></i></button>
//         </div>
//     </div>`;
// }

function createProductCard(product) {
    // Process Present Rating Of Products
    let ratingClass = product.ratingProduct > 0 ? 'active-rating' : 'inactive-rating';

    // Create tags for the product
    let tags = processlistProducts.generateProductTags(product, 4, 50, 10, '22/01/1999');

    let tagsHtml = tags.map(tag => `<span class="tag-product ${tag}"> ${tag} </span>`).join('');

    return `
    <div class="card" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        <div class="tag-container">
            ${tagsHtml}
        </div>
        <span class="heart-icon"> <i class="fa-solid fa-heart"></i> </span>
        <img src="../image/products/${product.albumProduct}.webp" class="card-img-top" alt="...">
        <div class="card-body">
            <span class="rated-star card-text"><i class="fa-solid fa-star ${ratingClass}"></i> ${product.ratingProduct} </span>
            <h5 class="card-title">${product.nameProduct}</h5>
        </div>
        <div class="card-footer">
            <button class="tag-prices">
                <span class="tag-sale-price">${product.salePriceProduct}₽</span>
                <span class="tag-full-price">${product.fullPriceProduct}₽</span>
            </button>
            <button class="more-infor"> <a href="../detail.html?idProduct=1"><i class="fa-solid fa-magnifying-glass"></i></a></button>
            <button class="to-cart"><i class="fa-solid fa-cart-plus"></i></button>
        </div>
    </div>`;
}


function showProducts() {
    const productList = $("#productList");
    productList.addClass("fade");

    setTimeout(() => {
        productList.empty();

        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = Math.min(startIndex + productsPerPage, productsGeneral.length);

        for (let i = startIndex; i < endIndex; i++) {
            productList.append(createProductCard(productsGeneral[i]));
        }

        productList.removeClass("fade");
    }, 500);
}

function updatePagination() {
    const pagination = $("#pagination");
    pagination.empty();

    const totalPages = Math.ceil(productsGeneral.length / productsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const btn = $(`<button class="page-btn">${i}</button>`);
        btn.click(() => {
            currentPage = i;
            showProducts();
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
        showProducts();
        updatePagination();
    }
});

$("#nextBtn").click(() => {
    const totalPages = Math.ceil(productsGeneral.length / productsPerPage);

    if (currentPage < totalPages) {
        currentPage++;
        showProducts();
        updatePagination();
    }
});

showProducts();
updatePagination();
