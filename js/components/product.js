function products(productos) {
  // console.log(productos); 
  
  const db = [...productos]

  function printProduct(){
    const productsContainer = document.querySelector('.products_container')

    let htmlProduct = ''

    for (const producto of db) {
      htmlProduct += `
      <article class="product">
          <div class="product__image">
            <img src="${producto.image}" alt="${producto.name}">
          </div>
          <div class="product__content">
            <button class="product__btn btn--add-to-cart" data-id="${producto.id}">
              <i class="bx bx-cart"></i>
            </button>
            <p class="product__price">$${producto.price}</p>
            <p class="product__stock">Disponibles: ${producto.quantity}</p>
            <p class="product__title">${producto.name}</p>
          </div>
        </article>
      
      `;
    }

    productsContainer.innerHTML = htmlProduct


  }
  printProduct();

  return {
    db,
    printProduct
  }
}


export default products