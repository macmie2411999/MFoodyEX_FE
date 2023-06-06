// -by Mac Mie
// Import class User

import { token_admin, token_user } from './default_tokens.js';
import { getAllProducts } from './products_apis.js';
import { getCartOfCurrentUser, getCartOfCurrentUserApi } from './cart_apis.js';
import { getFavoriteListOfCurrentUser } from './favorite_list_products_apis.js';
import { deleteFavoriteProductByIDsOfCurrentUserApi, addFavoriteProductByIDsOfCurrentUserApi } from './favorite_products_apis.js';
import { deleteDetailProductCartByIDsOfCurrentUserApi, addDetailProductCartByIDsOfCurrentUserApi } from './detail_product_cart_apis.js';

// Process LocalStorage and Check Cookies
// localStorageCookiesProcess.checkTokenAndUserInformationAtOtherPages();

let productsGeneral = [];
let arrayAllProducts = [];
let favoriteListOfCurrentUser = [];
let arrayFavoriteProducts = [];
let idFavoriteListProducts = '';
let cartOfCurrentUser = [];

// **** kiểm tra tính lỗi thời của dữ liệu bằng cách gọi api countTotal

async function run() {
    arrayAllProducts = await getAllProducts(); // Add await here
    // favoriteListOfCurrentUser = await getFavoriteListOfCurrentUser(); // Add await here
    // idFavoriteListProducts = favoriteListOfCurrentUser.idFavoriteListProducts;
    // arrayFavoriteProducts = processlistProducts.getFavoriteProducts(arrayAllProducts, favoriteListOfCurrentUser.favoriteListProducts);

    productsGeneral = processlistProducts.getRandomProducts(
        processlistProducts.getRemainingProducts(
            arrayAllProducts,
            processlistProducts.getDiscountedlistProducts(arrayAllProducts).slice(0, 20),
            processlistProducts.sortByRatingDesc(arrayAllProducts).slice(0, 20),
            processlistProducts.sortByNewnessDesc(arrayAllProducts).slice(0, 20)), 100);

    renderProductsToScrollList(productsGeneral);

}

run();


// Render
async function renderProductsToScrollList(arrayProducts) {
    console.log("Render renderProductsToSplider");
    let contentHTML = '';
    let tempPrice = '';
    let toCartButtonHTML = '';
    let toFavoriteListButtonHTML = '';
    let checkRoleUser = localStorageCookiesProcess.checkUserRole();

    // Check if user already signed in
    if (checkRoleUser) {
        // If product already in Cart
        cartOfCurrentUser = await getCartOfCurrentUser(); // Add await here

        // If product already in Favorite List
        favoriteListOfCurrentUser = await getFavoriteListOfCurrentUser(); // Add await here
        idFavoriteListProducts = favoriteListOfCurrentUser.idFavoriteListProducts;
        arrayFavoriteProducts = processlistProducts.getFavoriteProducts(arrayAllProducts, favoriteListOfCurrentUser.favoriteListProducts);

    }

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

        // Check if user already signed in
        if (checkRoleUser) {
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

        contentHTML += `
        <div class="card" data-product-id="${product.idProduct}">
            <div class="tag-container">
                ${tagsHtml}
            </div>
            ${toFavoriteListButtonHTML}
            <img src="../image/products/${product.albumProduct}.webp" class="card-img-top" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
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
                ${toCartButtonHTML}
            </div>
        </div>
        `
    }
    document.getElementById("listScrollCard").innerHTML = contentHTML;

    // Preload process
    document.querySelector('.scrolling-container').style.display = 'flex';
    document.querySelector('.container-loader-scroll-list').style.display = 'none';
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
            iconElement.attr('class', 'svg-inline--fa fa-check');
        } else {
            await deleteDetailProductCartByIDsOfCurrentUserApi(cartOfCurrentUser.idCart, productId);

            // Thay đổi class của icon
            const iconElement = $(this).find('svg.fa-check');
            iconElement.attr('class', 'svg-inline--fa fa-cart-plus');
        }
    } else {
        showAlert('You need to Sign In first!', 2000, 'mfoody_fail');
    }

    // Reload new data
    // await run();
});









