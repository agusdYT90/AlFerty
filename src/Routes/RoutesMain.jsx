import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RoutesPriv from "../Hooks/UseRoutesPriv.jsx";
import RoutesPublic from "../Hooks/UseRoutesPublic.jsx";

function RoutesMain() {

     const RutasPublic = RoutesPublic();
     const RutasPriv = RoutesPriv();

     return (
          <Router>
               <ScrollToTop />
               <Routes>
                    <Route>
                         {[...RutasPublic, ...RutasPriv].map(({ Direccion, Elemento }) => (
                              <Route key={Direccion} path={Direccion} element={Elemento} />
                         ))}
                    </Route>
               </Routes>
          </Router>
     );
}

export default RoutesMain;