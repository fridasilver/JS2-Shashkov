//заглушки (имитация базы данных)
const image = "http://placeimg.com/200/150/tech";
const cartImage = "http://placeimg.com/100/80/tech";
// const items = [
//   "Notebook",
//   "Display",
//   "Keyboard",
//   "Mouse",
//   "Phones",
//   "Router",
//   "USB-camera",
//   "Gamepad"
// ];
// const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
// const ids = [1, 2, 3, 4, 5, 6, 7, 8];

// //создание массива объектов - имитация загрузки данных с сервера
// function fetchData() {
//   let arr = [];
//   for (let i = 0; i < items.length; i++) {
//     arr.push(createProduct(i));
//   }
//   return arr;
// }

// //создание объекта товара
// function createProduct(i) {
//   return {
//     id: ids[i],
//     title: items[i],
//     price: prices[i],
//     img: image
//   };
// }
// let data = fetchData(); //массив объектов для создания товаров

// function fetchProducts() {
//   let arr = [];
//   for (let i = 0; i < items.length; i++) {
//     arr.push(new Product(data[i]));
//   }
//   return arr;
// }


const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

// Переделать в ДЗ
let getRequest = (url, cb) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        console.log('Error');
      } else {
        cb(xhr.responseText);
      }
    }
  };
  xhr.send();
};

class ProductItem { //товар
  constructor(product) {
    this.title = product.product_name;
    this.price = product.price;
    this.img = image;
    this.id = product.id_product;
  }

  render() { //отрисовка товара
    return `<div class="product-item" data-id="${this.id}">
                            <img src="${this.img}" alt="Some img">
                            <div class="desc">
                                <h3>${this.title}</h3>
                                <p>${this.price} $</p>
                                <button class="buy-btn">Купить</button>                            </div>
                        </div>`;
  }

 _putToCart() { //положить в корзину

}

}

class ProductsList { //список товаров
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    this._getProducts()
      .then(data => {
        this.goods = [...data];
        this._render();
      });
  }

  // _fetchProducts() {
  //   getRequest (`${API}/catalogData.json`, (data) => {
  //     this.goods = JSON.parse(data);
  //     this._render();
  //     console.log(this.goods);
  //   });
  // }

  _getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then(result => result.json())
      .catch(error => {
        console.log('Error: ', error);
      })
  }
 
  _render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
    }
  }

const list = new ProductsList();

const userCart = []; //не работает

class Cart { //корзина
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


  //добавление товара в корзину
  function addProduct (product) {
    let productId = +product.dataset['id'];
    let find = userCart.find (element => element.id === productId);
    if (!find) {
        userCart.push ({
            name: product.dataset ['name'],
            id: productId,
            img: cartImage,
            price: +product.dataset['price'],
            quantity: 1
        })
    }  else {
        find.quantity++
    }
    renderCart()
}

//удаление товаров
function removeProduct (product) {
    let productId = +product.dataset['id'];
    let find = userCart.find (element => element.id === productId);
    if (find.quantity > 1) {
        find.quantity--;
    } else {
        userCart.splice(userCart.indexOf(find), 1);
        document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
    }
    renderCart ();
}

//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
  document.querySelector('.cart-block').classList.toggle('invisible');
});

//кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener ('click', (evt) => {
  if (evt.target.classList.contains ('del-btn')) {
      removeProduct (evt.target);
  }
})

//кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener ('click', (evt) => {
  if (evt.target.classList.contains ('buy-btn')) {
      addProduct (evt.target);
  }
})


//перерендер корзины
function renderCart () {
  let allProducts = '';
  for (el of userCart) {
      allProducts += `<div class="cart-item" data-id="${el.id}">
                          <div class="product-bio">
                              <img src="${el.img}" alt="Some image">
                              <div class="product-desc">
                                  <p class="product-title">${el.name}</p>
                                  <p class="product-quantity">Quantity: ${el.quantity}</p>
                                  <p class="product-single-price">$${el.price} each</p>
                              </div>
                          </div>
                          <div class="right-block">
                              <p class="product-price">${el.quantity * el.price}</p>
                              <button class="del-btn" data-id="${el.id}">&times;</button>
                          </div>
                      </div>`
  }
  document.querySelector(`.cart-block`).innerHTML = allProducts;
}



// //рендер списка товаров (каталога)
// function renderProducts () {
//     let arr = [];
//     for (item of list) {
//         arr.push(item.createTemplate())
//     }
//     document.querySelector('.products').innerHTML = arr.join();
// }

// renderProducts ();

//CART

// Добавление продуктов в корзину

