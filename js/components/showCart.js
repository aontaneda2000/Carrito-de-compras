function showCart() {
  const btnMenuCart = document.querySelector(".btn--cart");
  const showCart = document.querySelector(".cart");

  btnMenuCart.addEventListener("click", (e) => {
    showCart.classList.toggle("show-cart");
  });
  
}

export default showCart