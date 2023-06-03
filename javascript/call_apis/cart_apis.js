import { token_admin, token_user } from './default_tokens.js';
import { cartUrls } from './default_apis.js';

// Get current user's token
const token_current_user = customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser");
const current_user = customLocalStorage.getItemFromLocalStorage("MFoody - currentUser");

export async function getCartOfCurrentUser() {
    let arrayCartOfCurrentUser = customLocalStorage.getItemFromLocalStorage("MFoody - arrayCartOfCurrentUser");

    // Check arrays valid
    if (arrayCartOfCurrentUser === null || !Array.isArray(arrayCartOfCurrentUser)) {
        console.log("MFoody - arrayCartOfCurrentUser is not valid!");
        
        arrayCartOfCurrentUser = await getCartOfCurrentUserApi();

        // Save to LocalStorage
        customLocalStorage.saveItemToLocalStorage(arrayCartOfCurrentUser, "MFoody - arrayCartOfCurrentUser");
    }

    return arrayCartOfCurrentUser;
}

// Call APIs
export async function getCartOfCurrentUserApi() {
    console.log('Call getCartOfCurrentUserApi');
    try {
        const res = await axios({
            url: cartUrls.cart_getAllByIDUser_local + current_user.idUser,
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

