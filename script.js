//Produkterna

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
        category: 'Kakor',
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


//Produkter egenskaperna, raiting, pris.
products.forEach(product => {
    productsListDiv.innerHTML += 
`
<article class="product">
<img src="${product.img.url}">
<h3>${product.name}</h3>
<p>${product.price} kr</p>
<label for="star-4"> &#9733;</label>
<label for="star-4"> &#9733;</label>
<label for="star-4"> &#9733;</label>
<label for="star-4"> &#9733;</label>
<div>
<button id="increaseBtn">+</button>
<input type="number" id="amountInput" min="0" value="0">
<button id="decreaseBtn">-</button>
</div>

</article>

`

});


    function printProductsList() {
    // Rensa div:en på befintliga produkter innan utskrift av uppdaterad information
    productsListDiv.innerHTML = '';
  
    products.forEach(product => {
      productsListDiv.innerHTML += 
      `
        <article class="product">
          <h3>${product.name}</h3>
          <p>${product.price} kr</p>
          <img src="${product.img.url}" alt="${product.img.alt}">
            <label for="star-4"> &#9733;</label>
            <label for="star-4"> &#9733;</label>
            <label for="star-4"> &#9733;</label>
            <label for="star-4"> &#9733;</label>
          <div>
            <button class="increase" aria-label="Öka antalet munkar" id="increase-${product.id}">+</button>
            <input type="number" min="0" value="${product.amount}" id="input-${product.id}">
            <button class="decrease" aria-label="Minska antalet munkar" id="decrease-${product.id}">-</button>
          </div>
        </article>
      `;
    });
  
 
    

  const increaseButtons = document.querySelectorAll('button.increase');
  increaseButtons.forEach(button => {
    button.addEventListener('click', increaseProductCount);
  });

}

  const decreaseButtons = document.querySelectorAll('button.decrease');
  decreaseButtons.forEach(button => {
    button.addEventListener('click', decreaseProductCount);
  });


function increaseProductCount(e) {
  const productId = Number(e.target.id.replace('increase-', ''));
  const foundProductIndex = products.findIndex(product => product.id === productId);
  products[foundProductIndex].amount += 1;
  printProductsList();
}

function decreaseProductCount(e) {
  const productId = Number(e.target.id.replace('decrease-', ''));
  const foundProductIndex = products.findIndex(product => product.id === productId);
  if (products[foundProductIndex].amount > 0) {
    products[foundProductIndex].amount -= 1;
  }
  printProductsList();
}

// Initiera listan
printProductsList();