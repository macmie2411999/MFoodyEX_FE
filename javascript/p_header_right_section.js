(function ($) {
    const elements = {
      searchButton: $("#btn-search"),
      searchInput: $("#search")
    };
  
    elements.searchButton.on("click", (e) => {
      e.preventDefault();
  
      elements.searchInput
        .animate({
          width: "toggle"
        })
        .focus();
    });
  })(jQuery);
  