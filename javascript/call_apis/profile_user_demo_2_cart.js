// -by Mac Mie
// Import class User

import { token_admin, token_user } from './default_tokens.js';
import { getCartOfCurrentUser, getCartOfCurrentUserApi } from './cart_apis.js';
import { getAllProducts } from './products_apis.js';
import { addNewOrderApi } from './orders_apis.js';
import { deleteFavoriteProductByIDsOfCurrentUserApi, addFavoriteProductByIDsOfCurrentUserApi } from './favorite_products_apis.js';
import { deleteDetailProductCartByIDsOfCurrentUserApi, deleteAllDetailProductCartByIdCartApi, addDetailProductCartByIDsOfCurrentUserApi } from './detail_product_cart_apis.js';
import { addArrayDetailProductOrderByIDsOfCurrentUserApi } from './detail_product_order_apis.js';


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
        <div class="product" data-product-id="${product.idProduct}" data-cart-id="${cartOfCurrentUser.idCart}">
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

    if(contentHTML === ''){
        // $("#checkInformation").hide();
        contentHTML+=`
        <div class="empty-content-HTML">
            <span class= "empty-content-HTML-span"> Your Cart is Empty</span>
        </div>`
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

// Check Out
$('#checkout-btn').on('click', async function () {
    try {
        proccessCartMfoody();
        let orderCurrentUser = proccessOrderMfoody();
        let idOrder = await addNewOrderApi(orderCurrentUser);
        let arrayObDPO = proccessListDetailProductOrderMfoody(idOrder);
        await addArrayDetailProductOrderByIDsOfCurrentUserApi(arrayObDPO);
        await deleteAllDetailProductCartByIdCartApi(cartOfCurrentUser.idCart);
        showAlert('Your Order created successfully!', 2000, 'mfoody_success');
      } catch (error) {
        console.log(error);
      }
});

// Procces Cart and Order

function proccessCartMfoody() {
    // Get product list in cart from DOM
    let productList = document.querySelectorAll('.product');

    // Create an array to store product objects
    let cartItems = [];

    // Loop through the product list and create an audience for each product
    productList.forEach((product) => {
        let idProduct = product.getAttribute('data-product-id');
        let idCart = product.getAttribute('data-cart-id');
        let quantity = product.querySelector('.quantity-input').value;
        let salePrice = product.querySelector('.product-price').innerText.replace(/₽/g, '');
        let fullPrice = product.querySelector('.tag-full-price').innerText.replace(/₽/g, '');

        // Create product object and add to array
        let productItem = {
            idProduct: idProduct,
            idCart: idCart,
            quantityDetailProductCart: quantity,
            salePriceDetailProductCart: salePrice,
            fullPriceDetailProductCart: fullPrice
        };

        cartItems.push(productItem);
    });

    // Store array of products into localStorage
    localStorage.setItem('MFoody - cartItems', JSON.stringify(cartItems));
    return JSON.stringify(cartItems);
}

function proccessListDetailProductOrderMfoody(idOrder) {
    // Get product list in cart from DOM
    let productList = document.querySelectorAll('.product');

    // Create an array to store product objects
    let orderItems = [];

    // Loop through the product list and create an audience for each product
    productList.forEach((product) => {
        let idProduct = product.getAttribute('data-product-id');
        let quantity = product.querySelector('.quantity-input').value;
        let salePrice = product.querySelector('.product-price').innerText.replace(/₽/g, '');
        let fullPrice = product.querySelector('.tag-full-price').innerText.replace(/₽/g, '');

        // Create product object and add to array
        let productItem = {
            idOrder: idOrder,
            idProduct: idProduct,
            quantityDetailProductOrder: quantity,
            salePriceDetailProductOrder: salePrice,
            fullPriceDetailProductOrder: fullPrice
        };

        orderItems.push(productItem);
    });

    // Store array of products into localStorage
    // localStorage.setItem('MFoody - cartItems', JSON.stringify(cartItems));
    return orderItems;
}

function proccessOrderMfoody() {
    // Get the current date in the format dd/mm/yyyy
    let today = new Date();
    let dateOrder = today.toLocaleDateString('en-GB');

    // Get the selected shipping method and price
    let shippingMethodSelect = document.getElementById('shipping-select');
    let shippingMethodOrder = shippingMethodSelect.options[shippingMethodSelect.selectedIndex].text;
    let shippingPriceOrder = parseFloat(document.getElementById('cart-shipping').innerText);

    // Get the quantity, subtotal, and total values
    let quantityAllProductsInOrder = 0;
    let totalSalePriceOrder = 0;
    let totalFullPriceOrder = 0;

    let productList = document.querySelectorAll('.product');
    productList.forEach((product) => {
        let quantity = parseInt(product.querySelector('.quantity-input').value);
        let salePrice = parseFloat(product.querySelector('.product-price').innerText.replace(/₽/g, ''));
        let fullPrice = parseFloat(product.querySelector('.tag-full-price').innerText.replace(/₽/g, ''));

        quantityAllProductsInOrder += quantity;
        totalSalePriceOrder += salePrice * quantity;
        totalFullPriceOrder += fullPrice * quantity;
    });

    // Get the selected payment method
    let paymentMethodSelect = document.getElementById('payment-select');
    let paymentMethodOrder = paymentMethodSelect.options[paymentMethodSelect.selectedIndex].text;

    // Set the default status to "Processing"
    let statusOrder = 'Processing';

    // Get the idUser (assuming it's already available or stored somewhere)
    let idUser = current_user.idUser;

    // Create the order object
    let order = {
        dateOrder: dateOrder,
        dateReceiptOrder: dateOrder,
        shippingPriceOrder: shippingPriceOrder,
        shippingMethodOrder: shippingMethodOrder,
        quantityAllProductsInOrder: quantityAllProductsInOrder,
        totalSalePriceOrder: totalSalePriceOrder,
        totalFullPriceOrder: totalFullPriceOrder,
        paymentMethodOrder: paymentMethodOrder,
        statusOrder: statusOrder,
        idUser: idUser
    };

    // Store the order object in localStorage
    localStorage.setItem('MFoody - orderMfoody', JSON.stringify(order));
    return order;
}





