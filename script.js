//products

const products = [
  {
    id: 0,
    name: "Äppelmunk",
    price: 15,
    rating: 4,
    amount: 0,
    category: "Frukt",
    img: {
      url: "images/apple.png",
      alt: "Munk med smak av äpple",
    },
  },

  {
    id: 1,
    name: "Körsbärsmunk",
    price: 19,
    rating: 3,
    amount: 0,
    category: "Frukt",
    img: {
      url: "images/cherry.png",
      alt: "Munk med smak av körsbär",
    },
  },

  {
    id: 2,
    name: "Kaffemunk",
    price: 19,
    rating: 3,
    amount: 0,
    category: "Kryddor",
    img: {
      url: "images/coffee.png",
      alt: "Munk med smak av kaffe",
    },
  },

  {
    id: 3,
    name: "Kanelmunk",
    price: 17,
    rating: 3,
    amount: 0,
    category: "Kryddor",
    img: {
      url: "images/cinnamon.png",
      alt: "Munk med smak av kanel",
    },
  },

  {
    id: 4,
    name: "Lakritsmunk",
    price: 15,
    rating: 3,
    amount: 0,
    category: "Godis",
    img: {
      url: "images/licorice.png",
      alt: "Munk med smak av lakrits",
    },
  },

  {
    id: 5,
    name: "Chokaldmunk",
    price: 15,
    rating: 3,
    amount: 0,
    category: "Godis",
    img: {
      url: "images/chocolate.png",
      alt: "Munk med smak av choklad",
    },
  },

  {
    id: 6,
    name: "Polkagrismunk",
    price: 18,
    rating: 3,
    amount: 0,
    category: "Godis",
    img: {
      url: "images/candycane.png",
      alt: "Munk med smak av polkagris",
    },
  },

  {
    id: 7,
    name: "Cheesecake munk",
    price: 15,
    rating: 3,
    amount: 0,
    category: "Godis",
    img: {
      url: "images/creamy.png",
      alt: "Munk med smak av cheesecake",
    },
  },

  {
    id: 8,
    name: "Jordgubbsmunk",
    price: 19,
    rating: 3,
    amount: 0,
    category: "Frukt",
    img: {
      url: "images/strawberry.png",
      alt: "Munk med smak av jordgubbe",
    },
  },

  {
    id: 9,
    name: "Vaniljmunk",
    price: 15,
    rating: 3,
    amount: 0,
    category: "Kryddor",
    img: {
      url: "images/vanilla.png",
      alt: "Munk med smak av vanlj",
    },
  },
];

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
  let html = '';

  
  for (let i = 0; i < Math.floor(rating); i++) {
    html += `<span>&#11088;</span>`; 
  }

  return html;
}


function updateProductList() {
  const sortCriteria = document.getElementById("sortCriteria").value;
  const sortedProducts = sortProducts(products, sortCriteria, !descending);

  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  sortedProducts.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = productsListDiv.innerHTML += `
          <section class="container">
            <article class="product">
              <h3>${product.name}</h3>
              <p>${product.price} kr</p>
              <p>Kategori: ${product.category}</p>
              <img src="${product.img.url}" alt="${product.img.alt}">
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
}

// function to increase and decrease amount.
function printProductsList() {
  productsListDiv.innerHTML = "";

  products.forEach((product) => {
    productsListDiv.innerHTML += `
      <section class="container">
        <article class="product">
          <h3>${product.name}</h3>
          <p>${product.price} kr</p>
          <p>Kategori: ${product.category}</p>
          <img src="${product.img.url}" alt="${product.img.alt}">
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

  const increaseButtons = document.querySelectorAll('button.increase');
  increaseButtons.forEach((button) => {
    button.addEventListener('click', increaseProductCount);
  });

  const decreaseButtons = document.querySelectorAll('button.decrease');
  decreaseButtons.forEach((button) => {
    button.addEventListener('click', decreaseProductCount);
  });
}

printProductsList();

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

const cart = document.querySelector('#cart');

function updateAndPrintCart() {
  const purchasedProducts = products.filter((product) => product.amount > 0);
  const cartCountElement = document.getElementById('cart-count');
  const totalItemsInCart = products.reduce(
    (sum, product) => sum + product.amount,
    0
  );
  cartCountElement.textContent = totalItemsInCart;

  // if cart is empty
  if (purchasedProducts.length === 0) {
    cart.innerHTML =
      '<span class="basket">Varukorg</span><span class="support">Kundsupport 08-634 30 30</span><p>Varukorgen är tom!</p>';
    return;
  }

  //cart products
  cart.innerHTML =
    '<span class="basket">Varukorg</span><span class="support">Kundsupport 08-634 30 30</span>';
  purchasedProducts.forEach((product) => {
    cart.innerHTML += `
      <article>
        <img src="${product.img.url}" alt="${product.img.alt}">
        <span>${product.name}</span> | <span>${product.amount} st</span> | 
        <span>${product.amount * product.price} kr</span>
        <button class="item-decrease" data-id="${product.id}">-</button>
      <button class="item-increase" data-id="${product.id}">+</button>
      </article>
      `;
  });

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
  const productIndex = products.findIndex((product) => product.id === productId);
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
const paymentMethodRadios = document.querySelectorAll('input[name="payment-method"]');
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
    personalNumberInput.setCustomValidity("");
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


