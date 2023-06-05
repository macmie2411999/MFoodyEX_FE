/* Set rates + misc */
let taxRate = 0;
let shippingRate = 15.00;
let fadeTime = 300;

/* Assign actions */
$('.product-quantity input').change(function () {
  updateQuantity(this);
});

$('.product-removal button').click(function () {
  removeItem(this);
});

/* Update quantity */
function updateQuantity(quantityInput) {
  /* Calculate line price */
  let productRow = $(quantityInput).parent().parent().parent().parent();
  let price = parseFloat(productRow.find('.product-price').text().match(/[\d\.]+/));
  let quantity = $(quantityInput).val();
  let linePrice = price * quantity;

  /* Update line price display and recalc cart totals */
  productRow.find('.product-line-price').each(function () {
    $(this).fadeOut(fadeTime, function () {
      $(this).text(linePrice.toFixed(2) + '₽');
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });
}

function recalculateCart() {
  let subtotal = 0;

  /* Sum up row totals */
  $('.product').each(function () {
    let price = $(this).find('.product-price').text().replace('$', '');
    let quantity = $(this).find('.quantity-input').val();
    let linePrice = parseFloat(price) * quantity;
    $(this).find('.product-line-price').text(linePrice.toFixed(2) + '₽');
    subtotal += linePrice;
  });

  /* Calculate totals */
  let tax = subtotal * taxRate;
  let shipping = $('#shipping-select').val() == '0' ? 0 : shippingRate;
  let total = subtotal + tax + shipping;

  /* Update totals display */
  $('.totals-value').fadeOut(fadeTime, function () {
    $('#cart-subtotal').html(subtotal.toFixed(2) + '₽');
    $('#cart-tax').html(tax.toFixed(2) + '₽');
    $('#cart-shipping').html(shipping.toFixed(2) + '₽');
    $('#cart-total').html(total.toFixed(2) + '₽');
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
  let productRow = $(removeButton).parent().parent().parent().parent().parent().parent().parent();
  productRow.slideUp(fadeTime, function () {
    productRow.remove();
    recalculateCart();
  });
}

$('#shipping-select').change(function() {
  recalculateCart();
});
