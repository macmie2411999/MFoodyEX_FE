// -by Mac Mie
// Import class User

import { token_admin, token_user } from './default_tokens.js';
import { product_getAll_local, product_deleteByID_local } from './default_apis.js';
import { getAllComments, getAllCommentsApi, countTotalNumberCommentsApi } from './comments_apis.js';
import { getAllProducts, getAllProductsApi, countTotalNumberProductsApi } from './products_apis.js';

// Process LocalStorage and Check Cookies
// localStorageCookiesProcess.checkTokenAndUserInformationAtOtherPages();
const productsPerPage = 10;
let currentPage = 1;
let productsGeneral = [];
let similarProducts = [];
let arrayAllProducts = [];
let arrayAllComments = [];
let choosenProduct = [];

// Get key from URL
const searchParams = new URLSearchParams(window.location.search);
const searchValue = searchParams.get('idProduct');
console.log('Search Value: ' + searchValue);

async function run() {
    arrayAllProducts = await getAllProducts(); // Add await here
    productsGeneral = processlistProducts.getRandomProducts(processlistProducts.getRemainingProducts(
        arrayAllProducts, processlistProducts.getDiscountedlistProducts(arrayAllProducts).slice(0, 20),
        processlistProducts.sortByRatingDesc(arrayAllProducts).slice(0, 20),
        processlistProducts.sortByNewnessDesc(arrayAllProducts).slice(0, 20)), 100);

    // Check searchValue != null and Search and display products
    if (searchValue) {
        choosenProduct = processlistProducts.getProductById(arrayAllProducts, parseInt(searchValue));
        renderDetailProduct(choosenProduct);
        similarProducts = processlistProducts.filterByCategory(arrayAllProducts, choosenProduct.categoryProduct);
        renderProductsToScrollList(processlistProducts.removeProductById(similarProducts, choosenProduct.idProduct));
    } else {
        window.location.href = "http://127.0.0.1:5501/html/catalog_demo.html";
    }

    // Render Table Products
    showProducts();
    updatePagination();

}

run();


