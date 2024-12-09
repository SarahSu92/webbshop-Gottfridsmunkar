//products import
import products from './products.mjs';

const productsListDiv = document.querySelector('#product-list');
const sortOptions = document.getElementById('sort-options');

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

// Function to sort products based on selected criteria
function sortProducts(criteria) {
  let sortedProducts;

  switch (criteria) {
    case 'name':
      sortedProducts = [...products].sort((a, b) =>
        a.name.localeCompare(b.name));
      break;
    case 'price':
      sortedProducts = [...products].sort((a, b) => a.price - b.price);
      break;
    case 'rating':
      sortedProducts = [...products].sort((a, b) => b.rating - a.rating); // descending
      break;
    case 'category':
      sortedProducts = [...products].sort((a, b) =>
        a.category.localeCompare(b.category));
      break;
    default:
      sortedProducts = products;
  }

  printProductsList(sortedProducts); // Call function to render sorted products
}

// Event listener for sort options
sortOptions.addEventListener('change', (e) => {
  sortProducts(e.target.value); // Sort based on the selected criteria
});

// _______________________________________________________________________
// _______________________________________________________________________
// _______________________________________________________________________
// _______________________________________________________________________
// _______________________Function Print Product List_____________________
// _______________________________________________________________________
// _______________________________________________________________________
// _______________________________________________________________________
// _______________________________________________________________________
// _______________________________________________________________________

