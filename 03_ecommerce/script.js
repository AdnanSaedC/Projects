document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.999 },
  ];

  const cart =  JSON.parse(localStorage.getItem('cart')) || [];


  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");


  renderCart();
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <span>${product.name} - $${product.price.toFixed(2)}</span>
    <button data-id="${product.id}">Add to cart</button>
    `;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);

      let newProduct = true;

      cart.forEach((product)=>{
        if(product.id=== productId){
          product.quantity++;
          renderCart();
          newProduct = false;
        }
      })

      if(newProduct){
          product.quantity=1;
          addToCart(product);
      }
      console.log(product)
      console.log(cart)
    }
  });

  function addToCart(product) {
    cart.push(product);
    console.log(cart)
    saveDateInLocalStorage();
    renderCart();
  }

  const newCart = []

  function saveDateInLocalStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
  }

  function renderCart() {
    console.log(cart)
    cartItems.innerText = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      cart.forEach((item, index) => {
        totalPrice += item.price*item.quantity;
        const cartItem = document.createElement("div");
        cartItem.setAttribute('class','product')
        cartItem.innerHTML = `
        ${item.name} - $${item.price.toFixed(2)}
        - ${item.quantity}- ${item.quantity*item.price}
        <button data-id="${item.id}">Delete</button>`;
        cartItem.addEventListener(('click'),(e)=>{
          e.preventDefault();
          console.log(cartItem.querySelector("button").getAttribute('data-id'));
          
          cart.forEach((item)=>{
            if(item.id!=cartItem.querySelector("button").getAttribute('data-id')){
              newCart.push(item);
            }
          })
          updateCart();
        })
        cartItems.appendChild(cartItem);
        totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
      });
    } else {
      emptyCartMessage.classList.remove("hidden");
      totalPriceDisplay.textContent = `$0.00`;
    }
  }

  function updateCart(){
    cart.length=0;
    newCart.forEach((cartItem)=>{
      cart.push(cartItem)
    })
    saveDateInLocalStorage()
    renderCart()
  }

  checkOutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert("Checkout successfully");
    localStorage.removeItem('cart')
    renderCart();
  });
});
