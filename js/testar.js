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
                src: '/img/badring.jpg',
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
                src: '../img/affarskvinna.jpg',
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
                src: '../img/farfar.jpg',
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

function decreaseAmount(e) {
    const index = e.currentTarget.dataset.id;
    if(ducks[index].amount <= 0) {
        ducks[index].amount = 0;
    } else {
        ducks[index].amount -= 1;
    }
    printDucks();
    printCartDucks();
}
function increaseAmount(e) {                                           //////// 1 increase Amount-  Function
    const index = e.currentTarget.dataset.id;
    ducks[index].amount += 1;
   // printDucks();
   //printCartDucks(); 
}
function addToCart(e) {                                         /////// 1    addToCart - Function
    const index = e.currentTarget.dataset.id;
    ducks[index].amount += 1;
   // printDucks();
    //printCartDucks();
}
// Tar bort från varukorgen:
function removeDuck(e) {
    const index = e.currentTarget.id.replace('delete-', '');
    
    if (index > -1) {
        ducks[index].amount = 0; 
    }
    printCartDucks();
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
            <div class="rating">Betyg: <span>${duck.rating}</span> </div> 
            <div class="plus-minus">
                <button class="minus" data-id="${index}"> - </button>
                <input class="amount-between" type="number"> ${duck.amount}</input>
                
                <button class="plus" data-id="${index}"> + </button>
                <button class="add"> Lägg i varukorgen </button>
            </div>
        </article>
        `;
    });
//<div class="amount-between"> <span> ${duck.amount} </span></div>
    const minusBtns = document.querySelectorAll('button.minus');
    const plusBtns = document.querySelectorAll('button.plus');           /////// 2 plusBtns - Variabel - QuerySelector - plus
    const addToCartBtns = document.querySelectorAll('button.add');       /////// 2 addToCart - variabel - QuerySelector - add

//Nedan nytt:
    //const addToCartBtns = document.querySelectorAll('button.add');

    //function 
   
    
// Ovan NYTT
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

// Ducks som man har beställt fler än 0 av: //---------------------------------  Varukorg ------------------------------------------------
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












    // Nedan nytt Thrash:
  
   /*
    const duckRemove = Array.from(document.querySelectorAll('li button')); // detta gör om node-list till en array-list
    duckRemove.forEach((item) => {       //för varje sak i listan
        item.addEventListener('click', removeDuck);    // produkten tas bort när man klickar på den.
    });

    function removeDuck(e) {
        const index = ducks.indexOf(e.target.dataset.name);
        if (index > -1) {
            ducks.splice(index, 1);
            printCartDucks();
        }
    
    }
*/
    // Ovan nytt Thrash








// --------------------------------------- PAGE 2 ---------------------------------------------------




/*
document.querySelector('#list').innerHTML = '<ul><li>Test</li></ul>';

//document.querySelector('#imageContainer').innerHTML = '<img src="img/affarskvinna.jpg" width="250" height="250">';




document.querySelector('#imageContainer2').innerHTML = '<img src="img/badring.jpg" width="250" height="250" alt="Anka med badring">';

const ducks = ['Anka med badring', 'Affärskvinna', 'Snorklare', 'Dark Duck', 'Examen', 'Drottning'];
console.log(ducks.length);

const duckSorts = document.querySelector('#duckList');
*/