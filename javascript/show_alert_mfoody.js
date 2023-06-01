function showAlert(message, duration, type) {
  var alertBox = document.getElementById('custom-alert');
  var alertMessage = document.getElementById('alert-message');

  alertMessage.textContent = message;
  alertBox.classList.add(type);
  alertBox.style.display = 'block';

  setTimeout(function() {
    alertBox.style.display = 'none';
    alertBox.classList.remove(type);
  }, duration);
}