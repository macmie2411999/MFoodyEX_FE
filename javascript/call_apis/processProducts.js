
// -byMacMie

var processlistProducts = {

    sortByRatingDesc: function (listProducts) {
        return listProducts.sort((a, b) => b.ratingProduct - a.ratingProduct);
    },

    getDiscountedlistProducts: function (listProducts) {
        return listProducts.filter(product => product.fullPriceProduct - product.salePriceProduct > 0)
            .sort((a, b) => (b.fullPriceProduct - b.salePriceProduct) - (a.fullPriceProduct - a.salePriceProduct));
    },

    sortByPopularityDesc: function (listProducts) {
        return listProducts.sort((a, b) => (b.importQuantityProduct - b.storeHouseQuantityProduct) - (a.importQuantityProduct - a.storeHouseQuantityProduct));
    },

    filterByBrand: function (listProducts, brandName) {
        return listProducts.filter(product => product.brandProduct === brandName);
    },

    // sortByNewnessDesc: function (listProducts) {
    //     return listProducts.sort((a, b) => new Date(b.importDateProduct) - new Date(a.importDateProduct));
    // },

    sortByNewnessDesc: function(listProducts) {
        return listProducts.sort((a, b) => {
            // Day to milisecond
            let dateA = Date.parse(a.importDateProduct.split("/").reverse().join("-"));
            let dateB = Date.parse(b.importDateProduct.split("/").reverse().join("-"));
            
            // Compare
            if (dateA > dateB) {
                return -1;
            }
            if (dateA < dateB) {
                return 1;
            }
            return 0;
        });
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