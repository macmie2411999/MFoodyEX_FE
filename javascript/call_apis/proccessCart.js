// -byMacMie

let processCart = {

    checkProductInCart: function (cartOfCurrentUser, idProduct) {
        return cartOfCurrentUser.listDetailProductCarts.some(detailProductCart => detailProductCart.idDetailProductCartMFoody.idProduct === idProduct);
    },

    isArrayNull: function (arr) {
        return arr === null;
    },

    isArrayEmpty: function (arr) {
        return arr.length === 0;
    },

    isArrayNullOrEmpty: function (arr) {
        return arr === null || arr.length === 0;
    }

}