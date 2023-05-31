// -by Mac Mie
// Import class User

import { token_admin, token_user } from './default_tokens.js';
import { pageUrls} from './default_urls_page.js';
import { applicationUrls, userUrls} from './default_apis.js';

const signInButton = document.getElementById('button-signin');

// Check if Token and User's role valid
localStorageCookiesProcess.checkTokenAndUserInformationAtLoginPage();

$(document).ready(function () {
    $('#signin_user_form').validate({
        rules: {
            emailLogin: {
                required: true,
                email: true
            },
            passwordLogin: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            emailLogin: {
                required: "Please enter your email address.",
                email: "Please enter a valid email address."
            },
            passwordLogin: {
                required: "Please enter your password.",
                minlength: "Your password is not valid."
            }
        },
        submitHandler: function () {
            let userName = $('#emailLogin').val();
            let userPassword = $('#passwordLogin').val();
            console.log(JSON.stringify({ userName, userPassword }));

            let promise = axios({
                url: applicationUrls.application_login_local,
                method: 'POST',
                data: JSON.stringify({ userName, userPassword }),
                headers: {
                    "Content-Type": "application/json",
                    // 'Authorization': 'Bearer ' + token_admin
                }
            })
                .then(function (response) {
                    // Handle if successfully get data
                    let tokenLogin = response.data;
                    console.log(tokenLogin);
                    customLocalStorage.saveItemToLocalStorage(tokenLogin, "MFoody - tokenCurrentUser");
                    
                    // When get token, use it to get UserMfoody Infor
                    getUserByEmailApi(tokenLogin, userName);
                })
                .catch(function (response) {
                    // Handle if failed
                    customLocalStorage.removeItemFromLocalStorage("MFoody - tokenCurrentUser");
                    customLocalStorage.removeItemFromLocalStorage("MFoody - currentUser");
                    alert("Your UserName or Password is invalid!" );
                    console.log(response);
                });
        }
    });
    
});

function getUserByEmailApi(tokenLogin, userName) {
    let promise = axios({
        url: userUrls.user_getByEmail_local + userName,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + tokenLogin
        }
    })

    .then(function (res) {
        let currentUser = res.data;
        console.log(currentUser);
        customLocalStorage.saveItemToLocalStorage(currentUser, "MFoody - currentUser");

        if (currentUser.roleUser === "USER") {
            // Direct to admin main page
            window.location.href = pageUrls.catalog_page_local;
        } else if (currentUser.roleUser === "ADMIN"){
            localStorageCookiesProcess.removeAllMfoodyObjects();

            alert("Your have role invalid!")
        }

    })

    .catch(function (err) {
        // Handle if failed
        customLocalStorage.removeItemFromLocalStorage("MFoody - currentUser");
        console.log(err);
    })
};

// signInButton.addEventListener('click', () => {
//     // Lấy thông tin form đăng nhập
//     const userName = $('#emailLogin').val();
//     const userPassword = $('#passwordLogin').val();
//     console.log(JSON.stringify({ userName, userPassword }));
//     let promise = axios({
//         url: application_login_local,
//         method: 'POST',
//         data: JSON.stringify({ userName, userPassword }),
//         headers: {
//             "Content-Type": "application/json",
//             // 'Authorization': 'Bearer ' + token_admin
//         }
//     })

//     promise.then(function (res) {
//         // Handle if successfully get data
//         let tokenLogin = res.data;
//         console.log(tokenLogin);
//         customLocalStorage.saveItemToLocalStorage(tokenLogin, "tokenCurentUser");

//         // Direct to main page
//         window.location.href = 'http://127.0.0.1:5501/index.html';
//     })

//     promise.catch(function (err) {
//         // Handle if failed
//         customLocalStorage.saveItemToLocalStorage('', "tokenCurentUser");
//         console.log(err);
//     })
// });

