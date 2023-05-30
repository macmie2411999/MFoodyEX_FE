// -by Mac Mie
// Import class User

import { token_admin, token_user } from './default_tokens.js';
import { getAllProducts } from './products_apis.js';

// Process LocalStorage and Check Cookies
// localStorageCookiesProcess.checkTokenAndUserInformationAtOtherPages();
const productsPerPage = 10;
let currentPage = 1;
let productsGeneral = [];
let arrayAllProducts = [];
let arrayAllComments = [];

// **** kiểm tra tính lỗi thời của dữ liệu bằng cách gọi api countTotal

async function run() {
    arrayAllProducts = await getAllProducts(); // Add await here
    // arrayAllComments = await getAllComments(); // Assuming getAllComments is also async
    
    productsGeneral = processlistProducts.getRandomProducts(processlistProducts.getRemainingProducts(
        arrayAllProducts, processlistProducts.getDiscountedlistProducts(arrayAllProducts).slice(0, 20),
        processlistProducts.sortByRatingDesc(arrayAllProducts).slice(0, 20),
        processlistProducts.sortByNewnessDesc(arrayAllProducts).slice(0, 20)), 100);

    renderProductsToSpliderss();
    showProducts();
    updatePagination();
}

run();


// Render
function renderProductsToSpliderss() {
    renderProductsToSplider(processlistProducts.getDiscountedlistProducts(arrayAllProducts).slice(0, 20), 'list_product_sale_off', "Discount");
    renderProductsToSplider(processlistProducts.sortByRatingDesc(arrayAllProducts).slice(0, 20), 'list_product_top_rate', "Best");
    renderProductsToSplider(processlistProducts.sortByNewnessDesc(arrayAllProducts).slice(0, 20), 'list_product_new_product', "New");
}

// Call APIs
function renderProductsToSplider(arrayProducts, idElementListProducts, tagProduct) {
    console.log("Render renderProductsToSplider");
    let contentHTML = '';
    let tempPrice = '';
    for (let product of arrayProducts) {

        // Process Present Ratting Of Products
        let ratingClass = product.ratingProduct > 0 ? 'active-rating' : 'inactive-rating';

        // Process Price
        if (product.salePriceProduct === product.fullPriceProduct) {
            tempPrice = `<span class="col tag-sale-price product-price product-not-sale">${product.salePriceProduct}₽</span>`
        } else {
            tempPrice = `<span class="col tag-sale-price product-price">${product.salePriceProduct}₽</span>
                         <span class="col tag-full-price">${product.fullPriceProduct}₽</span>`
        }

        contentHTML += `
        <div class=" splide__slide " >
            <div class="product" data-bs-toggle="modal"
                data-bs-target="#staticBackdrop" data-product-id="${product.idProduct}">
                <div class="row container-product">
                    <div class="col-md-5 image-product">
                        <img class="img-fluid mx-auto d-block image"
                            src="../image/products/${product.albumProduct}.webp">
                    </div>
                    <div class="col-md-7 infor-product">
                        <div class="row container-infor">
                            <div class="product-general">
                                <h4 href="#" class="name-product">${product.nameProduct}</h4>
                                <div class="row product-star-and-sale">
                                    <span class="col tag-product ${tagProduct}"> ${tagProduct}</span>
                                    <span class="col rated-star card-text"><i
                                            class="fa-solid fa-star ${ratingClass}"></i>
                                            ${product.ratingProduct} </span>
                                </div>
                                <div class="row product-info">
                                    <div class="col tag-prices">
                                        ${tempPrice}
                                    </div>
                                    <div class="col button-infor">
                                        <button class="more-infor">
                                            <a
                                                href="../../html/product_detail_demo.html?idProduct=${product.idProduct}"><i
                                                    class="fa-solid fa-magnifying-glass"></i></a></button>
                                        <button class="to-cart"><i
                                                class="fa-solid fa-cart-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            `;
    }
    document.getElementById(idElementListProducts).innerHTML = contentHTML;
}

