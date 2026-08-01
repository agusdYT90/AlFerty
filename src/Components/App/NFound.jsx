import { Link } from "react-router-dom";
import "../../Styles/App/NotFound.css";

function NFound() {

     return (
          <>
               <div className="not-found">
                    <div className="not-found-container">
                         <div className="not-found-container2">
                              <h2 className="not-found-error">ERROR 404</h2>
                              <h3 className="not-found-sub">Página no encontrada</h3>
                              <p className="not-found-text">La página que buscas no existe.</p>
                              <Link to="/" className="not-found-link">Ir a Inicio</Link>
                         </div>
                    </div>
               </div>
          </>
     )
}

export default NFound;