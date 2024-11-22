//products

const products = [
    {
        id: 0,
        name: 'Äppelmunk',
        price: 15,
        raiting: 4,
        amount: 0,
        category: 'Frukt',
        img: {
            url: 'images/apple.png',
            alt: "Munk med smak av äpple",
        },
    },


   {    
        id: 1,
        name: 'Körsbärsmunk',
        price: 19,
        raiting: 3,
        amount: 0,
        category: 'Frukt',
        img: {
            url: 'images/cherry.png',
            alt: "Munk med smak av körsbär"
        },
    },



    {   
        id: 2,
        name: 'Kaffemunk',
        price: 19,
        raiting: 3,
        amount: 0,
        category: 'Kryddor',
        img: {
            url: 'images/coffee.png',
           alt: "Munk med smak av kaffe",
        },
    },

    {    
        id: 3,
        name: 'Kanelmunk',
        price: 17,
        raiting: 3,
        amount: 0,
        category: 'Kryddor',
        img: {
            url: 'images/cinnamon.png',
            alt: "Munk med smak av kanel"
        },
    },

    {    
        id: 4,
        name: 'Lakritsmunk',
        price: 15,
        raiting: 3,
        amount: 0,
        category: 'Godis',
        img: {
            url: 'images/licorice.png',
            alt: "Munk med smak av lakrits"
        },
    },

    {    
        id: 5,
        name: 'Chokaldmunk',
        price: 15,
        raiting: 3,
        amount: 0,
        category: 'Godis',
        img: {
            url: 'images/chocolate.png',
            alt: "Munk med smak av choklad"
        },
    },

    {    
        id: 6,
        name: 'Polkagrismunk',
        price: 18,
        raiting: 3,
        amount: 0,
        category: 'Godis',
        img: {
            url: 'images/candycane.png',
            alt: "Munk med smak av polkagris"
        },
    },

    {    
        id: 7,
        name: 'Cheesecake munk',
        price: 15,
        raiting: 3,
        amount: 0,
        category: 'Godis',
        img: {
            url: 'images/creamy.png',
            alt: "Munk med smak av cheesecake"
        },
    },

    {   
        id: 8,
        name: 'Jordgubbsmunk',
        price: 19,
        raiting: 3,
        amount: 0,
        category: 'Frukt',
        img: {
            url: 'images/strawberry.png',
            alt: "Munk med smak av jordgubbe"
        },
    },

    {   
        id: 9,
        name: 'Vaniljmunk',
        price: 15,
        raiting: 3,
        amount: 0,
        category: 'Kryddor',
        img: {
            url: 'images/vanilla.png',
            alt: "Munk med smak av vanlj"
        },
    },
];


const productsListDiv = document.querySelector
('#product-list');


//products
products.forEach(product => {
    productsListDiv.innerHTML += 
`
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

`

});



//Får inte till raitingen?? Vet inte vad jag gör för fel. 😇😇😇😇
function getRatingHtml(rating) {
  
  const isHalf = String(rating).indexOf('.');

  let html = '';
  for (let i = 0; i < rating; i++) {
    html += `<span>&#11088;</span>`;
  }

  return html;
}
  
 


//sort products by price, name, raiting.
    function sortProducts(products, sortBy, ascending = true) {
      return products.sort((a, b) => {
          let comparison = typeof a[sortBy] === "string"
              ? a[sortBy].localeCompare(b[sortBy])
              : a[sortBy] - b[sortBy];
          return ascending ? comparison : -comparison;
      });
  }

  function updateProductList() {
      const sortCriteria = document.getElementById("sortCriteria").value;
      const descending = document.getElementById("descending").checked;
      const sortedProducts = sortProducts(products, sortCriteria, !descending);

      const productList = document.getElementById("product-list");
      productList.innerHTML = "";

      sortedProducts.forEach(product => {
          const productDiv = document.createElement("div");
          productDiv.classList.add("product");
          productDiv.innerHTML = productsListDiv.innerHTML += 
          `
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
          `
          
      });
  }

  
 // function to increase and decrease amount.
function printProductsList() {
    
    productsListDiv.innerHTML = '';
  
    products.forEach(product => {
      productsListDiv.innerHTML += 
      `
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
      `
    });
  
  const increaseButtons = document.querySelectorAll('button.increase');
  increaseButtons.forEach(button => {
    button.addEventListener('click', increaseProductCount);
    
  });

  const decreaseButtons = document.querySelectorAll('button.decrease');
  decreaseButtons.forEach(button => {
    button.addEventListener('click', decreaseProductCount);
    
  });
 
 

}


  printProductsList();
  


  //increase amount
  function increaseProductCount(e) {
  const productId = Number(e.target.id.replace('increase-', ''));
  const foundProductIndex = products.findIndex(product => product.id === productId);
  
  
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
  const foundProductIndex = products.findIndex(product => product.id === productId);
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


/*
x Skapa en varukorgs sammanställning
x skapa en varukorg cart
x funktion för att lägga till produkter
x lägg till bilder för varje produkt
x uppdatera kundkorgen när en vara läggs till, animation
- funktion för att ta bort en vara från kundkorgen
- Totalsumman ska uppdateras baserat på ändringar som sker i antal beställda munkar i realtid
- funktion för att uppdatera kundkorgens visning totalbelopp osv
x om det inte finns några produkter så ska det skrivas ut att varukorgen är tom
*/

const cart = document.querySelector('#cart');

function updateAndPrintCart() {
  
  
  const purchasedProducts = products.filter((product) => product.amount > 0);
  console.log(purchasedProducts);
  
   // if the cart is empty
   if (purchasedProducts.length === 0) {
    cart.innerHTML = '<h3>Varukorgen</h3><p>Varukorgen är tom!</p>';
    return; // finish if the cart is empty
  }

  // if there is products show them
  cart.innerHTML = '<h3>Varukorgen</h3>';
  purchasedProducts.forEach(product => {
    cart.innerHTML += `
      <div>
        <img src="${product.img.url}" alt="${product.img.alt}">
        ${product.name}: ${product.amount} st - ${product.amount * product.price} kr
        <button class="delete">Ta bort</button>
      </div>
      
    `;
  });

  
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

//function for pay alternitive
paymentMethodRadios.forEach(radio => {
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

// function for validation of personalid
personalNumberInput.addEventListener('input', () => {
    const regex = /^\d{6}-\d{4}$/;
    if (!regex.test(personalNumberInput.value)) {
        personalNumberInput.setCustomValidity('Ange ett giltigt personnummer (ÅÅMMDD-XXXX).');
    } else {
        personalNumberInput.setCustomValidity('');
    }
});

// earase form
resetBtn.addEventListener('click', () => {
    form.reset();
    cardFields.style.display = 'none';
    invoiceFields.style.display = 'none';
    submitBtn.disabled = true;  // Inaktivera knappen tills formuläret är korrekt ifyllt
});

form.addEventListener('input', () => {
  // check form for validation
  const isFormValid = form.checkValidity() && privacyPolicyCheckbox.checked;
  submitBtn.disabled = !isFormValid;
});


privacyPolicyCheckbox.addEventListener('change', () => {
  // update submit button when validation is accepted
  const isFormValid = form.checkValidity() && privacyPolicyCheckbox.checked;
  submitBtn.disabled = !isFormValid;
});


submitBtn.disabled = !form.checkValidity() || !privacyPolicyCheckbox.checked;




