import cart from "./components/cart.js";
import products from "./components/product.js";
import showCart from "./components/showCart.js";
import getProducts from "./helpers/getProducts.js";

showCart()


const { db, printProduct } = products(await getProducts())


cart(db, printProduct)