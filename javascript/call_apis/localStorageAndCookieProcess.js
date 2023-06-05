// import { index_page_local , signin_signup_page_local, catalog_page_local} from './default_urls_page.js'

let homePage = "http://127.0.0.1:5501/html/header_demo_2.html";
let signInPage = "http://127.0.0.1:5501/html/signin_signup_demo.html";

let localStorageCookiesProcess = {

    removeAllSelectedToEditObjects: function () {
        customLocalStorage.removeItemFromLocalStorage("MFdooy - selectedToEditProduct");
        customLocalStorage.removeItemFromLocalStorage("MFdooy - selectedToEditUser");
        customLocalStorage.removeItemFromLocalStorage("MFdooy - selectedToEditOrder");
    },

    removeAllMfoodyObjects: function () {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith("MFoody")) {
                localStorage.removeItem(key);
            }
        });
    },
    
    checkTokenAndUserInformation: function () {
        if (customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser") === null || customLocalStorage.getItemFromLocalStorage("MFoody - currentUser") === null) {
            window.location.href = signInPage;
        }
    },

    checkTokenAndUserInformationAtLoginPage: function () {
        let checkCurrentUser = true;
        if (customLocalStorage.getItemFromLocalStorage("MFoody - currentUser") === null) {
            checkCurrentUser = false;
        } else {
            if (customLocalStorage.getItemFromLocalStorage("MFoody - currentUser").roleUser !== "USER") {
                checkCurrentUser = false;
            } else {
                // window.location.href = "http://127.0.0.1:5501/html/catalog_demo.html";
            }
        }

        if (checkCurrentUser && customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser") !== null) {
            console.log(customLocalStorage.getItemFromLocalStorage("MFoody - currentUser").roleUser)
            window.location.href = homePage;
        }
    },

    checkUserRole: function() {
        let currentUser = customLocalStorage.getItemFromLocalStorage("MFoody - currentUser");
        let token = customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser");
    
        if (!currentUser || !token) {
            // alert("You need to Sign In to leave your comment");
            return false;
        }
    
        if (currentUser.roleUser !== "USER") {
            // alert("You are not authorized to leave a comment");
            return false;
        }
    
        // Allow the user to add a comment
        // Your comment code here...
    
        return true;
    },    

    checkTokenAndUserInformationAtOtherPages: function () {
        let checkCurrentUser = true;
        if (customLocalStorage.getItemFromLocalStorage("MFoody - currentUser") === null) {
            checkCurrentUser = false;
        } else {
            if (customLocalStorage.getItemFromLocalStorage("MFoody - currentUser").roleUser !== "USER") {
                checkCurrentUser = false;
            }
        }

        if (checkCurrentUser && customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser") !== null) {
            console.log(customLocalStorage.getItemFromLocalStorage("MFoody - currentUser").roleUser)
            // window.location.href = "http://127.0.0.1:5501/index.html";
        } else {
            window.location.href = signInPage;
        }
    },

    removeSpecificSelectedToEditObject: function (name) {
        customLocalStorage.removeItemFromLocalStorage(name);
    },

    checkNullSpecificSelectedToEditObjectAndDirect: function (name, urlPage) {
        if (customLocalStorage.getItemFromLocalStorage(name) === null) {
            window.location.href = urlPage;
        }
    },

}