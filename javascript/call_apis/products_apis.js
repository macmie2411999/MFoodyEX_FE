import { token_admin, token_user } from './default_tokens.js';
import { product_countTotalNumber_local, product_getAll_local } from './default_apis.js';

// Get current user's token
const token_current_user = customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser");

export async function getAllProducts() {
    let arrayAllProducts = customLocalStorage.getItemFromLocalStorage("MFoody - arrayAllProducts");

    // Check arrays valid
    if (arrayAllProducts === null || arrayAllProducts.length === 0) {
        console.log("MFoody - arrayAllProducts is not valid!");
        
        arrayAllProducts = await getAllProductsApi();

        // Save to LocalStorage
        customLocalStorage.saveItemToLocalStorage(arrayAllProducts, "MFoody - arrayAllProducts");
    }

    return arrayAllProducts;
}

// Call APIs
export async function getAllProductsApi() {
    console.log('Call getAllProductsApi');
    try {
        const res = await axios({
            url: product_getAll_local,
            method: 'GET',
            headers: {
                // 'Authorization': 'Bearer ' + token_current_admin
                'Authorization': 'Bearer ' + token_current_user
            }
        });

        // Handle if successfully get data
        console.log(res.data);
        return res.data;

    } catch (err) {
        // Handle if failed
        console.log(err);
    }
}

export async function countTotalNumberProductsApi() {
    console.log('Call countTotalNumberProductsApi');
    try {
        const res = await axios({
            url: product_countTotalNumber_local,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token_user
            }
        });

        // Handle if successfully get data
        console.log(res.data);
        return res.data;

    } catch (err) {
        // Handle if failed
        console.log(err);
        return null;
    }
}
