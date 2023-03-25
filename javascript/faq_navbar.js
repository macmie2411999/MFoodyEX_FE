// const navItems = document.querySelectorAll('.nav-item');
// const questionLists = document.querySelectorAll('.question-list');

// navItems.forEach(item => {
//   item.addEventListener('click', () => {
//     const target = item.dataset.target;
//     questionLists.forEach(list => {
//       if (list.id === target) {
//         list.style.display = 'block';
//         item.style.backgroundColor = 'blue'; 
//       } else {
//         list.style.display = 'none';
//       }
//     });
//   });
// });

const navItems = document.querySelectorAll('.nav-item');
const questionLists = document.querySelectorAll('.question-list');
let selectedNavItem = null;

navItems.forEach(item => {
  item.addEventListener('click', () => {
    // Set the style for the clicked nav item
    item.style.backgroundColor = 'transparent';
    item.style.color = '#009f4d';

    // Reset the style for the previously selected nav item
    if (selectedNavItem && selectedNavItem !== item) {
      selectedNavItem.style.backgroundColor = 'transparent';
      selectedNavItem.style.color = 'black';
    }

    const target = item.dataset.target;
    questionLists.forEach(list => {
      if (list.id === target) {
        list.style.display = 'block';
      } else {
        list.style.display = 'none';
      }
    });

    // Store the clicked nav item as the selected item
    selectedNavItem = item;
  });
});
