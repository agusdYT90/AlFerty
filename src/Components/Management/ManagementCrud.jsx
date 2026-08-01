import ProductCrud from "../Management/Products/ProductCrud.jsx";
import UserCrud from "../Management/Users/UserCrud.jsx";
import { ProductProvider } from "../../Contexts/Products.jsx";
import { UsersProvider } from "../../Contexts/Users.jsx";

function ManagementCrud() {

     return (
          <>
               <ProductProvider>
                    <UsersProvider>
                         <ProductCrud />
                         <UserCrud />
                    </UsersProvider>
               </ProductProvider>
          </>
     );
}

export default ManagementCrud;