import { token_admin, token_user } from './default_tokens.js';
import { feedbackUrls } from './default_apis.js';

// Get current user's token
const token_current_user = customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser");
const current_user = customLocalStorage.getItemFromLocalStorage("MFoody - currentUser");

// Call APIs

export async function addFeedBackMailMfoodyApi(feedBackMail) {
    console.log('Call addFeedBackMailMfoodyApi');

    try {
        const res = await axios({
            url: feedbackUrls.feedback_add_local,
            method: 'POST',
            data: feedBackMail,
            // headers: {
            //     // 'Authorization': 'Bearer ' + token_current_admin
            //     'Authorization': 'Bearer ' + token_current_user
            // }
        });

        // Handle if successfully get data
        console.log(res);
        showAlert('Your Feed Back Sent!', 2000, 'mfoody_success');
        return res;

    } catch (err) {
        // Handle if failed
        showAlert('Something Wrong!', 2000, 'mfoody_fail');
        console.log(err);
    }
}

