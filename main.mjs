//products import
import products from "./products.mjs";

const productsListDiv = document.querySelector("#product-list");

//products
products.forEach((product) => {
  productsListDiv.innerHTML += `
  <article class="product">
  <img src="${product.img.url}">
  <h3>${product.name}</h3>
  <p>${product.price} kr</p>
  <p>Kategori: ${product.category}</p>
  <p>${getRatingHtml(product.rating)}&#11088;</p>
  <div>
  <button class="decrease" id="decrease-${product.id}">-</button>
  <button class="increase" id="increase-${product.id}">+</button>
  <span>${product.amount}</span>
  </div>
  
  </article>
  
  `;
});



//rating
function getRatingHtml(rating) {
  let html = "";

  for (let i = 0; i < Math.floor(rating); i++) {
    html += `<span>&#11088;</span>`;
  }

  return html;
}

function updateProductList() {
  const sortCriteria = document.getElementById("sortedCriteria").value;
  const sortedProducts = sortedProducts(products, sortCriteria, !descending);

  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  sortedProducts.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = productsListDiv.innerHTML += `
            <section class="container">
              <article class="product">
              <img src="${product.img.url}" alt="${product.img.alt}">
                <h3>${product.name}</h3>
                <p>${product.price} kr</p>
                <p>Kategori: ${product.category}</p>
                <p>${getRatingHtml(product.rating)}&#11088;</p>
                  <div>
                  <button class="decrease" id="decrease-${
                    product.id
                  }">-</button>
                  <button class="increase" id="increase-${
                    product.id
                  }">+</button>
                  <span>${product.amount}</span>
                </div>
              </article>
              </section>
            `;
  });
}



// function to increase and decrease amount.
function printProductsList() {
  productsListDiv.innerHTML = "";

  products.forEach((product) => {
    productsListDiv.innerHTML += `
        <section class="container">
          <article class="product">
          <img src="${product.img.url}" alt="${product.img.alt}">
            <h3>${product.name}</h3>
            <p>${product.price} kr</p>
            <p>Kategori: ${product.category}</p>
            <p>${getRatingHtml(product.rating)}&#11088;</p>
            <div>
              <button class="decrease" id="decrease-${product.id}">-</button>
              <button class="increase" id="increase-${product.id}">+</button>
              <span>${product.amount}</span>
            </div>
          </article>
          </section>
        `;
  });

  const increaseButtons = document.querySelectorAll("button.increase");
  increaseButtons.forEach((button) => {
    button.addEventListener("click", increaseProductCount);
  });

  const decreaseButtons = document.querySelectorAll("button.decrease");
  decreaseButtons.forEach((button) => {
    button.addEventListener("click", decreaseProductCount);
  });
}

printProductsList();

//increase amount
function increaseProductCount(e) {
  const productId = Number(e.target.id.replace("increase-", ""));
  const foundProductIndex = products.findIndex(
    (product) => product.id === productId
  );

  const keepfocusBtn = e.target.id;

  // increase amount with +1
  products[foundProductIndex].amount += 1;

  printProductsList();
  document.querySelector(`#${keepfocusBtn}`).focus();
  updateAndPrintCart();
  
}

//decrease amount
function decreaseProductCount(e) {
  const productId = Number(e.target.id.replace("decrease-", ""));
  const foundProductIndex = products.findIndex(
    (product) => product.id === productId
  );
  const keepfocusBtn = e.target.id;

  // decrease amount with -1
  products[foundProductIndex].amount -= 1;
  if (products[foundProductIndex].amount < 0) {
    products[foundProductIndex].amount = 0;
  }

  printProductsList();
  document.querySelector(`#${keepfocusBtn}`).focus();
  updateAndPrintCart();
}

printProductsList();

const cart = document.querySelector("#cart");

