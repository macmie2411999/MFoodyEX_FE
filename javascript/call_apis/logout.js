import { applicationUrls } from './default_apis.js'
import { pageUrls } from './default_urls_page.js'


const logoutButton = document.querySelector('#buttonLogout');

logoutButton.addEventListener('click', () => {
    let promise = axios({
        url: applicationUrls.application_logout_local,
        method: 'POST',
        // data: newUser,
        // headers: {
        //     // "Content-Type": "application/json",
        //     'Authorization': 'Bearer ' + token_admin
        // },
    })
        .then(function (response) {
            console.log(response);

            // Remove all Local Storage and Cookies
            localStorageCookiesProcess.removeAllSelectedToEditObjects();
            customLocalStorage.removeItemFromLocalStorage("MFoody - currentUser");
            customLocalStorage.removeItemFromLocalStorage("MFoody - tokenCurrentUser");
            window.location.href = pageUrls.signin_signup_page_local;
        })
        .catch(function (response) {
            console.log(response);
            alert(response.response.data)
        });
});
