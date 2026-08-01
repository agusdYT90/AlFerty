import Products from "../Components/Shop/Products.jsx";
import Cart from "../Components/Shop/Cart.jsx";
import { ProductProvider } from "../Contexts/Products.jsx";
import { CartProvider } from "../Contexts/Cart.jsx";

function Shop() {

     return (
          <>
               <ProductProvider>
                    <CartProvider>
                         <Products />
                         <Cart />
                    </CartProvider>
               </ProductProvider>
          </>
     );
}

export default Shop;