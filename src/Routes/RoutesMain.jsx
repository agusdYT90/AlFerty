import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "../Pages/NotFound.jsx";
import LayoutMain from "../Layouts/LayoutMain.jsx";
import RoutesPublic from "../Hooks/UseRoutesPublic.jsx";

function RoutesMain() {
     const RutasPublic = RoutesPublic();

     return (
          <Router>
               <Routes>
                    <Route element={<LayoutMain />}>
                         {RutasPublic.map(({ Direccion, Elemento }) => (
                              <Route key={Direccion} path={Direccion} element={Elemento} />
                         ))}
                    </Route>

                    <Route path="*" element={<NotFound/>}></Route>
               </Routes>
          </Router>
     );
}

export default RoutesMain;
