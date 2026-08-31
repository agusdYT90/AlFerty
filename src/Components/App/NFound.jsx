import { Link } from "react-router-dom";
import "../../Styles/App/NotFound.css";

function NFound() {

     return (
          <>
               <div className="not-found">
                    <div className="not-found-conteiner">
                         <div className="not-found-error">ERROR 404</div>
                         <div className="not-found-sub">Página no encontrada</div>
                         <Link to="/" className="not-found-link">Ir a Inicio</Link>
                    </div>
               </div>
          </>
     )
}

export default NFound;