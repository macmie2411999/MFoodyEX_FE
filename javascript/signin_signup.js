// const signUpButton = document.getElementById('signUp');
// const signInButton = document.getElementById('signIn');
// const container = document.getElementById('container');

// signUpButton.addEventListener('click', () =>
// container.classList.add('right-panel-active'));

// signInButton.addEventListener('click', () =>
// container.classList.remove('right-panel-active'));

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

function activateRightPanel() {
  container.classList.add('right-panel-active');
}

function deactivateRightPanel() {
  container.classList.remove('right-panel-active');
}

signUpButton.addEventListener('click', activateRightPanel);
signInButton.addEventListener('click', deactivateRightPanel);
