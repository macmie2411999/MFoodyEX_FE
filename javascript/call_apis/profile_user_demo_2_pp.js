// -by Mac Mie
// Import class User

import { token_admin, token_user } from './default_tokens.js';
import { getAllCreditCardsOfCurrentUser, getAllCreditCardsOfCurrentUserApi } from './credit_cards_apis.js';
import { getAllOrdersOfCurrentUser, getAllOrdersOfCurrentUserApi } from './orders_apis.js';
import { getCartOfCurrentUser, getCartOfCurrentUserApi } from './cart_apis.js';
import { getAllCommentsOfCurrentUser, getAllCommentsOfCurrentUserApi } from './comments_apis.js';

// Sundries variables
let arrayAllCreditCardsOfCurrentUser = [];
let arrayAllOrdersOfCurrentUser = [];
let cartOfCurrentUser = [];
let arrayAllCommentsOfCurrentUser = [];

// Process LocalStorage and Check Cookies
localStorageCookiesProcess.checkTokenAndUserInformationAtOtherPages();

// Get current user's token
const token_current_user = customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser");
const current_user = customLocalStorage.getItemFromLocalStorage("MFoody - currentUser");
renderFirstPartOfInforUser(current_user);
renderSecondPartOfInforUser(current_user);

async function run() {
    arrayAllCreditCardsOfCurrentUser = await getAllCreditCardsOfCurrentUserApi(); // Add await here
    arrayAllOrdersOfCurrentUser = await getAllOrdersOfCurrentUserApi(); // Add await here
    cartOfCurrentUser = await getCartOfCurrentUserApi(); // Add await here
    arrayAllCommentsOfCurrentUser = await getAllCommentsOfCurrentUserApi(); // Add await here

    renderCreditCardsOfUser(arrayAllCreditCardsOfCurrentUser);
    renderOrdersOfUser(arrayAllOrdersOfCurrentUser);
    renderDetailProductCartsOfUser(cartOfCurrentUser);
    renderCommentsOfUser(arrayAllCommentsOfCurrentUser);

}

run();

// Render
function renderFirstPartOfInforUser(user) {
    console.log("Render renderFirstPartOfInforUser");
    let contentHTML = '';

    contentHTML += `
    <div class="card card-avatar mb-4">
        <div class="card-body text-center">
            <img src="../image/pages/default_avatar.png" alt="avatar"
                class="rounded-circle img-fluid">
            <h5 class="my-3">${user.emailUser}</h5>
            <div class="d-flex justify-content-center mb-2">
                <button type="button" class="btn-upgrade-avatar">Edit Information</button>
            </div>
        </div>
    </div>
    <div class="card card-id-and-role mb-4 mb-lg-0">
        <div class="card-body p-0">
            <ul class="list-group list-group-flush rounded-3">
                <li
                    class="list-group-item d-flex justify-content-between align-items-center p-3">
                    <p class="mb-0">ID User: ${user.idUser}</p>
                </li>
                <li
                    class="list-group-item d-flex justify-content-between align-items-center p-3">
                    <p class="mb-0">Role User: ${user.roleUser}</p>
                </li>
            </ul>
        </div>
    </div>
    `;

    document.getElementById("firstPartUserInfor").innerHTML = contentHTML;
}

function renderSecondPartOfInforUser(user) {
    console.log("Render renderSecondPartOfInforUser");
    let contentHTML = '';

    contentHTML += `
        <div class="card-body">
            <div class="row">
                <div class="col-sm-3">
                    <p class="mb-0">Full Name</p>
                </div>
                <div class="col-sm-9">
                    <p class="text-muted mb-0">${user.nameUser}</p>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-sm-3">
                    <p class="mb-0">Email</p>
                </div>
                <div class="col-sm-9">
                    <p class="text-muted mb-0">${user.emailUser}</p>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-sm-3">
                    <p class="mb-0">Phone</p>
                </div>
                <div class="col-sm-9">
                    <p class="text-muted mb-0">${user.phoneNumberUser}</p>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-sm-3">
                    <p class="mb-0">Address</p>
                </div>
                <div class="col-sm-9">
                    <p class="text-muted mb-0">${user.addressUser}</p>
                </div>
            </div>
        </div>
    `;

    document.getElementById("secondPartUserInfor").innerHTML = contentHTML;
}

