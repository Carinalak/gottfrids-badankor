/*
1. en fungerande menyknapp kanske
2. Sida 1: "items-page". En plus och minusknapp, antal, pris, bild.
3. Sida 2: "shopping-cart". Behöver Trashbin.
4. Sida 3: "customer-data". Formulär till kundens uppgifter.

*/


// PAGE 1 Sales-page:
/*
const increaseBtn = document.querySelector('#increase');        // väljer id:t increase knappen
const decreaseBtn = document.querySelector('#decrease');        // väljer id:t decrease knappen
const startAmount = document.querySelector('#amount');
const price = document.querySelector('#price');
let amount = Number(startAmount.value);                         // Genom att skriva "Number" framför tvingas strängen att bli en siffra.


increaseBtn.addEventListener('click', increaseAmount);          // Event - lyssnare med 'click' på increaseBtn
decreaseBtn.addEventListener('click', decreaseAmount); 
startAmount.addEventListener('change', updateAmount);
function updateAmount(e) {
    amount = Number(e.target.value);
    updatePrice();
}
function increaseAmount() {                                     // En funktion till event - lyssnaren
    amount += 1;
    

    updatePrice();                                              // functionen anropas   
}

function decreaseAmount() {                                     // En funktion till event - lyssnaren
    if (amount - 1 < 0 ) {                                      // Om amount är mindre än noll så:
        return;                                                 // gör en return = efter return körs inte koden vidare.
    }
    amount -= 1;
    

    updatePrice();                                              // functionen anropas   
}

function  updatePrice() {       
    startAmount.value = amount;                                // gör en funktion som anropas ovan.
    price.innerHTML = amount * 15;
}

*/
// --------------------------------  NY KOD PROJEKTSETUP: -------------------------------------------
// --------------------------------------- SIDA 1 ---------------------------------------------------






// Sida 2 
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
