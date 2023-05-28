// -by Mac Mie
// Import class User

import { token_admin, token_user } from './default_tokens.js';
import { getAllProducts, getAllProductsApi, countTotalNumberProductsApi } from './products_apis.js';

// Process LocalStorage and Check Cookies
// localStorageCookiesProcess.checkTokenAndUserInformationAtOtherPages();

let productsGeneral = [];
let arrayAllProducts = [];

// **** kiểm tra tính lỗi thời của dữ liệu bằng cách gọi api countTotal

async function run() {
    arrayAllProducts = await getAllProducts(); // Add await here

    productsGeneral = processlistProducts.getDiscountedlistProducts(arrayAllProducts).slice(10, 20).concat(
        processlistProducts.sortByRatingDesc(arrayAllProducts).slice(0, 20),
        processlistProducts.sortByNewnessDesc(arrayAllProducts).slice(0, 20));

    renderProductsToScrollList(productsGeneral);

}

run();


// Render
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









