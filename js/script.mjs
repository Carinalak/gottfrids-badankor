
// --------------------------------------- PAGE 1 Sales-page:---------------------------------------------------

import ducks from "./ducks.mjs";

const duckHtmlContainer = document.querySelector('#duckContainer');
const cartHtmlContainer = document.querySelector('#cart');

let totalItemsInCart = 0;

function addToCart(e) {
    const index = e.currentTarget.dataset.id;
    ducks[index].amount += 1;
    totalItemsInCart += 1;
    updateCartIcon();
    printDucks();
    printCartDucks();
}
function increaseAmount(e) {                        /// 1. increase amount
    const index = e.currentTarget.dataset.id;
    ducks[index].amount += 1;
    totalItemsInCart += 1;
    updateCartIcon();
    printCartDucks();

console.log(increaseAmount);
}

function decreaseAmount(e) {                        /// 1. decrease amount
    const index = e.currentTarget.dataset.id;
    if (ducks[index].amount > 0) {
        ducks[index].amount -= 1;
        totalItemsInCart -= 1;
        updateCartIcon();
        printCartDucks();
    }
}

// Remove from cart:
function removeDuck(e) {
    const index = e.currentTarget.id.replace('delete-', '');  
    if (index > -1) {
        totalItemsInCart -= ducks[index].amount;
        ducks[index].amount = 0; 
    }
    updateCartIcon();
    printCartDucks();
}

function updateCartIcon() {
    const cartIcon = document.getElementById('cartIcon');
    if (totalItemsInCart > 0) {
        cartIcon.innerHTML = `shopping_cart <span class="cart-counter">${totalItemsInCart}</span>`;
    } else {
        cartIcon.innerHTML = 'shopping_cart';
    }
}
function getRatingStars(rating) {
    const starIcon = '<i class="fas fa-star"></i>';
    const emptyStarIcon = '<i class="far fa-star"></i>';
    const fullStars = starIcon.repeat(rating);
    const emptyStars = emptyStarIcon.repeat(5 - rating);
    return fullStars + emptyStars;
}

// --------------------------------------------------------- SORT ----------------------------------------------------------

const sortForm = document.getElementById('sortSelect'); 
sortForm.addEventListener('change', handleSortChange);

function handleSortChange() {
    const selectedSortOption = sortForm.value;
    switch (selectedSortOption) {
        case 'nameAlphaFirst':
            ducks.sort((duck1, duck2) => duck1.name.localeCompare(duck2.name));
            break;
        case 'nameAlphaLast':
            ducks.sort((duck1, duck2) => duck2.name.localeCompare(duck1.name));
            break;
        case 'priceLowFirst':
            ducks.sort((duck1, duck2) => duck1.price - duck2.price);
            break;
        case 'priceHighFirst':
            ducks.sort((duck1, duck2) => duck2.price - duck1.price);
            break;
        case 'ratingLowFirst':
            ducks.sort((duck1, duck2) => duck1.rating - duck2.rating);
            break;
        case 'ratingHighFirst':
            ducks.sort((duck1, duck2) => duck2.rating - duck1.rating);
            break;
        default:
            break;
    }
    printDucks();
}

// --------------------------------------------------------- FILTER ----------------------------------------------------------

const categorySelect = document.getElementById('categorySelect');
categorySelect.addEventListener('change', handleCategoryChange);

function handleCategoryChange() {
  const selectedCategory = categorySelect.value;
  const filteredDucks = selectedCategory === 'all' ? ducks : ducks.filter(duck => duck.category === selectedCategory);
  printDucks(filteredDucks);
}

