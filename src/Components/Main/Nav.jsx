import { Link } from "react-router-dom";
import RoutesNav from "../../Hooks/UseRoutesNav";
import "../../Styles/Main/Nav.css";

function Nav() {

     const Rutas = RoutesNav();

     return (
          <nav className="nav">
               <ul>
                    {Rutas.map(({ Direccion, Class, Texto }) => (
                         <li key={Direccion}>
                              <Link to={Direccion} className={Class}>{Texto}</Link>
                         </li>
                    ))}
               </ul>
          </nav>
     );
}

export default Nav;