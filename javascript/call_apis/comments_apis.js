import { token_admin, token_user } from './default_tokens.js';
import { commentUrls } from './default_apis.js';

// Get current user's token
const token_current_user = customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser");
const current_user = customLocalStorage.getItemFromLocalStorage("MFoody - currentUser");

export async function getAllCommentsOfCurrentUser() {
    let arrayCommentsOfCurrentUser = customLocalStorage.getItemFromLocalStorage("MFoody - arrayAllCommentsOfCurrentUser");

    // Check arrays valid
    if (arrayCommentsOfCurrentUser === null || !Array.isArray(arrayCommentsOfCurrentUser)) {
        console.log("MFoody - arrayAllCommentsOfCurrentUser is not valid!");
        
        arrayCommentsOfCurrentUser = await getAllCommentsOfCurrentUserApi();

        // Save to LocalStorage
        customLocalStorage.saveItemToLocalStorage(arrayCommentsOfCurrentUser, "MFoody - arrayAllCommentsOfCurrentUser");
    }

    return arrayCommentsOfCurrentUser;
}

// Call APIs
export async function getAllCommentsOfCurrentUserApi() {
    console.log('Call getAllCommentsOfCurrentUserApi');
    try {
        const res = await axios({
            url: commentUrls.comment_getAllByIDUser_local + current_user.idUser,
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

// export async function countTotalNumberProductsApi() {
//     console.log('Call countTotalNumberProductsApi');
//     try {
//         const res = await axios({
//             url: product_countTotalNumber_local,
//             method: 'GET',
//             headers: {
//                 'Authorization': 'Bearer ' + token_user
//             }
//         });

//         // Handle if successfully get data
//         console.log(res.data);
//         return res.data;

//     } catch (err) {
//         // Handle if failed
//         console.log(err);
//         return null;
//     }
// }