function printDucks(ducksToPrint = ducks) {             // "ducksToPrint = ducks" finns endast till för att kunna filltrera kategorierna
    duckHtmlContainer.innerHTML = '';
    ducksToPrint.forEach((duck, index) => {             // "ducksToPrint" finns endast för kategorifiltrering

        duckHtmlContainer.innerHTML += 
        `
        <article class="img-price-amount-info">
            
            <div><img src="${duck.img.src}" alt="${duck.img.alt}" width="${duck.img.width}"
                height="${duck.img.height}" loading="lazy">
            </div>
            <h3>${duck.name}</h3> 
                <div class="price"><span>${duck.price}</span> kr</div>
                <div class="rating">${getRatingStars(duck.rating)}</div>
            <div>
                <button class="add-to-cart" data-id="${index}"> Lägg i varukorgen </button>
            </div>
        </article>
        `;
    });
    
    addBtnEventListeners();
}

printDucks(ducks);

//---------------------------------  CART ------------------------------------------------
function printCartDucks() {
    cartHtmlContainer.innerHTML = '';
    let sum  = 0;
    let sumShipping = 0;
    let monday = 0;
    ducks.forEach((duck, index) => {
        if (duck.amount > 0) {
            sum += (duck.amount * duck.price);
            sumShipping += (duck.amount * duck.price) +25;
            monday += (duck.amount * duck.price) * 0.9;
            cartHtmlContainer.innerHTML += `
            <article class="cart">
                <div><button id="delete-${index}" class="material-symbols-outlined delete-cart">delete</button></div> 
                <div><img src="${duck.img.src}" alt="${duck.img.alt}" width="40"
                height="40" loading="lazy"></div>
                <div><span>${duck.name} </span> <span>: ${duck.amount} x ${duck.price} kr</span></div>
                <div class="cart-text"><span>${duck.amount * duck.price} kr</span></div>
                <div class="plus-minus">
                <button class="minus" data-id="${index}"> - </button>
                <input class="amount-between" type="number" value="${duck.amount}" id="amount">
                <button class="plus" data-id="${index}"> + </button>
            </div>
            </article>
            `;
         }
// --------------------- DISCOUNT ------------------------------
// Every monday before 10 o'clock there's a 10% discount:

        const today = new Date();
         if (today.getDay() === 1 && today.getHours() < 10) {
            cartHtmlContainer.innerHTML += 
            `<p>Måndagsrabatt: 10% på hela beställningen: Du får: ${Math.round(sum * 0.1)} kr rabatt</p>`;
           
            cartHtmlContainer.innerHTML += `
             <div class="shipping-cost">Frakt 25 kr</div>
    
            <p class="total">Totalt: ${Math.round(monday + 25)} kr
            <a href="#checkout"><button class="checkout-btn">Gå till kassan</button></a></p>
            `;
          }
    });
// ---------------------------------------- TIMER START --------------------------------------------------------------------

    setTimeout(clearCartHtmlContainer, 900000); // Cart is deleted after 15 minutes

    function clearCartHtmlContainer() {
        totalItemsInCart = 0;
        ducks.forEach((duck) => {
        duck.amount = 0;
    });
    updateCartIcon();
    printDucks();
    printCartDucks();

    cartHtmlContainer.innerHTML = 'Det har tagit för lång tid, varukorgen har tömts.';
    } 
// ---------------------------------------- TIMER END --------------------------------------------------------------------

    const minusBtns = document.querySelectorAll('button.minus');          /////// 2. minusBtns - Variabel - QuerySelector - minus   
    const plusBtns = document.querySelectorAll('button.plus');           /////// 2. plusBtns - Variabel - QuerySelector - plus
    
   
    minusBtns.forEach(btn => {
        btn.addEventListener('click', decreaseAmount);                   /////// 3. minusBtns - EventListener - DecreaseAmount
        });
    plusBtns.forEach(btn => {
            btn.addEventListener('click', increaseAmount);                  /////// 3. plusBtns - EventListener - IncreaseAmount
        });
        console.log(plusBtns);

if (totalItemsInCart > 0) {        
    cartHtmlContainer.innerHTML += `
    <div class="shipping-cost">Frakt 25 kr</div>
    
    <p class="total">Totalt: ${sumShipping} kr
    <a href="#checkout"><button class="checkout-btn">Gå till kassan</button></a></p>
    `;
} else {
    cartHtmlContainer.innerHTML += `<p>Varukorgen är tom. 
    Hitta något att köpa.</p>`;
    cartMenu.innerHTML = `<p class="total-menu">Totalt: 0 kr</p>`;
    return;
}  
    cartMenu.innerHTML = ''; 
    cartMenu.innerHTML += `<p class="total-menu">Totalt: ${sumShipping} kr
    `;

    addBtnEventListeners();
}