function updateAndPrintCart() {
  const purchasedProducts = products.filter((product) => product.amount > 0);
  const cartCountElement = document.getElementById("cart-count");
  const totalItemsInCart = products.reduce(
    (sum, product) => sum + product.amount,
    0
  );
  cartCountElement.textContent = totalItemsInCart;

  //On monday 10% discount on the total order.  
  const today = new Date();
  
  let sum = 0;
  let message = '';

  // if cart is empty
  if (purchasedProducts.length === 0) {
    cart.innerHTML =
      '<span class="basket">Varukorg</span><span class="support">Kundsupport 08-634 30 30</span><p class="cartempty">Varukorgen är tom!</p>';
    return;
  }

  if (today.getDay() === 1) { //Mondag starts with 1
    sum *= 0.9;
    message += ''
  }

/*On fridays after 15 pm and on the night between sunday and monday 
it will be 15% more expensive whitout information to the customer just higher price on the donuts. */


  //cart products
  cart.innerHTML =
    '<span class="basket">Varukorg</span><span class="support">Kundsupport 08-634 30 30</span>';
  purchasedProducts.forEach((product) => {
    sum += product.amount * product.price;
    cart.innerHTML += `
        <article>
          <img src="${product.img.url}" alt="${product.img.alt}">
          <div>
          <span class='spancart'>${product.name}</span> | <span class='spancart'>${product.amount} st</span> | 
          <span class='spancart'>${product.amount * product.price} kr</span>
          <button class="item-decrease" data-id="${product.id}">-</button>
          <button class="item-increase" data-id="${product.id}">+</button>
          </div>
        </article>
        `;
        
  });

  cart.innerHTML += `<p>Totalt: ${sum} kr</p>`;
  cart.innerHTML += `<p>${message}Måndagsrabatt: 10% på hela beloppet!</div>`;


  // eventlistener for increase and decrease
  document.querySelectorAll(".item-decrease").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = Number(e.target.getAttribute("data-id"));
      updateProductAmount(productId, -1);
    });
  });

  document.querySelectorAll(".item-increase").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = Number(e.target.getAttribute("data-id"));
      updateProductAmount(productId, 1);
    });
  });

  // function to update value and amount
  function updateProductAmount(productId, change) {
    const productIndex = products.findIndex(
      (product) => product.id === productId
    );
    if (productIndex !== -1) {
      products[productIndex].amount += change;
      if (products[productIndex].amount < 0) {
        products[productIndex].amount = 0; // prevent amount to go below 0
      }
    }
    updateAndPrintCart();
  }

}

//form
const paymentMethodRadios = document.querySelectorAll(
  'input[name="payment-method"]'
);
const cardFields = document.getElementById("card-fields");
const invoiceFields = document.getElementById("invoice-fields");
const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");
const form = document.getElementById("order-form");
const personalNumberInput = document.getElementById("personal-number");
const privacyPolicyCheckbox = document.getElementById("privacy-policy");
const orderConfirmation = document.getElementById("orderconfirmation");
const mailAdressInput = document.getElementById("email");

// function for pay alternative
paymentMethodRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (document.getElementById("card").checked) {
      cardFields.style.display = "block";
      invoiceFields.style.display = "none";
    } else if (document.getElementById("invoice").checked) {
      invoiceFields.style.display = "block";
      cardFields.style.display = "none";
    }
  });
});

// validation personalnumber
personalNumberInput.addEventListener("input", () => {
  const regex = /^\d{6}-\d{4}$/;
  if (!regex.test(personalNumberInput.value)) {
    personalNumberInput.setCustomValidity(
      "Ange ett giltigt personnummer (ÅÅMMDD-XXXX)."
    );
  } else {
    personalNumberInput.setCustomValidity("");
  }
});

// validation email
function validateEmail(email) {
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailPattern.test(email);
}

// reset form
resetBtn.addEventListener("click", () => {
  form.reset();
  cardFields.style.display = "none";
  invoiceFields.style.display = "none";
  submitBtn.disabled = true;
  orderConfirmation.style.display = "none";
});

