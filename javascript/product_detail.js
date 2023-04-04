$(function () {
    // Click on detail
    $("ul.menu-items > li").click(function () {
        $("ul.menu-items > li").removeClass("active");
        $(this).addClass("active");
    });

    // Click on ATTR and ATTR2
    $(".attr, .attr2").click(function () {
        var clase = $(this).attr("class");
        $("." + clase).removeClass("active");
        $(this).addClass("active");
    });

    // Click on QUANTITY
    $(".btn-minus, .btn-plus").click(function () {
        var input = $(".section > div > input");
        var now = parseInt(input.val());
        if ($.isNumeric(now)) {
            input.val($(this).hasClass("btn-minus") ? Math.max(now - 1, 1) : now + 1);
        } else {
            input.val("1");
        }
    });
});

$(document).ready(function () {
    //-- Click on detail
    // Ẩn tất cả các container-content-bottom-product-detail trừ container-content-bottom-product-detail.active
    $(".container-content-bottom-product-detail").not(".active").hide();
    $("ul.menu-items > li").on("click", function () {
        // Remove active class from all menu items
        $("ul.menu-items > li").removeClass("active");

        // Add active class to clicked menu item
        $(this).addClass("active");

        // Hide all content containers
        $(".container-content-bottom-product-detail").hide();

        // Show the corresponding content container based on the clicked menu item's data attribute
        $("#" + $(this).data("content")).show();
    });
});


