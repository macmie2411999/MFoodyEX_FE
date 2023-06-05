import { token_admin, token_user } from './default_tokens.js';
import { detailProductOrderUrls } from './default_apis.js';

// Get current user's token
const token_current_user = customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser");
const current_user = customLocalStorage.getItemFromLocalStorage("MFoody - currentUser");

// Call APIs
export async function deleteDetailProductOrderByIDsOfCurrentUserApi(idOrder, idProduct) {
    console.log('Call deleteDetailProductOrderByIDsOfCurrentUserApi');
    try {
        const res = await axios({
            url: detailProductOrderUrls.detail_product_order_deleteByIDs_local + idOrder + "/idProduct/" + idProduct,
            method: 'DELETE',
            headers: {
                // 'Authorization': 'Bearer ' + token_current_admin
                'Authorization': 'Bearer ' + token_current_user
            }
        });

        // Handle if successfully get data
        console.log(res);
        showAlert('Product Removed From Order!', 2000, 'mfoody_success');
        return res;

    } catch (err) {
        // Handle if failed
        showAlert('Something Wrong!', 2000, 'mfoody_fail');
        console.log(err);
    }
}

export async function addDetailProductOrderByIDsOfCurrentUserApi(idOrder, obDPO) {
    console.log('Call addDetailProductOrderByIDsOfCurrentUserApi');
    let newDetailProductOrder = {
        idOrder: idOrder,
        idProduct: obDPO.idProduct,
        quantityDetailProductOrder: obDPO.quantityDetailProductOrder,
        salePriceDetailProductOrder: obDPO.salePriceDetailProductOrder,
        fullPriceDetailProductOrder: obDPO.fullPriceDetailProductOrder

    };
    try {
        const res = await axios({
            url: detailProductOrderUrls.detail_product_order_add_local,
            method: 'POST',
            data: newDetailProductOrder,
            headers: {
                // 'Authorization': 'Bearer ' + token_current_admin
                'Authorization': 'Bearer ' + token_current_user
            }
        });

        // Handle if successfully get data
        console.log(res);
        showAlert('Product Added to Order!', 2000, 'mfoody_success');
        return res;

    } catch (err) {
        // Handle if failed
        showAlert('Something Wrong!', 2000, 'mfoody_fail');
        console.log(err);
    }
}

export async function addArrayDetailProductOrderByIDsOfCurrentUserApi(arrayObDPO) {
    console.log('Call addArrayDetailProductOrderByIDsOfCurrentUserApi');

    let newArrayDetailProductOrder = [];

    // Create Data
    // for (const element of arrayObDPO) {
    //     let newDetailProductOrder = {
    //         idOrder: idOrder,
    //         idProduct: element.idProduct,
    //         quantityDetailProductOrder: element.quantityDetailProductOrder,
    //         salePriceDetailProductOrder: element.salePriceDetailProductOrder,
    //         fullPriceDetailProductOrder: element.fullPriceDetailProductOrder
    //     };
    //     newArrayDetailProductOrder.push(newDetailProductOrder);
    // }

    try {
        const res = await axios({
            url: detailProductOrderUrls.detail_product_order_add_array_local,
            method: 'POST',
            data: arrayObDPO,
            headers: {
                'Authorization': 'Bearer ' + token_current_user
            }
        });

        // Handle if successfully get data
        console.log(res);
        showAlert('Products Added to Order!', 2000, 'mfoody_success');
        return res;

    } catch (err) {
        // Handle if failed
        showAlert('Something Wrong!', 2000, 'mfoody_fail');
        console.log(err);
    }
}



