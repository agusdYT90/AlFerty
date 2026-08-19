import { Link } from "react-router-dom";
import RoutesNav from "../../Hooks/UseRoutesNav";
import "../../Styles/Main/Sidebar.css";

function Sidebar({ Cambiar, Mostrar }) {

     const Rutas = RoutesNav();

     return (
          <aside className={`sidebar ${Mostrar ? "true" : "false"}`}>
               <nav className="NavSidebar">
                    <ul>
                    {Rutas.map(({ Direccion, Class, Texto }) => (
                         <li key={Direccion}>
                              <Link to={Direccion} className={Class}>{Texto}</Link>
                         </li>
                    ))}
               </ul>
               </nav>
          </aside>
     );
}

export default Sidebar;