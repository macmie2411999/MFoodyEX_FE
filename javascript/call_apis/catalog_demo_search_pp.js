// -by Mac Mie
// Import class User

import { token_admin, token_user } from './default_tokens.js';
import { getAllProducts } from './products_apis.js';
import { getFavoriteListOfCurrentUser } from './favorite_list_products_apis.js';
import { deleteFavoriteProductByIDsOfCurrentUserApi, addFavoriteProductByIDsOfCurrentUserApi } from './favorite_products_apis.js';
import { deleteDetailProductCartByIDsOfCurrentUserApi, addDetailProductCartByIDsOfCurrentUserApi } from './detail_product_cart_apis.js';
import { getCartOfCurrentUser, getCartOfCurrentUserApi } from './cart_apis.js';

// Process LocalStorage and Check Cookies
// localStorageCookiesProcess.checkTokenAndUserInformationAtOtherPages();
const productsPerPage = 20;
let currentPage = 1;
let productsGeneral = [];
let arrayAllProducts = [];
let favoriteListOfCurrentUser = [];
let arrayFavoriteProducts = [];
let idFavoriteListProducts = '';
let cartOfCurrentUser = [];
let userSignedIn = localStorageCookiesProcess.checkUserRole();;

// Get key from URL
const searchParams = new URLSearchParams(window.location.search);
const searchValue = searchParams.get('search');
let foundProductsMatchs = true;

// **** kiểm tra tính lỗi thời của dữ liệu bằng cách gọi api countTotal

async function run() {
    arrayAllProducts = await getAllProducts(); // Add await here

    if (userSignedIn) {
        // If product already in Cart
        cartOfCurrentUser = await getCartOfCurrentUser(); // Add await here

        // If product already in Favorite List
        favoriteListOfCurrentUser = await getFavoriteListOfCurrentUser(); // Add await here
        idFavoriteListProducts = favoriteListOfCurrentUser.idFavoriteListProducts;
        arrayFavoriteProducts = processlistProducts.getFavoriteProducts(arrayAllProducts, favoriteListOfCurrentUser.favoriteListProducts);
    }

    renderProductsToSpliderss();

    // Check searchValue != null and Search and display products
    if (!searchValue) {
        productsGeneral = processlistProducts.getRandomProducts(
            processlistProducts.getRemainingProducts(
                arrayAllProducts,
                processlistProducts.getDiscountedlistProducts(arrayAllProducts).slice(0, 20),
                processlistProducts.sortByRatingDesc(arrayAllProducts).slice(0, 20),
                processlistProducts.sortByNewnessDesc(arrayAllProducts).slice(0, 20)), 100);
    } else {
        productsGeneral = searchProducts(searchValue);
    }

    showProducts();
    updatePagination();
}

run();

// Find Product with its name matchs
function searchProducts(searchValue) {
    const matchedProducts = arrayAllProducts.filter(product => product.nameProduct.toLowerCase().includes(searchValue.toLowerCase()));
    return matchedProducts;
}

// Render
function renderProductsToSpliderss() {
    renderProductsToSplider(processlistProducts.getDiscountedlistProducts(arrayAllProducts).slice(0, 40), 'list_product_sale_off', "Discount");
    renderProductsToSplider(processlistProducts.sortByRatingDesc(arrayAllProducts).slice(0, 40), 'list_product_top_rate', "Best");
}

