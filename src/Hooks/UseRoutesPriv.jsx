import { Navigate } from "react-router-dom";
import Session from "../Pages/Session";
import Management from "../Pages/Management";

export default function RoutesPriv() {

     const Rutas = [];

     let session = <Session />
     let management = <Navigate to="/" />

     Rutas.push({ Direccion: "/session", Elemento: session });
     Rutas.push({ Direccion: "/management", Elemento: management });

     return Rutas;
}
