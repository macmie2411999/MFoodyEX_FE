import { token_admin, token_user } from './default_tokens.js';
import { creditCardUrls } from './default_apis.js';

// Get current user's token
const token_current_user = customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser");
const current_user = customLocalStorage.getItemFromLocalStorage("MFoody - currentUser");

export async function getAllCreditCardsOfCurrentUser() {
    let arrayCreditCardsOfCurrentUser = customLocalStorage.getItemFromLocalStorage("MFoody - arrayAllCreditCardsOfCurrentUser");

    // Check arrays valid
    if (arrayCreditCardsOfCurrentUser === null || !Array.isArray(arrayCreditCardsOfCurrentUser)) {
        console.log("MFoody - arrayAllCreditCardsOfCurrentUser is not valid!");
        
        arrayCreditCardsOfCurrentUser = await getAllCreditCardsOfCurrentUserApi();

        // Save to LocalStorage
        customLocalStorage.saveItemToLocalStorage(arrayCreditCardsOfCurrentUser, "MFoody - arrayAllCreditCardsOfCurrentUser");
    }

    return arrayCreditCardsOfCurrentUser;
}

// Call APIs
export async function getAllCreditCardsOfCurrentUserApi() {
    console.log('Call getAllCreditCardsOfCurrentUserApi');
    try {
        const res = await axios({
            url: creditCardUrls.credit_card_getAllByIDUser_local + current_user.idUser,
            method: 'GET',
            headers: {
                // 'Authorization': 'Bearer ' + token_current_admin
                'Authorization': 'Bearer ' + token_current_user
            }
        });

        // Handle if successfully get data
        // console.log(res.data);
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
