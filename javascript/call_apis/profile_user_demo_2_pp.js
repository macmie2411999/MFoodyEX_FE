// -by Mac Mie
// Import class User

import { token_admin, token_user } from './default_tokens.js';
import { product_getAll_local, product_deleteByID_local } from './default_apis.js';
import { getAllComments, getAllCommentsApi, countTotalNumberCommentsApi } from './comments_apis.js';
import { getAllProducts, getAllProductsApi, countTotalNumberProductsApi } from './products_apis.js';
import { getAllCreditCardsOfCurrentUser} from './credit_cards_apis.js';

// Sundries variables
let arrayAllCreditCardsOfCurrentUser = [];
let arrayAllComments = [];

// Process LocalStorage and Check Cookies
localStorageCookiesProcess.checkTokenAndUserInformationAtOtherPages();

// Get current user's token
const token_current_user = customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser");
const current_user = customLocalStorage.getItemFromLocalStorage("MFoody - currentUser");
renderFirstPartOfInforUser(current_user);
renderSecondPartOfInforUser(current_user);

async function run() {
    arrayAllCreditCardsOfCurrentUser = await getAllCreditCardsOfCurrentUser(); // Add await here
    arrayAllComments = await getAllComments(); // Assuming getAllComments is also async
    renderCreditCardsOfUser(arrayAllCreditCardsOfCurrentUser);
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

    arrayAllCreditCardsOfCurrentUser.forEach((card, index) => {
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

