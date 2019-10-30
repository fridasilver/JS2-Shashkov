//заглушки (имитация базы данных)
const image = "http://placeimg.com/200/150/tech";
const cartImage = "http://placeimg.com/100/80/tech";
const items = [
  "Notebook",
  "Display",
  "Keyboard",
  "Mouse",
  "Phones",
  "Router",
  "USB-camera",
  "Gamepad"
];
const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
const ids = [1, 2, 3, 4, 5, 6, 7, 8];

//создание массива объектов - имитация загрузки данных с сервера
function fetchData() {
  let arr = [];
  for (let i = 0; i < items.length; i++) {
    arr.push(createProduct(i));
  }
  return arr;
}

//создание объекта товара
function createProduct(i) {
  return {
    id: ids[i],
    name: items[i],
    price: prices[i],
    img: image
  };
}
let data = fetchData(); //массив объектов для создания товаров

function fetchProducts() {
  let arr = [];
  for (let i = 0; i < items.length; i++) {
    arr.push(new Product(data[i]));
  }
  return arr;
}

class Product { //товар
  constructor(product) {
    this.title = product.name;
    this.price = product.price;
    this.img = product.img;
    this.id = product.id;
    this.template = `<div class="product-item" data-id="${this.id}">
                            <img src="${this.img}" alt="Some img">
                            <div class="desc">
                                <h3>${this.title}</h3>
                                <p>${this.price} $</p>
                                <button class="buy-btn" 
                                data-id="${this.id}"
                                data-name="${this.title}"
                                data-image="${this.img}"
                                data-price="${this.price}">Купить</button>
                            </div>
                        </div>`;
  }
}

class ProductsList { //список товаров
  constructor() {
    this.products = [];
    this._init();
  }

  _init() {
    this.products = fetchProducts();
  }
  render() {
    const block = document.querySelector(".products");
    this.products.forEach(product => {
      block.innerHTML += product.template;
    });
  }
}

let list = new ProductsList();
list.render();

class cartItem { //элемент корзины товаров
  constructor(item) {
    this.name = item.name;
    this.id = item.id;
    this.img = item.img;
    this.price = item.price;
    this.quantity = item.quantity;
    this.template = `<div class="cart-item" data-id="${this.id}">
                            <img src="${this.img}" alt="Some img">
                            <div class="desc">
                                <h3>${this.name}</h3>
                                <p>${this.price} $</p>
                                <p>${this.quantity} $</p>
                            </div>
                        </div>`;
  }
}

class Cart { //корзина
  constructor(cart) {
    this.name = cart.name;
    this.id = cart.id;
    this.img = cart.img;
    this.price = cart.price;
    this.quantity = cart.quantity;
    this.template = `<div class="cart-item" data-id="${this.id}">
                            <img src="${this.img}" alt="Some img">
                            <div class="desc">
                                <h3>${this.name}</h3>
                                <p>${this.price} $</p>
                                <p>${this.quantity} $</p>
                            </div>
                        </div>`;
  } //создать страницу с корзиной в html.

  renderCart() {
    let allProducts = "";
    for (el of userCart) {
      allProducts += `<div class="cart-item" data-id="${el.id}">
                             <div class="product-bio">
                                <img src="${el.img}" alt="Some image">
                                 <div class="product-desc">
                                    <p class="product-title">${el.name}</p>
                                     <p class="product-quantity">Quantity: ${
                                       el.quantity
                                     }</p>
                                     <p class="product-single-price">$${
                                       el.price
                                     } each</p>
                                 </div>
                             </div>
                             <div class="right-block">
                                <p class="product-price">${el.quantity *
                                  el.price}</p>
                                 <button class="del-btn" data-id="${
                                   el.id
                                 }">&times;</button>
                             </div>
                         </div>`;
    }
    document.querySelector(`.cart-block`).innerHTML = allProducts;
  }
}


//1. Добавьте пустые классы для корзины товаров и элемента корзины товаров. Продумайте, какие методы понадобятся для работы с этими сущностями.
//2. Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.

// //глобальные сущности корзины и каталога (ИМИТАЦИЯ! НЕЛЬЗЯ ТАК ДЕЛАТЬ!)
// var userCart = [];
// var list = fetchData ();

// //кнопка скрытия и показа корзины
// document.querySelector('.btn-cart').addEventListener('click', () => {
//     document.querySelector('.cart-block').classList.toggle('invisible');
// });
// //кнопки удаления товара (добавляется один раз)
// document.querySelector('.cart-block').addEventListener ('click', (evt) => {
//     if (evt.target.classList.contains ('del-btn')) {
//         removeProduct (evt.target);
//     }
// })
// //кнопки покупки товара (добавляется один раз)
// document.querySelector('.products').addEventListener ('click', (evt) => {
//     if (evt.target.classList.contains ('buy-btn')) {
//         addProduct (evt.target);
//     }
// })

// //рендер списка товаров (каталога)
// function renderProducts () {
//     let arr = [];
//     for (item of list) {
//         arr.push(item.createTemplate())
//     }
//     document.querySelector('.products').innerHTML = arr.join();
// }

// renderProducts ();

// //CART

// // Добавление продуктов в корзину
// function addProduct (product) {
//     let productId = +product.dataset['id'];
//     let find = userCart.find (element => element.id === productId);
//     if (!find) {
//         userCart.push ({
//             name: product.dataset ['name'],
//             id: productId,
//             img: cartImage,
//             price: +product.dataset['price'],
//             quantity: 1
//         })
//     }  else {
//         find.quantity++
//     }
//     renderCart ()
// }

// //удаление товаров
// function removeProduct (product) {
//     let productId = +product.dataset['id'];
//     let find = userCart.find (element => element.id === productId);
//     if (find.quantity > 1) {
//         find.quantity--;
//     } else {
//         userCart.splice(userCart.indexOf(find), 1);
//         document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
//     }
//     renderCart ();
// }

// //перерендер корзины
// function renderCart () {
//     let allProducts = '';
//     for (el of userCart) {
//         allProducts += `<div class="cart-item" data-id="${el.id}">
//                             <div class="product-bio">
//                                 <img src="${el.img}" alt="Some image">
//                                 <div class="product-desc">
//                                     <p class="product-title">${el.name}</p>
//                                     <p class="product-quantity">Quantity: ${el.quantity}</p>
//                                     <p class="product-single-price">$${el.price} each</p>
//                                 </div>
//                             </div>
//                             <div class="right-block">
//                                 <p class="product-price">${el.quantity * el.price}</p>
//                                 <button class="del-btn" data-id="${el.id}">&times;</button>
//                             </div>
//                         </div>`
//     }
//     document.querySelector(`.cart-block`).innerHTML = allProducts;
