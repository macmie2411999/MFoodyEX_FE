import { token_admin, token_user } from './default_tokens.js';
import { favoriteListUrls } from './default_apis.js';

// Get current user's token
const token_current_user = customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser");
const current_user = customLocalStorage.getItemFromLocalStorage("MFoody - currentUser");

export async function getFavoriteListOfCurrentUser() {
    let arrayFavoriteListOfCurrentUser = customLocalStorage.getItemFromLocalStorage("MFoody - arrayFavoriteListOfCurrentUser");

    // Check arrays valid
    if (arrayFavoriteListOfCurrentUser === null || !Array.isArray(arrayFavoriteListOfCurrentUser)) {
        console.log("MFoody - arrayFavoriteListOfCurrentUser is not valid!");
        
        arrayFavoriteListOfCurrentUser = await getFavoriteListOfCurrentUserApi();

        // Save to LocalStorage
        customLocalStorage.saveItemToLocalStorage(arrayFavoriteListOfCurrentUser, "MFoody - arrayFavoriteListOfCurrentUser");
    }

    return arrayFavoriteListOfCurrentUser;
}

// Call APIs
export async function getFavoriteListOfCurrentUserApi() {
    console.log('Call getFavoriteListOfCurrentUserApi');
    try {
        const res = await axios({
            url: favoriteListUrls.favorite_list_getAllByIDUser_local + current_user.idUser,
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