// Render
function renderDetailProduct(product) {
    console.log("Render rederDetailProduct");
    let contentHTML = '';
    let rattingStar = '';
    let tempPrice = '';

    // Process Present Ratting Of Products
    let ratingClass = product.ratingProduct > 0 ? 'active-rating' : 'inactive-rating';

    // Process Price
    if (product.salePriceProduct === product.fullPriceProduct) {
        tempPrice = `<span class="col tag-sale-price product-price product-not-sale">${product.salePriceProduct}₽</span>`
    } else {
        tempPrice = `<span class="col tag-sale-price product-price">${product.salePriceProduct}₽</span>
                         <span class="col tag-full-price">${product.fullPriceProduct}₽</span>`
    }

    // Process Ratting Star
    rattingStar = createRatingStars(product.ratingProduct);

    contentHTML += `
    <div class="row">
        <div class="col-xs-12 col-sm-6 item-photo">
            <img style="max-width:90%;" class="img-fluid mx-auto d-block image img-zoomable"
                src="../image/products/${product.albumProduct}.webp" id="product-image" />
            <div class="magnifier" id="magnifier"></div>
        </div>

        <div class="col-xs-12 col-sm-6 card-information">

            <!-- BreadCrumb -->
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item li-normal"><a href="http://127.0.0.1:5501/html/header_demo_2.html">Home</a></li>
                    <li class="breadcrumb-item li-normal" aria-current="page"><a href="http://127.0.0.1:5501/html/catalog_demo_search.html">Catalog</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Product Details</li>
                </ol>
            </nav>
            <!-- BreadCrumb End -->

            <div class="header-card part-of-card">
                <span class="name-product">${product.nameProduct}</span>
                <div class="rating-comments row">
                    <div class="col-xs-5 col-sm-4 rating rating-comments-ele">
                        <span class="text-in-card-information">Rating: </span>
                        <div class="star-rating">
                            ${rattingStar}
                        </div>
                    </div>
                    <div class="col-xs-4 col-sm-4 comments rating-comments-ele">
                        <span class="text-in-card-information">Comments: 5054 </span>
                    </div>
                    <div class="col-xs-3 col-sm-4 id-product rating-comments-ele">
                        <span class="text-in-card-information">ID: ${product.idProduct}</span>
                    </div>
                </div>

                <div class="container-button-in-card">
                    <button class="brand-button button-in-card">
                        <a href="#" class="name-brand link-button-in-card"> <i class="fa-solid fa-tag"></i>
                            ${product.brandProduct}</a>
                    </button>

                    <button class="category-button button-in-card">
                        <a href="#" class="name-category link-button-in-card"> <i class="fa-solid fa-tag"></i>
                            ${product.categoryProduct}</a>
                    </button>

                    <button class="mark-button button-in-card">
                        <a href="#" class="name-category link-button-in-card"> <i class="fa-solid fa-tag"></i>
                            New Product</a>
                    </button>
                </div>

            </div>

            <div class="body-card part-of-card">
                <div class="row price-cart-favorite">
                    <div class="col-xs-12 col-sm-6 price-container">
                        <h4 class="sale-price">${product.salePriceProduct + "₽/" + product.weightProduct}</h4>
                        <span class="in-stock">${product.storehouseQuantityProduct} Products in Stock</span>
                    </div>

                    <div class="col-xs-12 col-sm-6 button-container">
                        <div class="section">
                            <button class="btn button-to-cart">
                                <span class="button-content button-to-cart-sp">
                                    <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>
                                    Add to Cart
                                </span>
                            </button>
                        </div>

                        <div class="section">
                            <button class="btn button-to-favorite-list">
                                <span class="button-content button-to-favorite-list-sp">
                                    <span class="glyphicon glyphicon-heart-empty" aria-hidden="true"></span>
                                    Add to Favorite List
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bottom-card part-of-card">
                <div class="section" style="padding-bottom:5px;">
                    <h4 class="title-description">Description</h4>
                    <div class="content-description">
                        ${product.descriptionProduct}
                    </div>
                </div>
            </div>

            <div class="delivery-information part-of-card">
                <div class="section" style="padding-bottom:5px;">
                    <h4 class="title-delivery-information">Shipping Information</h4>
                    <div class="content-delivery-information row">
                    
                        <div class="shipping-information-top">
                            <div class="row container-shipping-information-top">
                                <div class="col">
                                    <span class="address-store title-si"> <i
                                            class="fa-solid fa-location-dot"></i>
                                        MFoody Store</span>
                                    <span class="status-si">Available today</span>
                                </div>
        
                                <div class="col">
                                    <span class="address-store title-si"> <i
                                            class="fa-solid fa-truck-fast"></i>
                                                Express
                                                delivery</span>
                                    <span class="status-si">Available today </span>
                                </div>
                            </div>
                        </div>

                        <div class="table-user-information">
                            <table class="table table-bordered table-responsive-md">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Phone Number</th>
                                        <th>Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>User 1</td>
                                        <td>0123456789</td>
                                        <td>123 Street, City, Country</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    document.getElementById("productDetailContainer").innerHTML = contentHTML;
}

function renderProductsToScrollList(arrayProducts) {
    console.log("Render renderProductsToSplider");
    let contentHTML = '';
    let tempPrice = '';
    for (let product of arrayProducts) {

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

        contentHTML += `
        <div class="card">
            <div class="tag-container">
                ${tagsHtml}
            </div>
            <span class="heart-icon"> <i class="fa-solid fa-heart"></i> </span>
            <img src="../image/products/${product.albumProduct}.webp" class="card-img-top"
                alt="...">
            <div class="card-body">
                <span class="rated-star card-text"><i class="fa-solid fa-star ${ratingClass}"></i> ${product.ratingProduct}
                </span>
                <h5 class="card-title">${product.nameProduct} </h5>
            </div>
            <div class="card-footer">
                <button class="tag-prices">
                    ${tempPrice}
                </button>
                <button class="more-infor"> <a href="../../html/product_detail_demo.html?idProduct=${product.idProduct}"><i
                            class="fa-solid fa-magnifying-glass"></i></a></button>
                <button class="to-cart"><i class="fa-solid fa-cart-plus"></i></button>
            </div>
        </div>
        `
    }
    document.getElementById("listScrollCard").innerHTML = contentHTML;
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

// Table Products
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









