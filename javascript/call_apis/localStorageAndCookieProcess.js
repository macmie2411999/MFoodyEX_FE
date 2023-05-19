// import { index_page_local , signin_signup_page_local} from './default_urls_page.js'

var localStorageCookiesProcess = {

    removeAllSelectedToEditObjects: function () {
        customLocalStorage.removeItemFromLocalStorage("MFdooy - selectedToEditProduct");
        customLocalStorage.removeItemFromLocalStorage("MFdooy - selectedToEditUser");
        customLocalStorage.removeItemFromLocalStorage("MFdooy - selectedToEditOrder");
    },

    checkTokenAndUserInformation: function () {
        if (customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser") === null || customLocalStorage.getItemFromLocalStorage("MFoody - currentUser") === null) {
            window.location.href = "http://127.0.0.1:5501/signin_signup_demo.html";
        }
    },

    checkTokenAndUserInformationAtLoginPage: function () {
        let checkCurrentUser = true;
        if(customLocalStorage.getItemFromLocalStorage("MFoody - currentUser") === null){
            checkCurrentUser = false;
        } else {
            if(customLocalStorage.getItemFromLocalStorage("MFoody - currentUser").roleUser !== "ADMIN"){
                checkCurrentUser = false;
            }
        }
        
        if (checkCurrentUser && customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser") !== null) {
            console.log(customLocalStorage.getItemFromLocalStorage("MFoody - currentUser").roleUser)
            window.location.href = "http://127.0.0.1:5501/index.html";
        } 
    },

    checkTokenAndUserInformationAtOtherPages: function () {
        let checkCurrentUser = true;
        if(customLocalStorage.getItemFromLocalStorage("MFoody - currentUser") === null){
            checkCurrentUser = false;
        } else {
            if(customLocalStorage.getItemFromLocalStorage("MFoody - currentUser").roleUser !== "ADMIN"){
                checkCurrentUser = false;
            }
        }
        
        if (checkCurrentUser && customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser") !== null) {
            console.log(customLocalStorage.getItemFromLocalStorage("MFoody - currentUser").roleUser)
            // window.location.href = "http://127.0.0.1:5501/index.html";
        } else {
            window.location.href = "http://127.0.0.1:5501/signin_signup_demo.html";
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