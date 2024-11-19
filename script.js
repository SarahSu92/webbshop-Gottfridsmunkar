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


//Produkter egenskaperna, raiting, pris.
products.forEach(product => {
    productsListDiv.innerHTML += 
`
<article class="product">

<img src="${product.img.url}">
<h3>${product.name}</h3>
<p>${product.price} kr</p>
<p>Kategori: ${product.category}</p>

<div>
<div>
<button class="decrease" id="decrease-${product.id}">decrease</button>
<input type="number" min="0" value="${product.amount}" id="input-${product.id}">
<button class="increase" id="increase-${product.id}">increase</button>
</div>

</article>

`

});



//Sortera produkterna utifrån namn, pris, kategori och rating 
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

  // Ladda produkterna vid sidladdning
  updateProductList();



// Funktion för att minska respektive öka antalet av vald produkt.
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
  //Öka antalet
  function increaseProductCount(e) {
  const productId = Number(e.target.id.replace('increase-', ''));
  const foundProductIndex = products.findIndex(product => product.id === productId);
  products[foundProductIndex].amount += 1;
  printProductsList();

}

//Minska antalet
function decreaseProductCount(e) {
  console.log('click');
  const productId = Number(e.target.id.replace('decrease-', ''));
  const foundProductIndex = products.findIndex(product => product.id === productId);
  
  if (foundProductIndex !== -1 && products[foundProductIndex].amount > 0) {
    // Minska mängden med 1 om den är större än 0
    products[foundProductIndex].amount--;
  }


printProductsList();

}

// Initiera listan
printProductsList();


