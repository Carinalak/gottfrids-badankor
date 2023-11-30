/*
1. en fungerande menyknapp kanske
2. Sida 1: "items-page". En plus och minusknapp, antal, pris, bild.
3. Sida 2: "shopping-cart". Behöver Trashbin.
4. Sida 3: "customer-data". Formulär till kundens uppgifter.
*/
// duckContainer
// -------------------------------------  NY KOD PROJEKTSETUP: ----------------------------------------------------
// --------------------------------------- PAGE 1 Sales-page:---------------------------------------------------
const duckHtmlContainer = document.querySelector('#duckContainer');
const cartHtmlContainer = document.querySelector('#cart');

const ducks = [
    {
        name: 'Anka med badring',
        price: 29,
        img:
            {
                src: 'img/badring.jpg',
                alt: 'Anka med badring', 
                width: 280,
                height: 280,
            },

        rating: 3,
        amount: 0,
        category: 'boy-ducks',
    }, 
    {
        name: 'Affärskvinna',
        price: 39,
        img:
            {
                src: '/img/affarskvinna.jpg',
                alt: 'Anka affärskvinna',
                width: 280,
                height: 280,
            },
        rating: 3,
        amount: 0,
        category: 'girl-ducks',
    },
    {
        name: 'Farfar',
        price: 39,
        img: 
            {
                src: './img/farfar.jpg',
                alt: 'Anka farfar',
                width: 280,
                height: 280,
            },       
        rating: 2,
        amount: 0,
        category: 'boy-ducks',
    }, 
    {
        name: 'Farmor',
        price: 39,
        img: 
            {
                src: '../img/farmor.jpg',
                alt: 'Anka farmor',
                width: 280,
                height: 280,
            },       
        rating: 2,
        amount: 0,
        category: 'girl-ducks',
    }, 
    {
        name: 'Dark Duck',
        price: 39,
        img: 
            {
                src: '../img/darkduck.jpg',
                alt: 'Dark Duck',
                width: 280,
                height: 280,
            },       
        rating: 1,
        amount: 0,
        category: 'boy-ducks',
    }, 
    {
        name: 'Snorklare',
        price: 29,
        img: 
            {
                src: '../img/snorklare.jpg',
                alt: 'Snorklare',
                width: 280,
                height: 280,
            },       
        rating: 3,
        amount: 0,
        category: 'boy-ducks',
    }, 
];
    

let totalItemsInCart = 0;

function addToCart(e) {
    const index = e.currentTarget.dataset.id;
    ducks[index].amount += 1;
    totalItemsInCart += 1;
    updateCartIcon();
    printDucks();
    printCartDucks();
}

function increaseAmount(e) {
    const index = e.currentTarget.dataset.id;
    ducks[index].amount += 1;
    totalItemsInCart += 1;
    updateCartIcon();
    printCartDucks();

}
/*
function decreaseAmount(e) {
    const index = e.currentTarget.dataset.id;
    if (ducks[index].amount > 0) {
        ducks[index].amount -= 1;
        totalItemsInCart -= 1;
        updateCartIcon();
        printCartDucks();
        
    }
}*/
function decreaseAmount(e) {
    const index = e.currentTarget.dataset.id.splice;
    if (index > -1) {
        totalItemsInCart -= ducks[index].amount;
        totalItemsInCart -= 1;
        updateCartIcon();
        printCartDucks();
        
    }
}

// Tar bort från varukorgen:
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

// Skriver ut produkterna:
function printDucks() {
    duckHtmlContainer.innerHTML = '';
    ducks.forEach((duck, index) => {

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
    const minusBtns = document.querySelectorAll('button.minus');          /////// 2 minusBtns - Variabel - QuerySelector - minus   
    const plusBtns = document.querySelectorAll('button.plus');           /////// 2 plusBtns - Variabel - QuerySelector - plus
    const addToCartBtns = document.querySelectorAll('button.add-to-cart');       /////// 2 addToCart - variabel - QuerySelector - add


    minusBtns.forEach(btn => {
    btn.addEventListener('click', decreaseAmount);});
    plusBtns.forEach(btn => {
        btn.addEventListener('click', increaseAmount);                  /////// 3 plusBtns - EventListener - IncreaseAmount
    });
    addToCartBtns.forEach(btn => {                                     /////// 3 addToCartBtns - EventListener
        btn.addEventListener('click', addToCart);
        });
}


// Ducks som man har beställt fler än 0 av: //---------------------------------  Cart ------------------------------------------------
function printCartDucks() {
    cartHtmlContainer.innerHTML = '';
    let sum  = 0;
    ducks.forEach((duck, index) => {
        if (duck.amount > 0) {
            sum += duck.amount * duck.price;
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
        
    });
    
    cartHtmlContainer.innerHTML += `<p class="total">Totalt: ${sum} kr
    <a href="#checkout"><button class="checkout-btn">Gå till kassan</button></a></p>
    `;

    cartMenu.innerHTML = ''; 
    cartMenu.innerHTML += `<p class="total-menu">Totalt: ${sum} kr
    `;



    const removeBtns = document.querySelectorAll('.delete-cart'); 
    
    console.log(removeBtns);
    removeBtns.forEach(btn => {
        console.log(btn);
        btn.addEventListener('click', removeDuck);
    });
}
printDucks();

// -------------------------- Card payment checkout ----------------------- //

const cardInvoiceRadios = Array.from(document.querySelectorAll('input[name="payment-option"]'));
cardInvoiceRadios.forEach(radioBtn => {
    radioBtn.addEventListener('change', switchPaymentMethod);
});

const invoiceOption = document.querySelector('#invoice');
const cardOption = document.querySelector('#card');
function switchPaymentMethod(e) {
    invoiceOption.classList.toggle('hidden');
    cardOption.classList.toggle('hidden');

    switch(e.target.value) {
        case 'invoice':
            
            break;
            case 'card':
                
                break;
                default:
                    console.error('Unknown option for payment type.');
                    break;
    }
}



