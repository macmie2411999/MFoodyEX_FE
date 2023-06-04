// -by Mac Mie
// Import class User

import { token_admin, token_user } from './default_tokens.js';
import { getCartOfCurrentUser, getCartOfCurrentUserApi } from './cart_apis.js';
import { getAllProducts } from './products_apis.js';
import { deleteFavoriteProductByIDsOfCurrentUserApi, addFavoriteProductByIDsOfCurrentUserApi } from './favorite_products_apis.js';
import { deleteDetailProductCartByIDsOfCurrentUserApi, addDetailProductCartByIDsOfCurrentUserApi } from './detail_product_cart_apis.js';

// Sundries variables
let cartOfCurrentUser = [];
let arrayAllProducts = [];

// Process LocalStorage and Check Cookies
localStorageCookiesProcess.checkTokenAndUserInformationAtOtherPages();

// Get current user's token
const token_current_user = customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser");
const current_user = customLocalStorage.getItemFromLocalStorage("MFoody - currentUser");

async function run() {
    arrayAllProducts = await getAllProducts(); // Add await here
    cartOfCurrentUser = await getCartOfCurrentUser(); // Add await here
    renderCartOfUser(cartOfCurrentUser);
}

run();

// Render
function renderCartOfUser(cartOfCurrentUser) {
    let contentHTML = '';
    let listDetailProductCarts = cartOfCurrentUser.listDetailProductCarts;

    for (let detailProductCart of listDetailProductCarts) {
        let product = processlistProducts.getProductById(arrayAllProducts, detailProductCart.idDetailProductCartMFoody.idProduct);

        // Create tags for the product
        let tags = processlistProducts.generateProductTags(product, 4, 1, 40, '22/04/2023');
        let tagsHtml = tags.map(tag => `<span class="tag-product ${tag}"> ${tag} </span>`).join('');

        contentHTML += `
        <div class="product">
        <div class="container-product row">
            <div class="col-md-3 image-product">
                <img class="img-fluid mx-auto d-block image"
                    src="../image/products/${product.albumProduct}.webp">
            </div>
            <div class="col-md-9 infor-product">
                <div class="container-infor row">
                    <div class="col-md-7 product-general">
                        <a class="title-product-in-cart" href="product_detail_demo.html?idProduct=${product.idProduct}">${product.nameProduct}</a>
                        <div class="product-star-and-sale">
                            <div class="tag-container mb-2">
                                ${tagsHtml}
                                <span class="rated-star card-text">
                                <i class="fa-solid fa-star"></i>
                                ${product.ratingProduct}
                            </span>
                            </div>
                            
                        </div>
                        <div class="product-info">
                            <div class="product-description">${product.descriptionProduct}</div>
                            <button class="tag-prices">
                                <span class="tag-sale-price product-price">${product.salePriceProduct}₽</span>
                                <span class="tag-full-price">${product.fullPriceProduct}₽</span>
                            </button>
                        </div>
                    </div>
                    <div class="col-md-5 adjust-product-quantity">
                        <div class="row price-general">
                            <div class="col-md-12 container-price-general">
                                <span class="product-line-price">150$</span>
                            </div>
                        </div>
                        <div class="row quantity-general">
                            <div class="col-md-6 quantity product-quantity">
                                <input id="quantity" type="number" value="${detailProductCart.quantityDetailProductCart}"
                                    min="1" class="form-control quantity-input">
                            </div>
                            <div class="col-md-6 product-removal">
                                <button class="remove-product" data-product-id="${product.idProduct}">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
        `;
    }
    document.getElementById("listProductsInCart").innerHTML = contentHTML;

    $('.product-quantity input').off('change').on('change', function () {
        updateQuantity(this);
    });

    $('.product-removal button').off('click').on('click', async function () {
        const productId = $(this).data('product-id');
        await deleteDetailProductCartByIDsOfCurrentUserApi(cartOfCurrentUser.idCart, productId);
        removeItem(this);
    });

    recalculateCart();
}


