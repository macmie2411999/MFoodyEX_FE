// -by Mac Mie
// Import class User

import { token_admin, token_user } from './default_tokens.js';
import { pageUrls } from './default_urls_page.js';
import { applicationUrls, userUrls } from './default_apis.js';

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
                    showAlert('Your UserName or Password is invalid!', 2000, 'mfoody_fail');
                    console.log(response);
                });
        }
    });

    // $('#signup_user_form').validate({
    //     rules: {
    //         emailUserSignUp: {
    //             required: true,
    //             email: true
    //         },
    //         passwordUserSignUp: {
    //             required: true,
    //             minlength: 8
    //         },
    //         rePasswordUserSignUp: {
    //             required: true,
    //             minlength: 8,
    //             equalTo: "#passwordUserSignUp"
    //         },
    //         nameUserSignUp: {
    //             required: true,
    //             minlength: 6
    //         },
    //         phoneNumberUserSignUp: {
    //             required: true,
    //             number: true,
    //             minlength: 6,
    //             maxlength: 15
    //         },
    //         addressUserSignUp: {
    //             required: true,
    //             minlength: 6
    //         }
    //     },
    //     messages: {
    //         emailUserSignUp: {
    //             required: "Please enter your email address.",
    //             email: "Please enter a valid email address."
    //         },
    //         passwordUserSignUp: {
    //             required: "Please enter your password.",
    //             minlength: "Your password must be at least 8 characters long."
    //         },
    //         rePasswordUserSignUp: {
    //             required: "Please confirm your password.",
    //             minlength: "Your password must be at least 8 characters long.",
    //             equalTo: "Your passwords do not match."
    //         },
    //         nameUserSignUp: {
    //             required: "Please enter your full name."
    //         },
    //         phoneNumberUserSignUp: {
    //             required: "Please enter your phone number.",
    //             number: "Please enter a valid phone number."
    //         },
    //         addressUserSignUp: {
    //             required: "Please enter your address."
    //         }
    //     },
    //     submitHandler: function () {
    //         let emailUserSignUp = $('#emailUserSignUp').val();
    //         let passwordUserSignUp = $('#passwordUserSignUp').val();
    //         let nameUserSignUp = $('#nameUserSignUp').val();
    //         let phoneNumberUserSignUp = $('#phoneNumberUserSignUp').val();
    //         let addressUserSignUp = $('#addressUserSignUp').val();

    //         let newUser = {
    //             emailUser: emailUserSignUp,
    //             passwordUser: passwordUserSignUp,
    //             nameUser: nameUserSignUp,
    //             phoneNumberUser: phoneNumberUserSignUp,
    //             addressUser: addressUserSignUp,
    //             roleUser: "USER"
    //         };
    //         console.log(newUser);
    //         let promise = axios({
    //             url: userUrls.user_add_local,
    //             method: 'POST',
    //             data: newUser,
    //         })
    //             .then(function (response) {
    //                 console.log(response);
    //                 showAlert('Your Account Is Created!', 2000, 'mfoody_success');
    //             })
    //             .catch(function (response) {
    //                 console.log(response);
    //                 showAlert('Please Check Your Account Information!', 2000, 'mfoody_fail');
    //             });
    //     }
    // });
});

document.getElementById('signup_user_form').addEventListener('submit', function(event) {
  event.preventDefault(); // Ngăn chặn hành vi submit mặc định của form
  validateSignUpForm(); // Gọi hàm validateSignUpForm()
});

function validateSignUpForm() {
    // Lấy giá trị từ các trường đầu vào
    let emailUserSignUp = document.getElementById('emailUserSignUp').value;
    let passwordUserSignUp = document.getElementById('passwordUserSignUp').value;
    let rePasswordUserSignUp = document.getElementById('rePasswordUserSignUp').value;
    let nameUserSignUp = document.getElementById('nameUserSignUp').value;
    let phoneNumberUserSignUp = document.getElementById('phoneNumberUserSignUp').value;
    let addressUserSignUp = document.getElementById('addressUserSignUp').value;

    // Kiểm tra các trường đầu vào
    if (emailUserSignUp === '') {
        showAlert('Please enter your email address.', 2000, 'mfoody_fail');
        return false;
    }

    if (!validateEmail(emailUserSignUp)) {
        showAlert('Please enter a valid email address.', 2000, 'mfoody_fail');
        return false;
    }

    if (passwordUserSignUp === '') {
        showAlert('Please enter your password.', 2000, 'mfoody_fail');
        return false;
    }

    if (passwordUserSignUp.length < 8) {
        showAlert('Password must be at least 8 characters.', 2000, 'mfoody_fail');
        return false;
    }

    if (rePasswordUserSignUp === '') {
        showAlert('Please confirm the password.', 2000, 'mfoody_fail');
        return false;
    }

    if (rePasswordUserSignUp !== passwordUserSignUp) {
        showAlert('Confirmation password does not match.', 2000, 'mfoody_fail');
        return false;
    }

    if (nameUserSignUp === '') {
        showAlert('Please enter full name.', 2000, 'mfoody_fail');
        return false;
    }

    if (phoneNumberUserSignUp === '') {
        showAlert('Please enter the phone number.', 2000, 'mfoody_fail');
        return false;
    }

    if (isNaN(phoneNumberUserSignUp)) {
        showAlert('Please enter a valid phone number.', 2000, 'mfoody_fail');
        return false;
    }

    if (phoneNumberUserSignUp.length < 8 || phoneNumberUserSignUp.length > 10) {
        showAlert('The phone number must be between 8 and 10 characters.', 2000, 'mfoody_fail');
        return false;
    }

    if (addressUserSignUp === '') {
        showAlert('Please enter your address.', 2000, 'mfoody_fail');
        return false;
    }

    // Nếu không có lỗi, tiến hành thêm mới người dùng
    let newUser = {
        emailUser: emailUserSignUp,
        passwordUser: passwordUserSignUp,
        nameUser: nameUserSignUp,
        phoneNumberUser: phoneNumberUserSignUp,
        addressUser: addressUserSignUp,
        roleUser: "USER"
    };

    // Gửi yêu cầu tạo người dùng mới
    axios.post(userUrls.user_add_local, newUser)
        .then(function (response) {
            console.log(response);
            showAlert('Your account has been created!', 2000, 'mfoody_success');
            setTimeout(() => {
                location.reload();
            }, 4000);
        })
        .catch(function (error) {
            console.log(error);
            showAlert('Please check your account information!', 2000, 'mfoody_fail');
        });

    return true;
}

// Hàm kiểm tra định dạng email
function validateEmail(email) {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
}

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
                window.location.href = pageUrls.home_page_local;
            } else if (currentUser.roleUser === "ADMIN") {
                localStorageCookiesProcess.removeAllMfoodyObjects();
                showAlert('Your have role invalid!', 2000, 'mfoody_fail');
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

