const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileSymbolHamburger = document.getElementById('hamburger-symbol');
const mobileSymbolX = document.getElementById('x-symbol');
const mobileMenu = document.getElementById('mobile-menu');

const hamburgerToggle = () => {
    if(!mobileSymbolHamburger.classList.contains('hidden')) {
        mobileSymbolHamburger.classList.add('hidden');
        mobileSymbolX.classList.remove('hidden');
        mobileMenu.classList.remove('hidden');
    } else if (mobileSymbolHamburger.classList.contains('hidden')) {
        mobileSymbolHamburger.classList.remove('hidden');
        mobileSymbolX.classList.add('hidden');
        mobileMenu.classList.add('hidden');
    } else {
        console.log("Mobile menu button exception.")
    }
}

mobileMenuButton.addEventListener('click', hamburgerToggle);