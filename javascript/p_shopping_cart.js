/* Set rates + misc */
var taxRate = 0.05;
var shippingRate = 15.00;
var fadeTime = 300;


/* Assign actions */
$('.product-quantity input').change(function () {
  // console.log('change');
  updateQuantity(this);
});

$('.product-removal button').click(function () {
  removeItem(this);
});

/* Update quantity */
function updateQuantity(quantityInput) {
  /* Calculate line price */
  var productRow = $(quantityInput).parent().parent().parent().parent();
  var price = parseFloat(productRow.find('.product-price').text().match(/[\d\.]+/));
  var quantity = $(quantityInput).val();
  var linePrice = price * quantity;

  /* Update line price display and recalc cart totals */
  productRow.find('.product-line-price').each(function () {
    $(this).fadeOut(fadeTime, function () {
      $(this).text(linePrice.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });
}

function recalculateCart() {
  var subtotal = 0;

  /* Sum up row totals */
  $('.product').each(function () {
    var price = $(this).find('.product-price').text().replace('$', '');
    var quantity = $(this).find('.quantity-input').val();
    var linePrice = parseFloat(price) * quantity;
    $(this).find('.product-line-price').text(linePrice.toFixed(2));
    subtotal += linePrice;
  });

  /* Calculate totals */
  var tax = subtotal * taxRate;
  var shipping = (subtotal > 0 ? shippingRate : 0);
  var total = subtotal + tax + shipping;

  /* Update totals display */
  $('.totals-value').fadeOut(fadeTime, function () {
    $('#cart-subtotal').html(subtotal.toFixed(2));
    $('#cart-tax').html(tax.toFixed(2));
    $('#cart-shipping').html(shipping.toFixed(2));
    $('#cart-total').html(total.toFixed(2));
    if (total == 0) {
      $('.checkout').fadeOut(fadeTime);
    } else {
      $('.checkout').fadeIn(fadeTime);
    }
    $('.totals-value').fadeIn(fadeTime);
  });
}

/* Remove item from cart */
function removeItem(removeButton) {
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent().parent().parent().parent().parent().parent();
  productRow.slideUp(fadeTime, function () {
    productRow.remove();
    recalculateCart();
  });
}