// -by Mac Mie
// Import class User

import { token_admin, token_user } from './default_tokens.js';
import { getAllOrdersOfCurrentUser, getAllOrdersOfCurrentUserApi } from './orders_apis.js';
import { getAllProducts} from './products_apis.js';

// Sundries variables
let arrayAllOrdersOfCurrentUser = [];
let arrayAllProducts = [];

// Process LocalStorage and Check Cookies
localStorageCookiesProcess.checkTokenAndUserInformationAtOtherPages();

// Get current user's token
const token_current_user = customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser");
const current_user = customLocalStorage.getItemFromLocalStorage("MFoody - currentUser");

async function run() {
    arrayAllProducts = await getAllProducts(); // Add await here
    arrayAllOrdersOfCurrentUser = await getAllOrdersOfCurrentUserApi(); // Add await here
    renderOdersOfUser(arrayAllOrdersOfCurrentUser.reverse());
}

run();

// Render
function renderOdersOfUser(arrayAllOrdersOfCurrentUser) {
    let contentHTML = '';
    
    console.log(arrayAllOrdersOfCurrentUser)
    let listDetailProductOrders = [];
    for (let order of arrayAllOrdersOfCurrentUser) {
        let tempPrice = '';
        let imgHTML = '';
        // Process Images
        listDetailProductOrders = order.listDetailProductOrders;
        for (let detailProductOrder of listDetailProductOrders) {
            imgHTML += `
                <img src="../image/products/${processlistProducts.getProductById(arrayAllProducts, detailProductOrder.idDetailProductOrderMfoody.idProduct).albumProduct}.webp" alt="product 1">
            `
        }

        // Process Price
        if (order.totalSalePriceOrder === order.totalFullPriceOrder) {
            tempPrice = `<p class="text-header price-order"><span class="price-value product-not-sale">${order.totalSalePriceOrder} ₽</span> </p>`
        } else {
            tempPrice = `<p class="text-header price-order"><span class="price-value sale-price-order">${order.totalSalePriceOrder} ₽</span> </p>
                         <p class="text-header price-order"><span class="price-value full-price-order">${order.totalFullPriceOrder} ₽</span> </p>`
        }


        contentHTML += `
        <div class="order-card">
            <div class="header-order-card">
                <div>
                    <p class="text-header date-order">Date Order: ${order.dateOrder}</p>
                    <p class="text-header id-order">ID: ${order.idOrder}</p>
                </div>
                <div>
                    ${tempPrice}
                </div>
            </div>
            <div class="body-order-card">
                <div class="info">
                    <button class="text-body status-order ${order.statusOrder}">${order.statusOrder}</button>
                    <p class="text-body payment-method-order">Payment Method:
                        ${order.paymentMethodOrder}</p>
                    <p class="text-body shipping-method-order">Shipping Method:
                        ${order.shippingMethodOrder}</p>
                </div>
                <div class="images-order-card">
                    ${imgHTML}
                </div>
            </div>
        </div>
        `;
    }
    if(contentHTML === ''){
        contentHTML+=`
        <div class="empty-content-HTML">
            <span class= "empty-content-HTML-span"> You Have No Order</span>
        </div>`
    }
    document.getElementById("listOrderCards").innerHTML = contentHTML;
}



