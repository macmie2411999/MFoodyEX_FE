const productsPerPage = 10;
let currentPage = 1;

function createProductCard() {
    return `
    <div class="card" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        <span class="tag-product"> New Product </span>
        <span class="heart-icon"> <i class="fa-solid fa-heart"></i> </span>
        <img src="../image/products/Vegetable_Avovado_3.webp" class="card-img-top" alt="...">
        <div class="card-body">
            <span class="rated-star card-text"><i class="fa-solid fa-star"></i> 4.2 </span>
            <h5 class="card-title">Name Product </h5>
        </div>
        <div class="card-footer">
            <button class="tag-prices">
                <span class="tag-sale-price">150$</span>
                <span class="tag-full-price">170$</span>
            </button>
            <button class="more-infor"> <a href="../detail.html?idProduct=1"><i class="fa-solid fa-magnifying-glass"></i></a></button>
            <button class="to-cart"><i class="fa-solid fa-cart-plus"></i></button>
        </div>
    </div>`;
}

function showProducts() {
    const productList = $("#productList");
    productList.empty();

    for (let i = 0; i < productsPerPage; i++) {
        productList.append(createProductCard());
    }
}

function updatePagination() {
    const pagination = $("#pagination");
    pagination.empty();

    const totalPages = Math.ceil(30 / productsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const btn = $(`<button class="page-btn">${i}</button>`);
        btn.click(() => {
            currentPage = i;
            showProducts();
            updatePagination();
        });

        if (i === currentPage) {
            btn.addClass("active");
        }

        pagination.append(btn);
    }
}

$("#prevBtn").click(() => {
    if (currentPage > 1) {
        currentPage--;
        showProducts();
        updatePagination();
    }
});

$("#nextBtn").click(() => {
    const totalPages = Math.ceil(30 / productsPerPage);

    if (currentPage < totalPages) {
        currentPage++;
        showProducts();
        updatePagination();
    }
});

showProducts();
updatePagination();