// validation
form.addEventListener("input", () => {
  const isEmailValid = validateEmail(mailAdressInput.value);
  if (!isEmailValid) {
    mailAdressInput.setCustomValidity("Ange en giltig epost-adress");
  } else {
    mailAdressInput.setCustomValidity("");
  }

  const isFormValid = form.checkValidity() && privacyPolicyCheckbox.checked;
  submitBtn.disabled = !isFormValid;
});

privacyPolicyCheckbox.addEventListener("change", () => {
  const isFormValid = form.checkValidity() && privacyPolicyCheckbox.checked;
  submitBtn.disabled = !isFormValid;
});

// Orderconfirmation
form.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent page to reload

  // collect data
  const purchasedProducts = products.filter((product) => product.amount > 0);
  const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

  // check if there is any products in cart
  if (purchasedProducts.length === 0) {
    alert('Din varukorg är tom. Lägg till produkter innan du beställer.');
    return;
  }

 // Get current date and calculate delivery date
const currentDate = new Date(); // Ensure this is a valid Date object
const deliveryDate = new Date(currentDate.getTime()); // Clone the current date
deliveryDate.setDate(currentDate.getDate() + 3); // Delivery in 3 days

// Format the dates
const formatDate = (date) => {
  if (!(date instanceof Date) || isNaN(date)) {
    console.error('Invalid date:', date);
    return 'Okänt datum'; // Fallback if date is invalid
  }
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  let formattedDate = date.toLocaleDateString('sv-SE', options);

  // Month first letter to uppercase
  const parts = formattedDate.split(' ');
  if (parts.length >= 3) {
    parts[1] = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
    formattedDate = parts.join(' '); 
  }

  return formattedDate;
};

const formattedOrderDate = formatDate(currentDate);
const formattedDeliveryDate = formatDate(deliveryDate);

console.log('Beställningsdatum:', formattedOrderDate);
console.log('Leveransdatum:', formattedDeliveryDate);

  // show orderconfirmation
  const confirmationMessage = document.getElementById('confirmation-message');
  confirmationMessage.innerHTML = `
    <h2 class='msg'>Tack för din beställning!</h2>
    <p class='msg'>Din beställning har registrerats den:</p>
    <p class='msg'><strong>${formattedOrderDate}</strong></p>
    <p class='msg'>Förväntad leverans: <strong>${formattedDeliveryDate}</strong></p>
    <p class='msg'>Vald betalningsmetod: <strong>${paymentMethod === 'card' ? 'Kortbetalning' : 'Faktura'}</strong></p>
    <h3 class='msg'>Sammanfattning:</h3>
    <span class='msg'>
      ${purchasedProducts.map(product => `
        ${product.name} - ${product.amount} st - ${product.amount * product.price} kr
      `).join('')}
    </span>
    <p class='msg'>Total: <strong>${purchasedProducts.reduce((sum, product) => sum + product.amount * product.price, 0)} kr</strong></p>
    
  `;

  // reset form and cart
  form.reset();
  products.forEach(product => product.amount = 0);
  printProductsList();
  updateAndPrintCart();

  // how to show the orderconfirmation
  confirmationMessage.style.display = 'block';
});

//Timer
const inactiveityTimeLimit = 15 * 60 * 1000;
let inactivityTimer;

function startInactivityTimer() {
  inactivityTimer = setTimeout(() => {
    clearFormOnTimeout(); 
  }, inactiveityTimeLimit);
}

//Reset timer
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  startInactivityTimer();
}

function clearFormOnTimeout() {
  form.reset();
  cardFields.style.display = 'none'
  invoiceFields.style.display = 'none'
  submitBtn.disabled = true;
  orderConfirmation.style.display = 'none';

//Message
alert('Du var för långsam! Formuläret har raderats.');
}

//Event listeners
form.addEventListener('input', resetInactivityTimer);
form.addEventListener('change', resetInactivityTimer);
form.addEventListener('keydown', resetInactivityTimer);

//Start timer
startInactivityTimer();

