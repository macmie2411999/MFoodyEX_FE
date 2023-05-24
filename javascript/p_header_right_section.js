

(function ($) {
  const elements = {
    searchButton: $("#btn-search"),
    searchInput: $("#search")
  };

  elements.searchButton.on("click", (e) => {
    e.preventDefault();

    const searchValue = elements.searchInput.val().trim();

    if (searchValue === "") {
      elements.searchInput.animate({
        width: "toggle"
      }).focus();
    } else {
      window.location.href = `catalog_demo_search.html?search=${encodeURIComponent(searchValue)}`;
      elements.searchInput.val(""); // Reset giá trị trong ô tìm kiếm
    }
  });

  elements.searchInput.on("keydown", (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();

      const searchValue = elements.searchInput.val().trim();

      if (searchValue !== "") {
        window.location.href = `catalog_demo_search.html?search=${encodeURIComponent(searchValue)}`;
        elements.searchInput.val(""); // Reset giá trị trong ô tìm kiếm
      }
    }
  });
})(jQuery);
 