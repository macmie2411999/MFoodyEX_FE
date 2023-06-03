import { token_admin, token_user } from './default_tokens.js';
import { detailProductCartUrls } from './default_apis.js';

// Get current user's token
const token_current_user = customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser");
const current_user = customLocalStorage.getItemFromLocalStorage("MFoody - currentUser");

// Call APIs
export async function deleteDetailProductCartByIDsOfCurrentUserApi(idCart, idProduct) {
    console.log('Call deleteDetailProductCartByIDsOfCurrentUserApi');
    try {
        const res = await axios({
            url: detailProductCartUrls.detail_product_cart_deleteByIDs_local + idCart + "/idProduct/" + idProduct,
            method: 'DELETE',
            headers: {
                // 'Authorization': 'Bearer ' + token_current_admin
                'Authorization': 'Bearer ' + token_current_user
            }
        });

        // Handle if successfully get data
        console.log(res);
        showAlert('Product Removed From Cart!', 2000, 'mfoody_fail');
        return res;

    } catch (err) {
        // Handle if failed
        showAlert('Something Wrong!', 2000, 'mfoody_fail');
        console.log(err);
    }
}

export async function addDetailProductCartByIDsOfCurrentUserApi(idCart, productToCart) {
    console.log('Call addDetailProductCartByIDsOfCurrentUserApi');
    console.log(productToCart)
    let newDetailProductCart = {
        idCart: idCart,
        idProduct: productToCart.idProduct,
        quantityDetailProductCart: 1,
        salePriceDetailProductCart: productToCart.salePriceProduct,
        fullPriceDetailProductCart: productToCart.fullPriceProduct

    };
    try {
        const res = await axios({
            url: detailProductCartUrls.detail_product_cart_add_local,
            method: 'POST',
            data: newDetailProductCart,
            headers: {
                // 'Authorization': 'Bearer ' + token_current_admin
                'Authorization': 'Bearer ' + token_current_user
            }
        });

        // Handle if successfully get data
        console.log(res);
        showAlert('Product Added to Cart!', 2000, 'mfoody_success');
        return res;

    } catch (err) {
        // Handle if failed
        showAlert('Something Wrong!', 2000, 'mfoody_fail');
        console.log(err);
    }
}

export async function addArrayDetailProductCartByIDsOfCurrentUserApi(idCart, arrayObDPC) {
    console.log('Call addArrayDetailProductCartByIDsOfCurrentUserApi');

    let newArrayDetailProductCart = [];

    // Create Data
    for (const element of arrayObDPC) {
        let newDetailProductCart = {
            idCart: idCart,
            idProduct: element.idProduct,
            quantityDetailProductCart: element.quantityDetailProductCart,
            salePriceDetailProductCart: element.salePriceDetailProductCart,
            fullPriceDetailProductCart: element.fullPriceDetailProductCart
        };
        newArrayDetailProductCart.push(newDetailProductCart);
    }

    try {
        const res = await axios({
            url: detailProductCartUrls.detail_product_cart_add_array_local,
            method: 'POST',
            data: newArrayDetailProductCart,
            headers: {
                'Authorization': 'Bearer ' + token_current_user
            }
        });

        // Handle if successfully get data
        console.log(res);
        showAlert('Products Added to Cart!', 2000, 'mfoody_success');
        return res;

    } catch (err) {
        // Handle if failed
        showAlert('Something Wrong!', 2000, 'mfoody_fail');
        console.log(err);
    }
}