// Call APIs
function renderProductsToSplider(arrayProducts, idElementListProducts, tagProduct) {
    console.log("Render renderProductsToSplider");
    let contentHTML = '';
    let tempPrice = '';
    for (let product of arrayProducts) {

        // Process Present Tag Of Products
        // let tagClass = "";
        // if (tagProduct === "New") {
        //     tagClass = "new-product";
        // } else if (tagProduct === "Top Rate") {
        //     tagClass = "top-rate";
        // } else if (tagProduct === "Sale Off") {
        //     tagClass = "sale-off";
        // }

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
            <div class="product" data-product-id="${product.idProduct}">
                <div class="row container-product">
                    <div class="col-md-5 image-product">
                        <img class="img-fluid mx-auto d-block image"
                            src="../image/products/${product.albumProduct}.webp" data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop" data-product-id="${product.idProduct}">
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
                                        <button class="to-cart" data-product-id="${product.idProduct}"><i
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
    modal.querySelector('#buttonDetailProductModal').href = `../../html/product_detail_demo.html?idProduct=${product.idProduct}`;

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

// Table Product
function createProductCard(product) {
    let tempPrice = '';
    let toCartButtonHTML = '';
    let toFavoriteListButtonHTML = '';

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

    if (userSignedIn) {
        // If product already in Cart
        if (processCart.checkProductInCart(cartOfCurrentUser, product.idProduct)) {
            toCartButtonHTML = `
                <button class="to-cart" data-product-id="${product.idProduct}"><i class="fa-solid fa-check"></i></button>
            `;
        } else {
            toCartButtonHTML = `
                <button class="to-cart" data-product-id="${product.idProduct}"><i class="fa-solid fa-cart-plus"></i></button>
            `;
        }

        // If product already in Favorite List
        if (processlistProducts.checkProductInArray(arrayFavoriteProducts, product.idProduct)) {
            toFavoriteListButtonHTML = `
            <span class="heart-icon active" data-product-id="${product.idProduct}"> 
                <i class="fa-solid fa-heart"></i> 
            </span>
            `;
        } else {
            toFavoriteListButtonHTML = `
            <span class="heart-icon" data-product-id="${product.idProduct}"> 
                <i class="fa-solid fa-heart"></i> 
            </span>
            `;
        }
    } else {
        toCartButtonHTML = `
            <button class="to-cart" data-product-id="${product.idProduct}"><i class="fa-solid fa-cart-plus"></i></button>
            `;

        toFavoriteListButtonHTML = `
            <span class="heart-icon" data-product-id="${product.idProduct}"> 
                <i class="fa-solid fa-heart"></i> 
            </span>
            `;
    }

    return `
        <div class="card"  data-product-id="${product.idProduct}">
            <div class="tag-container">
                ${tagsHtml}
            </div>
            ${toFavoriteListButtonHTML}
            <img src="../image/products/${product.albumProduct}.webp" class="card-img-top" data-bs-toggle="modal" data-bs-target="#staticBackdrop" alt="...">
            <div class="card-body">
                <span class="rated-star card-text"><i class="fa-solid fa-star ${ratingClass}"></i> ${product.ratingProduct} </span>
                <h5 class="card-title">${product.nameProduct}</h5>
            </div>
            <div class="card-footer">
                <button class="tag-prices">
                    ${tempPrice}
                </button>
                <button class="more-infor"> <a href="../../html/product_detail_demo.html?idProduct=${product.idProduct}"><i class="fa-solid fa-magnifying-glass"></i></a></button>
                ${toCartButtonHTML}
            </div>
        </div>`;

}

function showProducts() {
    const productList = $("#productList");
    const titleMoreProducts = $(".title-more-products");
    const containerMoreProducts = $(".container-more-products");
    const filterProducts = $(".filter-product");

    productList.addClass("fade-list-products");

    setTimeout(() => {
        productList.empty();

        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = Math.min(startIndex + productsPerPage, productsGeneral.length);

        for (let i = startIndex; i < endIndex; i++) {
            productList.append(createProductCard(productsGeneral[i]));
        }

        // Update the title with search keyword

        if (!searchValue) {
            titleMoreProducts.text(`Our Products`);
        } else if (productsGeneral.length === 0) {
            titleMoreProducts.text(`No products match "${searchValue}"`);
            containerMoreProducts.hide();
            filterProducts.hide();
        } else {
            titleMoreProducts.text(`Result for "${searchValue}"`);
        }

        productList.removeClass("fade-list-products");
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

// Add event for icon heart
$(document).on('click', '.heart-icon', async function (event) {
    if (localStorageCookiesProcess.checkUserRole()) {
        // Call and save Infor
        favoriteListOfCurrentUser = await getFavoriteListOfCurrentUser(); // Add await here
        idFavoriteListProducts = favoriteListOfCurrentUser.idFavoriteListProducts;
        arrayFavoriteProducts = processlistProducts.getFavoriteProducts(arrayAllProducts, favoriteListOfCurrentUser.favoriteListProducts);

        // Add product to favorite list
        $(this).toggleClass('active');
        const productId = $(this).data('product-id');
        if ($(this).hasClass('active')) {
            await addFavoriteProductByIDsOfCurrentUserApi(idFavoriteListProducts, productId);
        } else {
            await deleteFavoriteProductByIDsOfCurrentUserApi(idFavoriteListProducts, productId);
        }

        // // Re-load
        // showProducts();
        // updatePagination();
    } else {
        showAlert('You need to Sign In first!', 2000, 'mfoody_fail');
    }

    // Reload new data
    // await run();
});

// Add event for icon cart
$(document).on('click', '.to-cart', async function (event) {

    if (localStorageCookiesProcess.checkUserRole()) {
        // Call and save Infor
        cartOfCurrentUser = await getCartOfCurrentUser(); // Add await here

        // Add product to cart
        $(this).toggleClass('active');
        const productId = $(this).data('product-id');
        let productToCart = processlistProducts.getProductById(arrayAllProducts, productId);
        if ($(this).hasClass('active')) {
            await addDetailProductCartByIDsOfCurrentUserApi(cartOfCurrentUser.idCart, productToCart);

            // Thay đổi class của icon
            const iconElement = $(this).find('svg.fa-cart-plus');
            console.log("icon1: " + iconElement.attr('class'));
            iconElement.attr('class', 'svg-inline--fa fa-check');
            console.log("icon2: " + iconElement.attr('class'));
        } else {
            await deleteDetailProductCartByIDsOfCurrentUserApi(cartOfCurrentUser.idCart, productId);

            // Thay đổi class của icon
            const iconElement = $(this).find('svg.fa-check');
            console.log("icon1: " + iconElement.attr('class'));
            iconElement.attr('class', 'svg-inline--fa fa-cart-plus');
            console.log("icon2: " + iconElement.attr('class'));
        }

        // // Re-load
        // showProducts();
        // updatePagination();
    } else {
        showAlert('You need to Sign In first!', 2000, 'mfoody_fail');
    }

    // Reload new data
    // await run();
});

// Catalog Active Tab
$(document).ready(function () {
    // Xác định tab active ban đầu
    let MFoody_activeTab = localStorage.getItem('MFoody_activeTab');
    if (MFoody_activeTab) {
        $('.sidebar li').removeClass('active');
        let activeLi = $('.sidebar li').filter(function () {
            return $(this).find('a').attr('href') === MFoody_activeTab;
        });
        activeLi.addClass('active');
    }

    $('.category').click(function (event) {
        event.preventDefault();
        let parentLi = $(this).closest('li');

        $('.sidebar li').removeClass('active');
        parentLi.addClass('active');

        let url = $(this).attr('href');
        localStorage.setItem('MFoody_activeTab', parentLi.find('a').attr('href')); // Lưu trạng thái "active" vào localStorage
        window.location.href = url;
    });
});









