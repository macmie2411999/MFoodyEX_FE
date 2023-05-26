import { token_admin, token_user } from './default_tokens.js';
import { commentUrls } from './default_apis.js';

// Get current user's token
const token_current_user = customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser");

export async function getAllComments() {
    let arrayAllComments = customLocalStorage.getItemFromLocalStorage("MFoody - arrayAllComments");

    // Check arrays valid
    if (arrayAllComments === null || arrayAllComments.length === 0) {
        console.log("MFoody - arrayAllComments is not valid!");
        arrayAllComments = await getAllCommentsApi();

        // Save to LocalStorage
        customLocalStorage.saveItemToLocalStorage(arrayAllComments, "MFoody - arrayAllComments");
    }

    return arrayAllComments;
}

// Call APIs
export async function getAllCommentsApi() {
    console.log('Call getAllCommentsApi');
    try {
        const res = await axios({
            url: commentUrls.comment_getAll_local,
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

export async function countTotalNumberCommentsApi() {
    console.log('Call countTotalNumberCommentsApi');
    try {
        const res = await axios({
            url: commentUrls.comment_countTotalNumber_local,
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