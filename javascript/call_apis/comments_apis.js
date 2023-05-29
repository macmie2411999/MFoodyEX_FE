import { token_admin, token_user } from './default_tokens.js';
import { commentUrls } from './default_apis.js';

// Get current user's token
const token_current_user = customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser");

export async function getAllCommentsByIdProduct(product) {
    let arrayAllCommentsByIdProduct = customLocalStorage.getItemFromLocalStorage("MFoody - arrayAllCommentsByIdProduct" + product.idProduct);

    // Check arrays valid
    if (arrayAllCommentsByIdProduct === null) {
        console.log("MFoody - arrayAllComments" + product.idProduct + " is not valid!");
        arrayAllCommentsByIdProduct = await getAllCommentsByIdProductApi(product.idProduct);

        // Save to LocalStorage
        customLocalStorage.saveItemToLocalStorage(arrayAllCommentsByIdProduct, "MFoody - arrayAllCommentsByIdProduct" + product.idProduct);
    }

    return arrayAllCommentsByIdProduct;
}

// Call APIs
export async function getAllCommentsByIdProductApi(idProduct) {
    console.log('Call getAllCommentsApi');
    try {
        const res = await axios({
            url: commentUrls.comment_getAllByIDProduct_local + idProduct,
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
                'Authorization': 'Bearer ' + token_current_user 
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