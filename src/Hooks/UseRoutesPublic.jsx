import Home from "../Pages/Home.jsx";

export default function RoutesPublic() {

     const Rutas = [];

     Rutas.push({ Direccion: "/", Elemento: <Home/> });

     return Rutas;
}
