// Pris per munk
const munkPrices = {
    1: 15, //Priset för Äppelmunk
    2: 19, //Priset för Körsbärsmunk
    3: 15, //Priset för chokladmunk
    4: 19, //Priset för kanelmunk
    5: 19, //Priset för kaffemunk
    6: 12, //Priset för cookie munk
    7: 15, //Priset för lakritsmunk
    8: 19, //Priset för jordgubbsmunk
    9: 19, //Priset för vaniljmunk
    10: 15, //Priset för polkagrismunk

};


// Funktion för att uppdatera priset för en specifik munk
function updatePrice(munk) {
    const quantityInput = document.querySelector(`#munk${munk}`);
    const priceSpan = document.querySelector(`#price${munk}`);
    const quantity = parseInt(quantityInput.value);
    const price = quantity * munkPrices[munk];
    priceSpan.textContent = `Pris: ${price} SEK`;
    updateTotalPrice(); // Uppdatera det totala priset när priset ändras
}

// Funktion för att uppdatera det totala priset
function updateTotalPrice() {
    let total = 0;
    document.querySelectorAll('.quantity').forEach(input => {
        const munk = input.getAttribute('data-munk');
        const quantity = parseInt(input.value);
        total += quantity * munkPrices[munk]; // Beräkna det totala priset baserat på varje munk pris
    });
    document.querySelector('#totalPrice').textContent = `${total} SEK`;
}

// Funktion för att uppdatera antalet munkar
function updateQuantity(munk, increment) {
    const quantityInput = document.querySelector(`#munk${munk}`);
    let quantity = parseInt(quantityInput.value);
    if (increment) {
        quantity++;
    } else if (quantity > 0) {
        quantity--;
    }
    quantityInput.value = quantity;
    updatePrice(munk);  // Uppdatera priset när kvantiteten ändras
}

// Lägg till event listeners för knapptryckningar
document.querySelectorAll('.increase').forEach(button => {
    button.addEventListener('click', function () {
        const munk = this.getAttribute('data-munk');
        updateQuantity(munk, true);
    });
});

document.querySelectorAll('.decrease').forEach(button => {
    button.addEventListener('click', function () {
        const munk = this.getAttribute('data-munk');
        updateQuantity(munk, false);
    });
});

// Lägg till tangentbordslyssnare
document.addEventListener('keydown', function (event) {
    const focusedInput = document.querySelector('input:focus');
    if (focusedInput) {
        const munk = focusedInput.getAttribute('data-munk');
        if (event.key === 'ArrowUp') {
            updateQuantity(munk, true);
        } else if (event.key === 'ArrowDown') {
            updateQuantity(munk, false);
        }
    }
});


