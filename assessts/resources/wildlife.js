
// // variables and constants
// const cartContainer = document.querySelector('.cart-holder');
// const productList = document.querySelector('.product-list');
// const cartList = document.querySelector('.cart-list');
// const cartTotalValue = document.getElementById('cart-total-value');
// const cartCountInfo = document.getElementById('cart-count-info');
// let cartItemID = 1;

// eventListeners();

// // all event listeners
// function eventListeners(){
//     window.addEventListener('DOMContentLoaded', () => {
//         loadJSON();
//         loadCart();
//     });
//     // toggle navbar when toggle button is clicked
//     document.querySelector('.navbar-toggler').addEventListener('click', () => {
//         if(document.querySelector(".nav-holder").style.display == "block"){
           
//             document.querySelector(".nav-holder").style.display = "none";
//         }else{
//             document.querySelector(".nav-holder").style.display = "block";
//         }
//     });

//     // show/hide cart container
//     document.getElementById('cart-btn').addEventListener('click', () => {
//         let cartInfo = findCartInfo();
//         if(cartInfo.productCount < 1){
//             alert("No item inside the shopping cart.");
//             if(cartContainer.classList.toggle('show-cart-container')){
//                 cartContainer.classList.toggle('show-cart-container')
//             }
//         }else{
//             cartContainer.classList.toggle('show-cart-container');
//         }
            
//     });

//     let navLink = document.querySelectorAll(".nav-link");

//     navLink.forEach(n => n.addEventListener("click", closeMenu));
  
//     function closeMenu() {
//         document.querySelector(".nav-holder").style.display = "none";
//     }


//     // add to cart
//     productList.addEventListener('click', purchaseProduct);

//     // delete from cart
//     cartList.addEventListener('click', deleteProduct);
// }

// // update cart info
// function updateCartInfo(){
//     let cartInfo = findCartInfo();
//     cartCountInfo.textContent = cartInfo.productCount;
//     cartTotalValue.textContent = cartInfo.total;
// }

// // load product items content form JSON file
// function loadJSON(){
//     fetch('animals.json')
//     .then(response => response.json())
//     .then(data =>{
//         let html = '';
//         data.forEach(product => {
//             html += `
//                 <div class = "product-item">
//                     <div class = "product-img">
//                         <img src = "${product.imgSrc}" alt = "product image"><br>
//                     </div>

//                     <div class = "product-content">
//                         <p class = "product-name">${product.name}</p><br>
//                         <span class = "product-color">${product.color}</span><br>
//                         <p class = "product-price">$${product.price}</p>
                    
//                         <button type = "button" class = "add-to-cart-btn">
//                             <i class = "fas fa-shopping-cart"></i>Add To Cart
//                         </button>
//                     </div>
//                 </div>
//             `;
//         });
//         productList.innerHTML = html;
//     })
//     .catch(error => {
//         alert(`User live server or local server`);
//         //URL scheme must be "http" or "https" for CORS request. You need to be serving your index.html locally or have your site hosted on a live server somewhere for the Fetch API to work properly.
//     })
// }


// // purchase product
// function purchaseProduct(e){
//     if(e.target.classList.contains('add-to-cart-btn')){
//         let product = e.target.parentElement.parentElement;
//         getProductInfo(product);
//         alert(product.querySelector('.product-name').textContent+" has been added to the Cart.");
//     }
// }

// // get product info after add to cart button click
// function getProductInfo(product){
//     let productInfo = {
//         id: cartItemID,
//         imgSrc: product.querySelector('.product-img img').src,
//         name: product.querySelector('.product-name').textContent,
//         color: product.querySelector('.product-color').textContent,
//         price: product.querySelector('.product-price').textContent
//     }
//     cartItemID++;
//     addToCartList(productInfo);
//     saveProductInStorage(productInfo);
// }

// // add the selected product to the cart list
// function addToCartList(product){
//     const cartItem = document.createElement('div');
//     cartItem.classList.add('cart-item');
//     cartItem.setAttribute('data-id', `${product.id}`);
//     cartItem.innerHTML = `
//         <img src = "${product.imgSrc}" alt = "product image">
//         <div class = "cart-item-info">
//             <h3 class = "cart-item-name">${product.name}</h3>
//             <span class = "cart-item-color">${product.color}</span>
//             <span class = "cart-item-price">${product.price}</span>
//         </div>

//         <button type = "button" class = "cart-item-del-btn">
//             <i class = "fas fa-times"></i>
//         </button>
//     `;
//     cartList.appendChild(cartItem);
// }

// // save the product in the local storage
// function saveProductInStorage(item){
//     let products = getProductFromStorage();
//     products.push(item);
//     localStorage.setItem('products', JSON.stringify(products));
//     updateCartInfo();
// }

// // get all the products info if there is any in the local storage
// function getProductFromStorage(){
//     return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
//     // returns empty array if there isn't any product info
// }

// // load carts product
// function loadCart(){
//     let products = getProductFromStorage();
//     if(products.length < 1){
//         cartItemID = 1; // if there is no any product in the local storage
//     } else {
//         cartItemID = products[products.length - 1].id;
//         cartItemID++;
//         // else get the id of the last product and increase it by 1
//     }
//     products.forEach(product => addToCartList(product));

//     // calculate and update UI of cart info 
//     updateCartInfo();
// }

// // calculate total price of the cart and other info
// function findCartInfo(){
//     let products = getProductFromStorage();
//     let total = products.reduce((acc, product) => {
//         let price = parseFloat(product.price.substr(1)); // removing dollar sign
//         return acc += price;
//     }, 0); // adding all the prices

//     return{
//         total: total.toFixed(2),
//         productCount: products.length
//     }
// }

// // delete product from cart list and local storage
// function deleteProduct(e){
//     let cartItem;
//     if(e.target.tagName === "BUTTON"){
//         cartItem = e.target.parentElement;
//         alert(cartItem.querySelector('.cart-item-name').textContent+" has been removed from the cart.")
//         cartItem.remove(); // this removes from the DOM only
//     } else if(e.target.tagName === "I"){
//         cartItem = e.target.parentElement.parentElement;
//         alert(cartItem.querySelector('.cart-item-name').textContent+" has been removed from the cart.")
//         cartItem.remove(); // this removes from the DOM only
//     }

//     let products = getProductFromStorage();
//     let updatedProducts = products.filter(product => {
//         return product.id !== parseInt(cartItem.dataset.id);
//     });
//     localStorage.setItem('products', JSON.stringify(updatedProducts)); // updating the product list after the deletion
//     updateCartInfo();
// }



// slideshow method

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}





// let navLink = document.querySelectorAll(".nav-link");

//   navLink.forEach(n => n.addEventListener("click", closeMenu));

//   function closeMenu() {
//         shop.style.display = "flex";
//         menuList.style.paddingTop = "0";
//         container.style.display = "none";
//         menuList.classList.remove("active");
//   }