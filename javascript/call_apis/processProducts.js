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

    filterByCategory: function (listProducts, categoryName) {
        return listProducts.filter(product => product.categoryProduct === categoryName);
    },

    removeProductById(listProducts, idProduct) {
        // const productId = parseInt(idProduct, 10); // Chuyển đổi idProduct thành kiểu int

        // filter
        const filteredProducts = listProducts.filter(product => product.idProduct !== idProduct);

        return filteredProducts;
    },

    sortByNewnessDesc: function (listProducts) {
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

    getProductById: function (listProducts, productId) {
        return listProducts.find(product => product.idProduct === productId);
    },

    /**
     * This function is used to get remaining products that are not present in other given arrays.
     * 
     * @param {Array} arrayAllProducts - An array of all product objects.
     * @param {...Array} arraysToRemove - An arbitrary number of arrays containing product objects that should be removed from the first array.
     * 
     * Each product object in the arrays should have a property 'idProduct' which is used to compare products.
     * 
     * @returns {Array} An array containing product objects that are in arrayAllProducts but not in any array in arraysToRemove.
     */
    getRemainingProducts: function (arrayAllProducts, ...arraysToRemove) {
        let arrayRemainProducts = arrayAllProducts.filter(product =>
            !arraysToRemove.flat().find(itemToRemove => itemToRemove.idProduct === product.idProduct)
        );
        return arrayRemainProducts;
    },

    /**
     * This function is used to randomly select N products from an array of products.
     * 
     * @param {Array} arrayProducts - An array of product objects.
     * @param {number} n - The number of products to randomly select.
     * 
     * @returns {Array} An array containing N randomly selected product objects.
     */
    getRandomProducts: function (arrayProducts, n) {
        let shuffledProducts = [...arrayProducts]; // copy the original array

        for (let i = shuffledProducts.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // get random index
            [shuffledProducts[i], shuffledProducts[j]] = [shuffledProducts[j], shuffledProducts[i]]; // swap elements
        }

        return shuffledProducts.slice(0, n); // return first N elements
    },

    /**
     * This function is used to generate tags for a product based on certain conditions.
     * 
     * @param {Object} product - The product object.
     * @param {number} baseRatingProduct - The base rating for tagging a product as "topRate".
     * @param {number} baseDiscountProduct - The base discount for tagging a product as "saleOff".
     * @param {number} baseLeftOverProduct - The base leftover for tagging a product as "topSale".
     * @param {string} baseImportDateProduct - The base import date (in "dd/mm/yyyy" format) for tagging a product as "new".
     * 
     * @returns {Array} An array containing the tags for the product.
     */
    generateProductTags: function (product, baseRatingProduct, baseDiscountProduct, baseLeftOverProduct, baseImportDateProduct) {
        let tags = [];

        // Parse dates
        const [baseDay, baseMonth, baseYear] = baseImportDateProduct.split("/");
        const baseDate = new Date(parseInt(baseYear), parseInt(baseMonth) - 1, parseInt(baseDay));

        const [productDay, productMonth, productYear] = product.importDateProduct.split("/");
        const productDate = new Date(parseInt(productYear), parseInt(productMonth) - 1, parseInt(productDay));

        // Generate tags
        if (product.ratingProduct >= baseRatingProduct) {
            tags.push("Best");
        }
        if (product.fullPriceProduct - product.salePriceProduct >= baseDiscountProduct) {
            tags.push("Discount");
        }
        if (product.importQuantityProduct - product.storehouseQuantityProduct >= baseLeftOverProduct) {
            tags.push("Popular");
        }
        if (productDate >= baseDate) {
            tags.push("New");
        }

        return tags;
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