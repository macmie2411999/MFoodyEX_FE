// -by Mac Mie
// Import class User

import { token_admin, token_user } from './default_tokens.js';
import { getAllOrdersOfCurrentUser } from './orders_apis.js';
import { getAllProducts } from './products_apis.js';
import { getCartOfCurrentUser, getCartOfCurrentUserApi } from './cart_apis.js';
import { getFavoriteListOfCurrentUser, getFavoriteListOfCurrentUserApi } from './favorite_list_products_apis.js';
import { deleteFavoriteProductByIDsOfCurrentUserApi, addFavoriteProductByIDsOfCurrentUserApi } from './favorite_products_apis.js';
import { deleteDetailProductCartByIDsOfCurrentUserApi, addDetailProductCartByIDsOfCurrentUserApi } from './detail_product_cart_apis.js';

// Sundries variables
const productsPerPage = 10;
let currentPage = 1;
let arrayAllProducts = [];
let favoriteListOfCurrentUser = [];
let arrayFavoriteProducts = [];
let productsGeneral = [];
let idFavoriteListProducts = '';
let cartOfCurrentUser = [];

// Process LocalStorage and Check Cookies
localStorageCookiesProcess.checkTokenAndUserInformationAtOtherPages();

// Get current user's token
const token_current_user = customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser");
const current_user = customLocalStorage.getItemFromLocalStorage("MFoody - currentUser");

async function run() {
    arrayAllProducts = await getAllProducts(); // Add await here
    favoriteListOfCurrentUser = await getFavoriteListOfCurrentUserApi(); // Add await here
    idFavoriteListProducts = favoriteListOfCurrentUser.idFavoriteListProducts;
    productsGeneral = processlistProducts.getFavoriteProducts(arrayAllProducts, favoriteListOfCurrentUser.favoriteListProducts);
    cartOfCurrentUser = await getCartOfCurrentUser(); // Add await here

    // Render Favorite List
    showProducts();
    updatePagination();
}

run();

// Render

// Table Product
function createProductCard(product) {
    let tempPrice = '';
    let toCartButtonHTML = '';

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

    // If product already in Cart
    if(processCart.checkProductInCart(cartOfCurrentUser, product.idProduct)){
        toCartButtonHTML += `
            <button class="to-cart" data-product-id="${product.idProduct}"><i class="fa-solid fa-check"></i></button>
        `;
    } else {
        toCartButtonHTML += `
            <button class="to-cart" data-product-id="${product.idProduct}"><i class="fa-solid fa-cart-plus"></i></button>
        `;
    }

    return `
        <div class="card" data-product-id="${product.idProduct}">
            <div class="tag-container">
                ${tagsHtml}
            </div>
            <span class="heart-icon active" data-product-id="${product.idProduct}"> 
                <i class="fa-solid fa-heart heart-icon-toggle"></i> 
            </span>
            <img src="../image/products/${product.albumProduct}.webp" class="card-img-top" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="card-img-top" alt="...">
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
    productList.addClass("fade-list-products");

    setTimeout(() => {
        productList.empty();

        if (productsGeneral.length === 0) {
            $("#prevBtn").hide();
            $("#nextBtn").hide();
            productList.append(`
                <div class="empty-content-HTML">
                    <span class="empty-content-HTML-span">Your Favorite List is Empty</span>
                </div>
            `);
        } else {
            const startIndex = (currentPage - 1) * productsPerPage;
            const endIndex = Math.min(startIndex + productsPerPage, productsGeneral.length);

            for (let i = startIndex; i < endIndex; i++) {
                productList.append(createProductCard(productsGeneral[i]));
            }
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
$(document).on('click', '.heart-icon', async function () {
    $(this).toggleClass('active');

    const productId = $(this).data('product-id');

    if ($(this).hasClass('active')) {
        await addFavoriteProductByIDsOfCurrentUserApi(idFavoriteListProducts, productId);
    } else {
        await deleteFavoriteProductByIDsOfCurrentUserApi(idFavoriteListProducts, productId);
    }

    // Reload new data
    await run();
});

// Add event for icon cart
$(document).on('click', '.to-cart', async function (event) {

    // Add product to cart
    $(this).toggleClass('active');
    const productId = $(this).data('product-id');
    let productToCart = processlistProducts.getProductById(arrayAllProducts, productId);
    if ($(this).hasClass('active')) {
        await addDetailProductCartByIDsOfCurrentUserApi(cartOfCurrentUser.idCart, productToCart);

        // Thay đổi class của icon
        const iconElement = $(this).find('svg.fa-cart-plus');
        iconElement.attr('class', 'svg-inline--fa fa-check');
    } else {
        await deleteDetailProductCartByIDsOfCurrentUserApi(cartOfCurrentUser.idCart, productId);

        // Thay đổi class của icon
        const iconElement = $(this).find('svg.fa-check');
        iconElement.attr('class', 'svg-inline--fa fa-cart-plus');
    }

    // Reload new data
    // await run();
});

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