// Function to print products list (modified to accept sorted products)
function printProductsList(sortedProducts = products) {
  productsListDiv.innerHTML = ''; // Clear previous list

  sortedProducts.forEach((product) => {
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

  addEventListenersToButtons(); // Ensure button event listeners are re-attached after rendering
}

function addEventListenersToButtons() {
  const increaseButtons = document.querySelectorAll('button.increase');
  increaseButtons.forEach((button) => {
    button.addEventListener('click', increaseProductCount);
  });

  const decreaseButtons = document.querySelectorAll('button.decrease');
  decreaseButtons.forEach((button) => {
    button.addEventListener('click', decreaseProductCount);
  });

  
}

//rating
function getRatingHtml(rating) {
  let html = '';

  for (let i = 0; i < Math.floor(rating); i++) {
    html += `<span>&#11088;</span>`;
  }

  return html;
}

//increase amount
function increaseProductCount(e) {
  const productId = Number(e.target.id.replace('increase-', ''));
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
  const productId = Number(e.target.id.replace('decrease-', ''));
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

// _______________________________________________________________________
// _______________________________________________________________________
// _______________________________________________________________________
// _______________________________________________________________________
// ________________________________Cart___________________________________
// _______________________________________________________________________
// _______________________________________________________________________
// _______________________________________________________________________
// _______________________________________________________________________
// _______________________________________________________________________

//Cart
function updateAndPrintCart() {
  const purchasedProducts = products.filter((product) => product.amount > 0);
  const cartCountElement = document.getElementById('cart-count');
  const totalItemsInCart = products.reduce(
    (sum, product) => sum + product.amount,
    0
  );
  cartCountElement.textContent = totalItemsInCart;

  if (purchasedProducts.length === 0) {
    cart.innerHTML =
      '<span class="basket">Varukorg</span><span class="support">Kundsupport 08-634 30 30</span><p class="cartempty">Varukorgen är tom!</p>';
    return;
  }

  //On friday after 15 pm and the night on monday to sunday 15% higher price. No notification to customer.
  const today = new Date();
  const friday = today.getDay() === 5;
  const monday = today.getDay() === 1;
  const currentHour = today.getHours();

  let priceIncrease = 1;
  if ((friday && currentHour >= 15) || (monday && currentHour <= 3)) {
    priceIncrease = 1.15; // 15% higher price
  }

  let sum = 0;
  let message = '';
  let orderedProductAmount = 0;

  cart.innerHTML =
    '<span class="basket">Varukorg</span><span class="support">Kundsupport 08-634 30 30</span>';

  purchasedProducts.forEach((product) => {
    let adjustedPrice = product.price * priceIncrease;
    orderedProductAmount += product.amount;
    // If ordered 10 products of same sort get 10% discount
    if (product.amount >= 10) {
      adjustedPrice *= 0.9; // 10% discount
    }

    const totalProductPrice = product.amount * adjustedPrice;
    sum += totalProductPrice;

    cart.innerHTML += `
      <article>
        <img src="${product.img.url}" alt="${product.img.alt}">
        <div>
          <span class='spancart'>${
            product.name
          }</span> | <span class='spancart'>${product.amount}</span> | 
          <span class='spancart'>${totalProductPrice.toFixed(2)} kr</span>
          <button class="item-decrease" data-id="${product.id}">-</button>
          <button class="item-increase" data-id="${product.id}">+</button>
        </div>
      </article>
    `;
  });

  if (orderedProductAmount > 15) {
    cart.innerHTML += `<p>Fraktkostnad: 0 kr</p>`;
  } else {
    cart.innerHTML += `<p>Fraktkostnad: ${Math.round(25 + 0.1 * sum)} kr</p>`; //shipment price round up
  }

  // Monday discount
  if (monday) {
    sum *= 0.9; // 10% discount on total amount
    message += '<p>Måndagsrabatt: 10% på hela beloppet!</p>';
  }

  cart.innerHTML += `<p>Totalt: ${sum.toFixed(2)} kr</p>`;
  cart.innerHTML += `<p>${message}</p>`;


  // Disable invoice option if total is greater than 800 SEK
  const invoiceRadio = document.getElementById('invoice');
  if (sum > 800) {
    invoiceRadio.disabled = true; // Disable the invoice payment option
    if (invoiceRadio.checked) {
      document.getElementById('card').checked = true; // Automatically switch to card if invoice is selected
    }
  }else {
    invoiceRadio.disabled = false; // Enable the invoice payment option if total is <= 800 SEK

  }

  // eventlistener for increase and decrease
  document.querySelectorAll('.item-decrease').forEach((button) => {
    button.addEventListener('click', (e) => {
      const productId = Number(e.target.getAttribute('data-id'));
      updateProductAmount(productId, -1);
    });
  });

  document.querySelectorAll('.item-increase').forEach((button) => {
    button.addEventListener('click', (e) => {
      const productId = Number(e.target.getAttribute('data-id'));
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

// _______________________________________________________________________
// _______________________________________________________________________
// _______________________________________________________________________
// _______________________________________________________________________
// __________________________________Form_________________________________
// _______________________________________________________________________
// _______________________________________________________________________
// _______________________________________________________________________
// _______________________________________________________________________
// _______________________________________________________________________

//form

  const paymentMethodRadios = document.querySelectorAll(
    'input[name="payment-method"]'
  );
  const cardFields = document.getElementById('card-fields');
  const invoiceFields = document.getElementById('invoice-fields');
  const submitBtn = document.getElementById('submit-btn');
  const resetBtn = document.getElementById('reset-btn');
  const form = document.getElementById('order-form');
  const personalNumberInput = document.getElementById('personal-number');
  const privacyPolicyCheckbox = document.getElementById('privacy-policy');
  const orderConfirmation = document.getElementById('orderconfirmation');
  const mailAdressInput = document.getElementById('email');

  // function for pay alternative
  paymentMethodRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      if (document.getElementById('card').checked) {
        cardFields.style.display = 'block';
        invoiceFields.style.display = 'none';
      } else if (document.getElementById('invoice').checked) {
        invoiceFields.style.display = 'block';
        cardFields.style.display = 'none';
      }
    });
  });

  // validation personalnumber
  personalNumberInput.addEventListener('input', () => {
    const regex = /^\d{6}-\d{4}$/;
    if (!regex.test(personalNumberInput.value)) {
      personalNumberInput.setCustomValidity(
        'Ange ett giltigt personnummer (ÅÅMMDD-XXXX).'
      );
    } else {
      personalNumberInput.setCustomValidity('');
    }
  });

  // validation email
  function validateEmail(email) {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailPattern.test(email);
  }

  // reset form
  resetBtn.addEventListener('click', () => {
    form.reset();
    cardFields.style.display = 'none';
    invoiceFields.style.display = 'none';
    submitBtn.disabled = true;
    orderConfirmation.style.display = 'none';
  });

  // validation
  form.addEventListener('input', () => {
    const isEmailValid = validateEmail(mailAdressInput.value);
    if (!isEmailValid) {
      mailAdressInput.setCustomValidity('Ange en giltig epost-adress');
    } else {
      mailAdressInput.setCustomValidity('');
    }

    const isFormValid = form.checkValidity() && privacyPolicyCheckbox.checked;
    submitBtn.disabled = !isFormValid;
  });

  privacyPolicyCheckbox.addEventListener('change', () => {
    const isFormValid = form.checkValidity() && privacyPolicyCheckbox.checked;
    submitBtn.disabled = !isFormValid;
  });

  // Orderconfirmation
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent page to reload

    // collect data
    const purchasedProducts = products.filter((product) => product.amount > 0);
    const paymentMethod = document.querySelector(
      'input[name="payment-method"]:checked'
    ).value;

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

// _______________________________________________________________________
// _______________________________________________________________________
// _______________________________________________________________________
// _______________________________________________________________________
// ____________________________Foramtted Date/Timer_______________________
// _______________________________________________________________________
// _______________________________________________________________________
// _______________________________________________________________________
// _______________________________________________________________________
// _______________________________________________________________________

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
    <p class='msg'>Vald betalningsmetod: <strong>${
      paymentMethod === 'card' ? 'Kortbetalning' : 'Faktura'
    }</strong></p>
    <h3 class='msg'>Sammanfattning:</h3>
    <span class='msg'>
      ${purchasedProducts
        .map(
          (product) => `
        ${product.name} - ${product.amount} st - ${
            product.amount * product.price
          } kr
      `
        )
        .join('')}
    </span>
    <p class='msg'>Total: <strong>${purchasedProducts.reduce(
      (sum, product) => sum + product.amount * product.price,
      0
    )} kr</strong></p>
    
  `;

    // reset form and cart
    form.reset();
    products.forEach((product) => (product.amount = 0));
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
    cardFields.style.display = 'none';
    invoiceFields.style.display = 'none';
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

}