// Process Modal
document.getElementById('staticBackdrop').addEventListener('show.bs.modal', function (event) {

    // Button that triggered the modal
    let button = event.relatedTarget;

    // Move up the DOM to the parent element with 'product' or 'card' class
    let parentElement = button.closest('.product, .card');

    // Extract product id from data-* attribute
    let productId = parentElement.getAttribute('data-product-id');

    // find the product in arrayAllProducts
    let product = arrayAllProducts.find(item => item.idProduct == productId);
    console.log(productId)

    // update modal content
    updateModal(product);
});


function updateModal(product) {

    console.log(product)
    // find the modal
    let modal = document.getElementById('staticBackdrop');

    // update the product image
    modal.querySelector('#product-image').src = "../image/products/" + product.albumProduct + ".webp";

    // update the product name
    modal.querySelector('.name-product').textContent = product.nameProduct;

    // update the product comment
    modal.querySelector('.comments').innerHTML = `<span class="text-in-card-information">Comments: ${product.listComments.length} </span>`;

    // update the product rating
    let ratingElement = modal.querySelector('.star-rating');
    ratingElement.innerHTML = createRatingStars(product.ratingProduct);


    // update the product id
    modal.querySelector('.id-product .text-in-card-information').textContent = "ID: " + product.idProduct;

    // update the brand name
    modal.querySelector('.name-brand').innerHTML = `<i class="fa-solid fa-tag"></i> ${product.brandProduct}`;

    // update the category name
    modal.querySelector('.name-category').innerHTML = `<i class="fa-solid fa-tag"></i> ${product.categoryProduct}`;

    // update the sale price
    modal.querySelector('.sale-price').textContent = product.salePriceProduct + "₽/" + product.weightProduct;

    // update the full price
    let priceElement = modal.querySelector('.sale-price');
    if (priceElement) {
        let fullPriceElement = priceElement.querySelector('.full-price');
        if (fullPriceElement) {
            fullPriceElement.textContent = product.fullPriceProduct + "₽/Kg";
        }
    }

    // update the full price
    modal.querySelector('.in-stock').textContent = product.storehouseQuantityProduct + " Products in Stock";

    // update the product detail href
    modal.querySelector('#buttonDetailProductModal').href=`../../html/product_detail_demo.html?idProduct=${product.idProduct}`;

    // update the product description
    modal.querySelector('.content-description').textContent = product.descriptionProduct;
}

// Helper function to create HTML for rating stars
function createRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const half = (rating - fullStars) >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - half;

    let starsHTML = '';

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star active"></i>';
    }

    for (let i = 0; i < half; i++) {
        starsHTML += '<i class="fas fa-star-half-alt active"></i>';
    }

    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="fa-solid fa-star"></i>';
    }

    return starsHTML;
}

function createProductCard(product) {
    let tempPrice = '';

    // Process Present Rating Of Products
    let ratingClass = product.ratingProduct > 0 ? 'active-rating' : 'inactive-rating';

    // Create tags for the product
    let tags = processlistProducts.generateProductTags(product, 4, 1, 40, '22/04/2023');
    let tagsHtml = tags.map(tag => `<span class="tag-product ${tag}"> ${tag} </span>`).join('');

    // Process Price
    if (product.salePriceProduct === product.fullPriceProduct) {
        tempPrice = `<span class="tag-sale-price product-not-sale">${product.salePriceProduct}₽</span>`
    } else {
        tempPrice = `<span class="tag-sale-price">${product.salePriceProduct}₽</span>
                     <span class="tag-full-price">${product.fullPriceProduct}₽</span>`
    }

    return `
        <div class="card" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-product-id="${product.idProduct}">
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
                    ${tempPrice}
                </button>
                <button class="more-infor"> <a href="../../html/product_detail_demo.html?idProduct=${product.idProduct}"><i class="fa-solid fa-magnifying-glass"></i></a></button>
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









