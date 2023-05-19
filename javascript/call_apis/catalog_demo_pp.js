// -by Mac Mie
// Import class User

// import { token_admin, token_user } from './default_tokens';
import { product_getAll_local, product_deleteByID_local } from './default_apis.js';

// Process LocalStorage and Check Cookies
// localStorageCookiesProcess.checkTokenAndUserInformationAtOtherPages();

// Get current user's token
// const token_current_admin = customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser");

var arrayAllProducts = customLocalStorage.getItemFromLocalStorage("MFoody - arrayAllProducts");
if(arrayAllProducts.length > 0) {
    renderProductsToTableProducts(arrayAllProducts);
}


function renderProductsToTableProducts(arrayProducts) {
    console.log("Rendering...");
    let contentHTML = '';
    for (let product of arrayProducts) {
        contentHTML += `
        <div class=" splide__slide ">
            <div class="product" data-bs-toggle="modal"
                data-bs-target="#staticBackdrop">
                <div class="row container-product">
                    <div class="col-md-5 image-product">
                        <img class="img-fluid mx-auto d-block image"
                            src="../image/products/${product.albumProduct}.webp">
                    </div>
                    <div class="col-md-7 infor-product">
                        <div class="row container-infor">
                            <div class="product-general">
                                <h4 href="#" class="name-product">${product.nameProduct}</h4>
                                <div class="row product-star-and-sale">
                                    <span class="col tag-product"> New Product
                                    </span>
                                    <span class="col rated-star card-text"><i
                                            class="fa-solid fa-star"></i>
                                            ${product.ratingProduct} </span>
                                </div>
                                <div class="row product-info">
                                    <div class="col tag-prices">
                                        <span
                                            class="tag-sale-price product-price">${product.salePriceProduct}</span>
                                        <span class="tag-full-price">${product.fullPriceProduct}</span>
                                    </div>
                                    <div class="col button-infor">
                                        <button class="more-infor">
                                            <a
                                                href="../detail.html?idShoes=${product.idProduct}"><i
                                                    class="fa-solid fa-magnifying-glass"></i></a></button>
                                        <button class="to-cart"><i
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
    document.getElementById('list_product_sale_off').innerHTML = contentHTML;
};


