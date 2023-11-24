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
                src: '../img/badring.jpg',
                alt: 'Anka med badring', 
                width: 150,
                height: 150,
            },

        rating: 3,
        amount: 0,
        category: 'boy-ducks',
    }, 
    {
        name: 'Affärskvinna',
        price: 39,
        img:  [
            {
                src: '../img/affarskvinna.jpg',
                alt: 'Anka affärskvinna',
            },
            {
                src: '../img/affarskvinna.jpg',
                alt: 'Anka affärskvinna',
            },
        ],
        rating: 3,
        amount: 0,
        category: 'girl-ducks',
    },
    {
        name: 'Farfar',
        price: 39,
        img:  [
            {
                src: '../img/farfar.jpg',
                alt: 'Anka farfar',
            },
            {
                src: '../img/farfar.jpg',
                alt: 'Anka affärskvinna',
            },
        ],
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
}

function increaseAmount(e) {
    const index = e.currentTarget.dataset.id;
    ducks[index].amount += 1;
    printDucks();

}

// Skriver ut produkterna:
function printDucks() {
    duckHtmlContainer.innerHTML = '';
    ducks.forEach((duck, index) => {

        duckHtmlContainer.innerHTML += 
        `
        <article>
            <h3>${duck.name}</h3> 
            <div><img src="${duck.img.src}" alt="${duck.img.alt}" width="${duck.img.width}"
            height="${duck.img.height}" loading="lazy"></div>
            <div>Price: <span>${duck.price}</span> kr</div>
            <div>Rating: <span>${duck.rating}</span> </div> <!-- TO DO bildspel -->
            <div>Amount: <span>${duck.amount}</span> </div>
            <button class="minus" data-id="${index}">-</button>
            <button class="plus" data-id="${index}">+</button>
        
        </article>
        `;
    });

    const minusBtns = document.querySelectorAll('button.minus');
    const plusBtns = document.querySelectorAll('button.plus');

    minusBtns.forEach(btn => {
        btn.addEventListener('click', decreaseAmount);
    });

        plusBtns.forEach(btn => {
            btn.addEventListener('click', increaseAmount);

    });
    printCartDucks();

}

// Ducks som man har beställt fler än 0 av:
function printCartDucks() {
    cartHtmlContainer.innerHTML = '';

    let sum  = 0;
//----------------------  Varukorg ------------------------------------------------
    ducks.forEach(duck => {
        if (duck.amount > 0) {
            sum += duck.amount * duck.price;
            cartHtmlContainer.innerHTML += `
            <article>
            <div><img src="${duck.img.src}" alt="${duck.img.alt}" width="${duck.img.width}"
            height="${duck.img.height}" loading="lazy"></div>
                <span>${duck.name}</span> | <span>${duck.amount}</span> | <span>${duck.amount * duck.price} kr</span>
            </article>
            `;
        }

    });
    cartHtmlContainer.innerHTML += `<p>Totalt: ${sum} kr</p>`;

}

printDucks();
























// --------------------------------------- PAGE 2 ---------------------------------------------------
/*
const duckies = [
    {
        name: 'Anka med badring',
        image: {
            src: '../img/badring.jpg',
            alt: 'Anka med badring',
            width: 300,
            height: 300,
        },
        price: 29,
        amount: 0,
    },
    {
        name: 'Affärskvinna',
        price: 39,
        amount: 0,
    },
    {
        name: 'Dark duck',
        price: 39,
        amount: 0,
    },
    {
        name: 'Drottning',
        price: 39,
        amount: 0,
    },
    {
        name: 'Examen',
        price: 29,
        amount: 0,
    },
];
const duckContainer = document.querySelector('#duckies');

for (let i = 0; i < duckies.length; i++) {
    console.log(i);
    duckContainer.innerHTML += 
    `<div id="duckies-${i}">
    <button class="decrease" id="decrease-${i}">-</button> 
    <strong>${duckies[i].name}</strong>
    Antal: ${duckies[i].amount} 
    Pris: ${duckies[i].price} kr
    <button class="increase" id="increase-${i}">+</button> 
    </div>`;   
}




const increaseButtons = Array.from(document.querySelectorAll('.increase'));

for (let i = 0; i < increaseButtons.length; i++){
    increaseButtons[i].addEventListener('click', increaseAmount);  // för varje knapp lägger vi på en eventListener. För ett klick körs funktionen increaseAmount, som skapas nedan.
}
function increaseAmount(e){                                        // Skapar funktionen increaseAmount 
    const index = e.target.id.replace('increase-', '');
    //console.log(duckies[index]);
    duckies[index].amount += 1;                                     // Lägger på 1 på antal
    duckContainer.innerHTML = '';
    // skriver ut den uppdaterade informationen igen:
    for (let i = 0; i < duckies.length; i++) {
        duckContainer.innerHTML += 
        `<div id="duckies-${i}">
        <button class="decrease" id="decrease-${i}">-</button> 
        <strong>${duckies[i].name}</strong>
        Antal: ${duckies[i].amount} 
        Pris: ${duckies[i].price} kr
        <button class="increase" id="increase-${i}">+</button> 
        </div>`;
    }
    const increaseButtons = Array.from(document.querySelectorAll('.increase'));
for (let i = 0; i < increaseButtons.length; i++){
    increaseButtons[i].addEventListener('click', increaseAmount);  // för varje knapp lägger vi på en eventListener. För ett klick körs funktionen increaseAmount, som skapas nedan.
}
}
*/









/*
document.querySelector('#list').innerHTML = '<ul><li>Test</li></ul>';

//document.querySelector('#imageContainer').innerHTML = '<img src="img/affarskvinna.jpg" width="250" height="250">';




document.querySelector('#imageContainer2').innerHTML = '<img src="img/badring.jpg" width="250" height="250" alt="Anka med badring">';

const ducks = ['Anka med badring', 'Affärskvinna', 'Snorklare', 'Dark Duck', 'Examen', 'Drottning'];
console.log(ducks.length);

const duckSorts = document.querySelector('#duckList');
*/
