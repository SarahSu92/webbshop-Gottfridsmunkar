// Pris per munk
const pricePerMunk = 15;

// Funktion för att uppdatera priset för en specifik munk
function updatePrice(munk) {
    const quantityInput = document.querySelector(`#munk${munk}`);
    const priceSpan = document.querySelector(`#price${munk}`);
    const quantity = parseInt(quantityInput.value);
    const price = quantity * pricePerMunk;
    priceSpan.textContent = `Pris: ${price} kr`;
    updateTotalPrice();
}

// Funktion för att uppdatera det totala priset
function updateTotalPrice() {
    let total = 0;
    document.querySelectorAll('.quantity').forEach(input => {
        const quantity = parseInt(input.value);
        total += quantity * pricePerMunk;
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

// event listeners för knapptryckningar
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

// tangentbordslyssnare tillgänglighet
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
