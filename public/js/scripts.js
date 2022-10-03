const mobileButtonHamburger = document.getElementById('hamburger-button')
const mobileButtonX = document.getElementById('x-button')
const mobileMenu = document.getElementById('mobile-menu')

const hamburgerChange = () => {
    mobileButtonHamburger.classList.add('hidden');
    mobileButtonX.classList.remove('hidden');
    mobileMenu.classList.remove('hidden');
}

const xChange = () => {
    mobileButtonX.classList.add('hidden');
    mobileButtonHamburger.classList.remove('hidden');
    mobileMenu.classList.add('hidden');
}

mobileButtonHamburger.addEventListener('click', hamburgerChange);
mobileButtonX.addEventListener('click', xChange);