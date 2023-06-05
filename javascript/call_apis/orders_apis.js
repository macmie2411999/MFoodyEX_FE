import { token_admin, token_user } from './default_tokens.js';
import { orderUrls } from './default_apis.js';

// Get current user's token
const token_current_user = customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser");
const current_user = customLocalStorage.getItemFromLocalStorage("MFoody - currentUser");

export async function getAllOrdersOfCurrentUser() {
    let arrayOrdersOfCurrentUser = customLocalStorage.getItemFromLocalStorage("MFoody - arrayAllOrdersOfCurrentUser");

    // Check arrays valid
    if (arrayOrdersOfCurrentUser === null || !Array.isArray(arrayOrdersOfCurrentUser)) {
        console.log("MFoody - arrayAllOrdersOfCurrentUser is not valid!");
        
        arrayOrdersOfCurrentUser = await getAllOrdersOfCurrentUserApi();

        // Save to LocalStorage
        customLocalStorage.saveItemToLocalStorage(arrayOrdersOfCurrentUser, "MFoody - arrayAllOrdersOfCurrentUser");
    }

    return arrayOrdersOfCurrentUser;
}

// Call APIs
export async function getAllOrdersOfCurrentUserApi() {
    console.log('Call getAllOrdersOfCurrentUserApi');
    try {
        const res = await axios({
            url: orderUrls.order_getAllByIDUser_local + current_user.idUser,
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

export async function addNewOrderApi(orderData) {
    console.log('Call addNewOrderApi');
    try {
      const res = await axios({
        url: orderUrls.order_add_local,
        method: 'POST',
        data: orderData,
        headers: {
          'Authorization': 'Bearer ' + token_current_user
        }
      });
  
      // Handle if successfully created a new order
      if (res.status === 201) {
        const idOrder = res.data; // Giả sử response.data chứa idOrder
        console.log('New order created with id:', idOrder);
        return idOrder;
      }
  
    } catch (err) {
      // Handle if failed
      console.log(err);
    }
  }
  

