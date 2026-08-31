import { Link } from "react-router-dom";
import "../../Styles/App/NotFound.css";

function NFound() {

     return (
          <>
               <div className="not-found">
                    <div className="not-found-conteiner">
                         <h2 className="not-found-error">ERROR 404</h2>
                         <h3 className="not-found-sub">Página no encontrada</h3>
                         <Link to="/" className="Link">Ir a Inicio</Link>
                    </div>
               </div>
          </>
     )
}

export default NFound;