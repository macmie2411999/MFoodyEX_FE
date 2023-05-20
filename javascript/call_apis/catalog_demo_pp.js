// -by Mac Mie
// Import class User

// import { token_admin, token_user } from './default_tokens';
import { product_getAll_local, product_deleteByID_local } from './default_apis.js';

// Process LocalStorage and Check Cookies
// localStorageCookiesProcess.checkTokenAndUserInformationAtOtherPages();

// Get current user's token
// const token_current_admin = customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser");

// var arrayAllProducts = customLocalStorage.getItemFromLocalStorage("MFoody - arrayAllProducts");
// if(arrayAllProducts.length > 0) {
//     renderProductsToTableProducts(arrayAllProducts);
// }

// **** kiểm tra tính lỗi thời của dữ liệu bằng cách gọi api countTotal

const token_user = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJpZFVzZXJcIjoyMTUyMzEsXCJlbWFpbFVzZXJcIjpcInJvYmluc29uaGFua0BnbWFpbC5jb21cIixcInBhc3N3b3JkVXNlclwiOlwiJDJhJDEyJGlYUGthTjBFeS5MRmhQTGJEZGcwU3VvMDdNQ3lEazlGNEFhQk1DWXNFWVRVdzZIRGV0UURtXCIsXCJuYW1lVXNlclwiOlwiUm9iaW5zb24gSGFua1wiLFwicGhvbmVOdW1iZXJVc2VyXCI6XCI4OTM0MTE4MzAwNVwiLFwiYWRkcmVzc1VzZXJcIjpcIlRleGFzLCBVU0FcIixcInJvbGVVc2VyXCI6XCJBRE1JTlwiLFwibGlzdENyZWRpdENhcmRzXCI6W3tcImlkQ2FyZFwiOjQzMDcxMSxcIm5hbWVVc2VyQ2FyZFwiOlwiUm9iaW5zb24gSGFua1wiLFwibnVtYmVyQ2FyZFwiOlwiNjU4OTY1MjM0MzU0ODg5NlwiLFwiZXhwaXJhdGlvbkNhcmRcIjpcIjAxLzAxLzIzXCIsXCJzZWN1cml0eUNvZGVDYXJkXCI6XCI3MTRcIn1dLFwibGlzdENhcnRzXCI6W3tcImlkQ2FydFwiOjM1MDA2MCxcInF1YW50aXR5QWxsUHJvZHVjdHNJbkNhcnRcIjoxLFwidG90YWxTYWxlUHJpY2VDYXJ0XCI6NTAuMCxcInRvdGFsRnVsbFByaWNlQ2FydFwiOjUwLjAsXCJsaXN0RGV0YWlsUHJvZHVjdENhcnRzXCI6W3tcImlkRGV0YWlsUHJvZHVjdENhcnRNRm9vZHlcIjp7XCJpZENhcnRcIjozNTAwNjAsXCJpZFByb2R1Y3RcIjo1MzAwMjJ9LFwicXVhbnRpdHlEZXRhaWxQcm9kdWN0Q2FydFwiOjEsXCJzYWxlUHJpY2VEZXRhaWxQcm9kdWN0Q2FydFwiOjUwLjAsXCJmdWxsUHJpY2VEZXRhaWxQcm9kdWN0Q2FydFwiOjUwLjB9XX1dLFwibGlzdENvbW1lbnRzXCI6W3tcImlkQ29tbWVudFwiOjYwODc1MSxcInJhdGluZ0NvbW1lbnRcIjo0LFwiY29udGVudENvbW1lbnRcIjpcIlRoZSBwcm9kdWN0cyBpcyBPS0FZXCJ9LHtcImlkQ29tbWVudFwiOjYwODc1NCxcInJhdGluZ0NvbW1lbnRcIjozLFwiY29udGVudENvbW1lbnRcIjpcIlRoZSBwcm9kdWN0IGlzIG9rYXksIGJ1dCBJIGV4cGVjdGVkIGJldHRlciBxdWFsaXR5IGZvciB0aGUgcHJpY2UuXCJ9LHtcImlkQ29tbWVudFwiOjYwODgwMixcInJhdGluZ0NvbW1lbnRcIjo1LFwiY29udGVudENvbW1lbnRcIjpcIkknbSBpbXByZXNzZWQgd2l0aCB0aGUgdmFyaWV0eSBvZiB2ZWdhbiBvcHRpb25zIGF2YWlsYWJsZS4gVGhlIHF1YWxpdHkgaXMgdG9wLW5vdGNoLlwifSx7XCJpZENvbW1lbnRcIjo2MDg5MjYsXCJyYXRpbmdDb21tZW50XCI6MyxcImNvbnRlbnRDb21tZW50XCI6XCJUaGUgZ29vZHMgYXJlIHNhdGlzZmFjdG9yeS4gVGhleSBtZWV0IG15IGJhc2ljIG5lZWRzLlwifV19IiwiaWF0IjoxNjg0NTMwMzY2LCJleHAiOjE2ODQ1NTkxNjZ9.Ryjzx1p1qojsDJ0_XVi2thacIbSzZo3zBwFRsZSling";

