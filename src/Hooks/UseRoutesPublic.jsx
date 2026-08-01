import NotFound from "../Pages/NotFound.jsx";
import Home from "../Pages/Home.jsx";
import Shop from "../Pages/Shop.jsx";

export default function RoutesPublic() {

     const Rutas = [];

     Rutas.push({ Direccion: "*", Elemento: <NotFound/> });
     Rutas.push({ Direccion: "/", Elemento: <Home/> });
     Rutas.push({ Direccion: "/shop", Elemento: <Shop/> });

     return Rutas;
}
