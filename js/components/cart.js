function cart(db, printProduct) {
  // console.log(db);
  // array vacio
  let cart = [];

  // Elementos del Dom
  const productsDom = document.querySelector(".products_container");
  const notifyDOM = document.querySelector(".notify");
  const cartDOM = document.querySelector(".cart__body");
  const countDOM = document.querySelector(".cart__count--item");
  const totalDOM = document.querySelector(".cart__total--item");
  const checkoutDOM = document.querySelector(".btn--buy");

  function printCart() {
    console.log("Carrito");
    console.log(cart);

    let htmlCart = "";
    // Elemento notify
    if (cart.length === 0) {
      htmlCart += `
      <div class="cart__empty">
          <i class="bx bx-cart"></i>
        <p class="cart__text">No hay productos en el carrito</p>
        </div> 
      `;

      notifyDOM.classList.remove("show--notify");
    } else {
      for (const item of cart) {
        const productoFinded = db.find((p) => p.id === item.id);

        htmlCart += `
        <article class="article">
          <div class="article__image">
            <img src="${productoFinded.image}" alt="">

          </div>
          <div class="article__content">
            <span class="article__title">${productoFinded.name}</span>
            <span class="article__price">$${productoFinded.price}</span>
            <div class="article__quantity">
              <button class="article--minus" data-id="${item.id}">-</button>
              <span class="article__quantity--text">${item.qty}</span>
              <button class="article--plus" data-id="${item.id}">+</button>
            </div>
            <button class="article__quantity--btn remove-from-cart" data-id="${item.id}">
              <i class="bx bx-trash"></i>
            </button>
          </div>
        </article>
      `;
      }

      notifyDOM.classList.add("show--notify");
    }
    cartDOM.innerHTML = htmlCart;
    notifyDOM.innerHTML = showItemsCount();
    countDOM.innerHTML = showItemsCount();
    totalDOM.innerHTML = showTotal();
  }

  function addToCart(id, qty = 1) {
    // Encontrar el producto en el carrito
    const itemFinded = cart.find((item) => item.id === id);

    // Verificar si existe para sumar 1 y si no existe agregarlo al carrito
    if (itemFinded) {
      itemFinded.qty += qty;
    } else {
      cart.push({ id, qty });
    }
    printCart();
  }

  function removeFromCart(id, qty = 1) {
    // Encontrar el producto en el carrito con find
    const itemFinded = cart.find((item) => item.id === id);

    // Restarle 1 a la cantidad del producto del carrito
    const result = itemFinded.qty - qty;
    // Verirficar si la cantidad del producto es mayor a 0 para restarle 1
    if (result > 0) {
      itemFinded.qty -= qty;
    } else {
      // Filtra todos los items que sean diferentes al que estoy pasando para eliminar del carrito el producto
      cart = cart.filter((item) => item.id !== id);
    }
    printCart();
  }

  // removeFromCart(3)

  // Eliminar el producto de una filtrando a los que sean diferente al que se pasan por el id
  function deleteFromCart(id) {
    cart = cart.filter((item) => item.id !== id);
    printCart();
  }
  // deleteFromCart(3);

  function showItemsCount() {
    let suma = 0;

    // Sumando la cantidad de todos los productos del carruti en su propiedad qty
    for (const item of cart) {
      // console.log(item);
      suma = suma + item.qty;
    }
    // console.log(suma);
    return suma;
  }

  function showTotal() {
    /* Calcular el precio de la bd con la cantidad que esta en el carrito */

    let total = 0;
    for (const item of cart) {
      // Encontrar el producto
      const productFinded = db.find((p) => p.id === item.id);
      // Calcular precio por cantidad y sumarlo
      total = total + productFinded.price * item.qty;
    }
    return total;
  }

  function checkout() {
    // Encontrar el item en la base de datos para restar la cantidad de productos del carrito
    for (const item of cart) {
      const productFinded = db.find((p) => p.id === item.id);
      productFinded.quantity -= item.qty;
    }
    // Vaciar el carrito
    cart = [];
    // Pintar el carrito nuevamente sin ningun articulo
    printCart();
    // Pintar nuevamente la actualizacion de los productos que han sido comprados
    printProduct();
    window.alert("Gracias por su compra");
  }
  // checkout();
  // Evento para añadir producto al carrito
  productsDom.addEventListener("click", function (e) {
    // Verificar si tiene la clase en el padre o elemento hijo
    if (e.target.closest(".btn--add-to-cart")) {
      console.log("object");
      // Acceder al atributo personalizado datased-id
      const id = e.target.closest(".btn--add-to-cart").dataset.id;
      // Convertir a numero el id para la validacion en la funcion addTocart
      addToCart(+id);
    }
  });

  // Eventos para el carrito
  cartDOM.addEventListener("click", function (e) {
    if (e.target.closest(".article--minus")) {
      console.log("object");
      // Acceder al atributo personalizado datased-id
      const id = e.target.closest(".article--minus").dataset.id;
      // Convertir a numero el id para la validacion en la funcion addTocart
      removeFromCart(+id);
    }
    if (e.target.closest(".article--plus")) {
      console.log("object");
      // Acceder al atributo personalizado datased-id
      const id = e.target.closest(".article--plus").dataset.id;
      // Convertir a numero el id para la validacion en la funcion addTocart
      addToCart(+id);
    }
    if (e.target.closest(".remove-from-cart")) {
      // console.log("object");
      // Acceder al atributo personalizado datased-id
      const id = e.target.closest(".remove-from-cart").dataset.id;
      // Convertir a numero el id para la validacion en la funcion addTocart
      deleteFromCart(+id);
    }
  });
  // eventos

  checkoutDOM.addEventListener("click", function () {
    checkout();
    console.log("click");
  });

  printCart();
}

export default cart;