var arrayAllProducts = customLocalStorage.getItemFromLocalStorage("MFoody - arrayAllProducts");

// Check arrays valid
if (arrayAllProducts === null || arrayAllProducts.length === 0) {
    console.log("MFoody - arrayAllProducts is not valid!");
    // Automatically call APIs when page is loaded
    getAllProductsApi();
    arrayAllProducts = customLocalStorage.getItemFromLocalStorage("MFoody - arrayAllProducts");
} else {
    renderProductsToTSplider(processlistProducts.getDiscountedlistProducts(arrayAllProducts).slice(0, 20), 'list_product_sale_off', "Sale Off");
    renderProductsToTSplider(processlistProducts.sortByRatingDesc(arrayAllProducts).slice(0, 20), 'list_product_top_rate', "Top Rate");
    renderProductsToTSplider(processlistProducts.sortByNewnessDesc(arrayAllProducts).slice(0, 20), 'list_product_new_product', "New");
    // processlistProducts.sortByPopularityDesc(arrayAllProducts);
}

// Call APIs
function getAllProductsApi() {
    let promise = axios({
        url: product_getAll_local,
        method: 'GET',
        headers: {
            // 'Authorization': 'Bearer ' + token_current_admin
            'Authorization': 'Bearer ' + token_user
        }
    })

    promise.then(function (res) {
        // Handle if successfully get data
        console.log(res.data);

        // Save to Cookies
        customLocalStorage.saveItemToLocalStorage(res.data, "MFoody - arrayAllProducts");
        // customLocalStorage.saveItemToLocalStorage(processlistProducts.sortByRatingDesc(res.data), "MFoody - arrayAllProducts - sortByRatingDesc");
        // customLocalStorage.saveItemToLocalStorage(processlistProducts.getDiscountedlistProducts(res.data), "MFoody - arrayAllProducts - getDiscountedlistProducts");
        // customLocalStorage.saveItemToLocalStorage(processlistProducts.sortByNewnessDesc(res.data), "MFoody - arrayAllProducts - sortByNewnessDesc");
        // customLocalStorage.saveItemToLocalStorage(processlistProducts.sortByPopularityDesc(res.data), "MFoody - arrayAllProducts - sortByPopularityDesc");
    })

    promise.catch(function (err) {
        // Handle if failed
        console.log(err);
    })
};

function renderProductsToTSplider(arrayProducts, idElementListProducts, tagProduct) {
    console.log("Render.");
    let contentHTML = '';
    for (let product of arrayProducts) {

        // Process Present Tag Of Products
        let tagClass = "";
        if (tagProduct === "New") {
            tagClass = "new-product";
        } else if (tagProduct === "Top Rate") {
            tagClass = "top-rate";
        } else if (tagProduct === "Sale Off") {
            tagClass = "sale-off";
        }

        // Process Present Ratting Of Products
        let ratingClass = product.ratingProduct > 0 ? 'active-rating' : 'inactive-rating';

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
                                    <span class="col tag-product ${tagClass}"> ${tagProduct}
                                    </span>
                                    <span class="col rated-star card-text"><i
                                            class="fa-solid fa-star ${ratingClass}"></i>
                                            ${product.ratingProduct} </span>
                                </div>
                                <div class="row product-info">
                                    <div class="col tag-prices">
                                        <span
                                            class="col tag-sale-price product-price">${product.salePriceProduct}₽</span>
                                        <span class="col tag-full-price">${product.fullPriceProduct}₽</span>
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
    document.getElementById(idElementListProducts).innerHTML = contentHTML;
}



