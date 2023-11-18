// 1. Vi behöver en knapp
// 2. Click-event på knappen
// 3. Trigga class på en nav beroende på om menyn är öppen eller inte



const menuBtn = document.querySelector('#toggleMenu');
const menu = document.querySelector('#menu');

menuBtn.addEventListener('click', toggleMenu);


function toggleMenu() {
    const isOpen = menu.classList.toggle('open');
    menuBtn.classList.toggle('open');
    if (isOpen) {
        menuBtn.setAttribute('aria-label', 'Stäng meny');
    } else {
        menuBtn.setAttribute('aria-label', 'Öppna meny');
    }
}