import { token_admin, token_user } from './default_tokens.js';
import { favoriteProductUrls } from './default_apis.js';

// Get current user's token
const token_current_user = customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser");
const current_user = customLocalStorage.getItemFromLocalStorage("MFoody - currentUser");

// Call APIs
export async function deleteFavoriteProductByIDsOfCurrentUserApi(idFavoriteListProducts, idProduct) {
    console.log('Call deleteFavoriteProductByIDsOfCurrentUserApi');
    try {
        const res = await axios({
            url: favoriteProductUrls.favorite_product_deleteByIDs_local + idFavoriteListProducts + "/idProduct/" + idProduct,
            method: 'DELETE',
            headers: {
                // 'Authorization': 'Bearer ' + token_current_admin
                'Authorization': 'Bearer ' + token_current_user
            }
        });

        // Handle if successfully get data
        console.log(res);
        showAlert('Product Removed!', 2000, 'mfoody_success');
        return res;

    } catch (err) {
        // Handle if failed
        showAlert('Something Wrong!', 2000, 'mfoody_fail');
        console.log(err);
    }
}

export async function addFavoriteProductByIDsOfCurrentUserApi(idFavoriteListProducts, idProduct) {
    console.log('Call addFavoriteProductByIDsOfCurrentUserApi');
    let newFavoriteProduct = {
        idProduct: idProduct,
        idFavoriteListProducts: idFavoriteListProducts
    };
    try {
        const res = await axios({
            url: favoriteProductUrls.favorite_product_add_local,
            method: 'POST',
            data: newFavoriteProduct,
            headers: {
                // 'Authorization': 'Bearer ' + token_current_admin
                'Authorization': 'Bearer ' + token_current_user
            }
        });

        // Handle if successfully get data
        console.log(res);
        showAlert('Product Added!', 2000, 'mfoody_success');
        return res;

    } catch (err) {
        // Handle if failed
        showAlert('Something Wrong!', 2000, 'mfoody_fail');
        console.log(err);
    }
}