printDucks();

function addBtnEventListeners() {
    const removeBtns = document.querySelectorAll('.delete-cart'); 
    removeBtns.forEach(btn => {
        console.log(btn);
        btn.addEventListener('click', removeDuck);
    });

    const minusBtns = document.querySelectorAll('button.minus');          /////// 2 minusBtns - Variabel - QuerySelector - minus   
    const plusBtns = document.querySelectorAll('button.plus');           /////// 2 plusBtns - Variabel - QuerySelector - plus
    const addToCartBtns = document.querySelectorAll('button.add-to-cart');       /////// 2 addToCart - variabel - QuerySelector - add

    minusBtns.forEach(btn => {
        btn.addEventListener('click', decreaseAmount);
    });
    plusBtns.forEach(btn => {
        btn.addEventListener('click', increaseAmount);                  /////// 3 plusBtns - EventListener - IncreaseAmount
    });
    addToCartBtns.forEach(btn => {                                     /////// 3 addToCartBtns - EventListener
        btn.addEventListener('click', addToCart);
    });
}

// -------------------------- Card payment checkout ----------------------- //
const cardInvoiceRadios = Array.from(document.querySelectorAll('input[name="payment-option"]'));
const inputs = [
    document.querySelector('#creditCardNumber'),
    document.querySelector('#creditCardYear'),
    document.querySelector('#creditCardMonth'),
    document.querySelector('#creditCardCvc'),
    document.querySelector('#personalId')
];

const invoiceOption = document.querySelector('#invoice');
const cardOption = document.querySelector('#card');
const orderBtn = document.querySelector('#orderBtn');  

// Default options
let selectedPaymentOption = 'invoice';
// REG EX:
const personalIdRegEx = new RegExp(/^(\d{10}|\d{12}|\d{6}-\d{4}|\d{8}-\d{4}|\d{8} \d{4}|\d{6} \d{4})/);
const creditCardNumberRegEx = new RegExp(/^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/); //MasterCard

// Add EventListeners:
inputs.forEach(input => {
    input.addEventListener('focusout', activateOrderButton);
    input.addEventListener('change', activateOrderButton);
});
cardInvoiceRadios.forEach(radioBtn => {
    radioBtn.addEventListener('change', switchPaymentMethod);
});

 // switches between invoice and card payment method. Toggles their visibility.
function switchPaymentMethod(e) {
    invoiceOption.classList.toggle('hidden');
    cardOption.classList.toggle('hidden');
    selectedPaymentOption = e.target.value;
}
function isPersonalIdNumberValid() {                    
    return personalIdRegEx.exec(personalId.value);
}
function activateOrderButton() {                                                        
    orderBtn.setAttribute('disabled', '');
    
    if (selectedPaymentOption === 'invoice' && isPersonalIdNumberValid()) {
        orderBtn.removeAttribute('disabled');
    }   else if (selectedPaymentOption === 'invoice' && !isPersonalIdNumberValid()) {
        orderBtn.setAttribute('disabled', '');
        return;
    }   else if (selectedPaymentOption === 'card') {
        // check card number
        if (creditCardNumberRegEx.exec(creditCardNumber.value) === null) {
            console.warn ('Credit card number not valid.');
          return;
        }
        let year = Number(creditCardYear.value);
        
        const today = new Date();
        const shortYear = Number(String(today.getFullYear()).substring(2));
        console.log(shortYear);
        if (year > shortYear + 2  || year < shortYear) {
            console.warn('Credit card month not valid.');
            return;
            }
            console.log(creditCardCvc.value);
            if (creditCardCvc.value.lenght !== 3) {
                console.warn('CVC not valid.');

            }
        }
    
    orderBtn.removeAttribute('disabled');
}









