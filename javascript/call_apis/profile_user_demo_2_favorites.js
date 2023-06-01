// -by Mac Mie
// Import class User

import { token_admin, token_user } from './default_tokens.js';
import { getAllOrdersOfCurrentUser } from './orders_apis.js';
import { getAllProducts } from './products_apis.js';
import { getFavoriteListOfCurrentUser } from './favorite_list_products_apis.js';
import { deleteFavoriteProductByIDsOfCurrentUserApi, addFavoriteProductByIDsOfCurrentUserApi } from './favorite_products_apis.js';

// Sundries variables
const productsPerPage = 10;
let currentPage = 1;
let arrayAllProducts = [];
let favoriteListOfCurrentUser = [];
let productsGeneral = [];
let idFavoriteListProducts = '';

// Process LocalStorage and Check Cookies
localStorageCookiesProcess.checkTokenAndUserInformationAtOtherPages();

// Get current user's token
const token_current_user = customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser");
const current_user = customLocalStorage.getItemFromLocalStorage("MFoody - currentUser");

async function run() {
    arrayAllProducts = await getAllProducts(); // Add await here
    favoriteListOfCurrentUser = await getFavoriteListOfCurrentUser(); // Add await here
    idFavoriteListProducts = favoriteListOfCurrentUser.idFavoriteListProducts;
    productsGeneral = processlistProducts.getFavoriteProducts(arrayAllProducts, favoriteListOfCurrentUser.favoriteListProducts);

    // Render Favorite List
    showProducts();
    updatePagination();
}

run();

// Render

// Table Product
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
        <div class="card" data-product-id="${product.idProduct}">
            <div class="tag-container">
                ${tagsHtml}
            </div>
            <span class="heart-icon active" data-product-id="${product.idProduct}"> 
                <i class="fa-solid fa-heart heart-icon-toggle"></i> 
            </span>
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




