function printInvoice() {
    var invoice = document.querySelector('.invoice-container').innerHTML;
    var originalContent = document.body.innerHTML;
    document.body.innerHTML = invoice;
    window.print();
    document.body.innerHTML = originalContent;
  }
  