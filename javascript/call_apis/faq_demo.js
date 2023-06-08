let userSignedIn = localStorageCookiesProcess.checkUserRole();
if (userSignedIn) {
    // Hide Subscribe
    document.querySelector('#subscribeMfoody').style.display = 'none';
}