function renderCreditCardsOfUser(arrayAllCreditCardsOfCurrentUser) {
    console.log("Render renderCreditCardOfUser");
    let contentHTML = '';

    contentHTML += `
        <div class="card card-comments mb-4 mb-md-0">
            <div class="card-body">
                <p class="mb-1 title-ele-entity">
                    <span class="ele-entity">Credit Cards</span> <span
                        class="general-ele-entity">${arrayAllCreditCardsOfCurrentUser.length}</span>
                </p>

                <ul class="list-entity">
    `;

    arrayAllCreditCardsOfCurrentUser.splice(0, 2).forEach((card, index) => {
        contentHTML += `
            <li class="item-entity"><a href="#">Card ${index + 1}: ${card.numberCard}</a></li>
        `;
    });

    contentHTML += `
                </ul>

                <div class="d-flex justify-content-center">
                    <button class="button-card-body"> <a href="#">See More...</a></button>
                </div>
            </div>
        </div>
    `;

    document.getElementById("creditCardPart").innerHTML = contentHTML;
}

function renderOrdersOfUser(arrayAllOrdersOfCurrentUser) {
    console.log("Render renderOrdersOfUser");
    let contentHTML = `
            <div class="card card-orders mb-4 mb-md-0">
                <div class="card-body">
                    <p class="mb-1 title-ele-entity">
                        <span class="ele-entity">Orders</span> <span class="general-ele-entity">${arrayAllOrdersOfCurrentUser.length}</span>
                    </p>

                    <ul class="list-entity">
    `;

    arrayAllOrdersOfCurrentUser.splice(0, 2).forEach((order, index) => {
        contentHTML += `
            <li class="item-entity"><a href="#">Order ${index + 1}: ${order.idOrder}</a></li>
        `;
    });

    contentHTML += `
                    </ul>

                    <div class="d-flex justify-content-center">
                        <button class="button-card-body"> <a href="profile_user_demo_2_orders.html">See More...</a></button>
                    </div>
                </div>
            </div>
        
    `;

    document.getElementById("orderPart").innerHTML = contentHTML;
}

function renderDetailProductCartsOfUser(cartOfCurrentUser) {
    console.log("Render renderCartsOfUser");
    let contentHTML = `
        <div class="card-body">
            <p class="mb-1 title-ele-entity">
                <span class="ele-entity">Cart</span>
            </p>

            <ul class="list-entity">
                <li class="item-entity"><a href="#">Total Products: ${cartOfCurrentUser.quantityAllProductsInCart}</a></li>
                <li class="item-entity"><a href="#">Full Price: ${cartOfCurrentUser.totalFullPriceCart}₽</a></li>
                <li class="item-entity"><a href="#">Sale Price: ${cartOfCurrentUser.totalSalePriceCart}₽</a></li>
            </ul>

            <div class="d-flex justify-content-center">
                <button class="button-card-body"> <a href="#">See More...</a></button>
            </div>
        </div>
    `;

    document.getElementById("cartPart").innerHTML = contentHTML;
}

function renderCommentsOfUser(arrayAllCommentsOfCurrentUser) {
    console.log("Render renderCommentsOfUser");
    let contentHTML = `
        <div class="card card-cart mb-4 mb-md-0" id="commentPart">
            <div class="card-body">
                <p class="mb-1 title-ele-entity">
                    <span class="ele-entity">Comments</span> <span class="general-ele-entity">${arrayAllCommentsOfCurrentUser.length}</span>
                </p>

                <ul class="list-entity">
    `;

    arrayAllCommentsOfCurrentUser.splice(0, 3).forEach((comment, index) => {
        contentHTML += `
            <li class="item-entity"><a href="#">Comment ${index + 1}: ${comment.idComment}</a></li>
        `;
    });

    contentHTML += `
                </ul>

                <div class="d-flex justify-content-center">
                    <button class="button-card-body"> <a href="#">See More...</a></button>
                </div>
            </div>
        </div>
    `;

    document.getElementById("commentPart").innerHTML = contentHTML;
}



