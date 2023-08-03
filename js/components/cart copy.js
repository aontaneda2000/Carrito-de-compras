function cart(db, printProduct) {
  // console.log(db);
  // array vacio 
  let cart = []
  // seleccionar

  function printCart() {
    console.log('Carrito');
    console.log(cart);

    console.log('Items: ' + showItemsCount());
    console.log('Total ' + showTotal());
   
    
  }

  function addToCart(id, qty = 1) {
    const itemFinded = cart.find(itemBD => itemBD.id === id)

    if (itemFinded) {
      console.log(` el producto  ${id} ya esta`);
      itemFinded.qty += qty; 
    } else {
      cart.push({ id, qty });   
      
      
    }
    printCart();
      
  }
  addToCart(2);
  addToCart(2);
  addToCart(3);
  // addToCart(2);
  // addToCart(3);
  function removeFromCart(id, qty = 1) {
    const itemFinded = cart.find((item) => item.id === id);
    
    const result = itemFinded.qty - qty 
    if (result > 0) {
      console.log('Quedan productos con el id');
      itemFinded.qty -= qty; 
      
    } else {
      console.log("No Quedan productos con el id");
      // Filtra todos los items que sean diferentes al que estoy pasando
      cart = cart.filter(item => item.id !== id)
    }
    printCart();

  }

  // removeFromCart(3)

  function deleteFromCart(id) {
    cart = cart.filter(item => item.id !== id)
    console.log('Se elimino el producto con el id'+ id );
  }
  // deleteFromCart(3);

  function showItemsCount() {
    let suma = 0;

    for (const item of cart) {
      // console.log(item);
      suma = suma + item.qty
    }
    // console.log(suma);
    return suma

  }
  showItemsCount()
  
  function showTotal() {
/* Calcular el precio de la bd con la cantidad que esta en el carrito */
    
    let total = 0
    for (const item of cart) {
      const productFinded = db.find(p => p.id === item.id)
      
      total = total + productFinded.price * item.qty
    }
    return total
  }

  function checkout() {
    // Encontrar el item en la base de datos para restar la cantidad de productos del carrito 
    for (const item of cart) {
      const productFinded = db.find(p => p.id === item.id)
       productFinded.quantity -= item.qty 
    }
    // Vaciar el carrito
    cart = []
    // Pintar el carrito nuevamente sin ningun articulo
    printCart()
    // Pintar nuevamente la actualizacion de los productos que han sido comprados
    printProduct()
    window.alert('Gracias por su compra')


  }
  checkout();

}


export default cart


