// const toggles = document.querySelectorAll('.toggle');

// toggles.forEach(toggle => {
//   toggle.addEventListener('click', () => {
//     const answer = toggle.parentNode.nextElementSibling;
//     if (answer.style.height) {
//       answer.style.height = null;
//     } else {
//       answer.style.height = answer.scrollHeight + 'px';
//     }
//     toggle.textContent = toggle.textContent === '+' ? '-' : '+';
//   });
// });

const faqToggles = document.querySelectorAll('.faq-toggle');

faqToggles.forEach(function(toggle) {
  toggle.addEventListener('click', function() {
    const faq = toggle.parentNode.parentNode;
    const answer = faq.querySelector('.faq-answer');
    const isOpen = faq.classList.contains('active');
    faq.classList.toggle('active');
    if (isOpen) {
      toggle.innerHTML = '<i class="fa-solid fa-plus"></i>';
      answer.style.maxHeight = null;
    } else {
        toggle.innerHTML = '<i class="fa-solid fa-minus"></i>';
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});