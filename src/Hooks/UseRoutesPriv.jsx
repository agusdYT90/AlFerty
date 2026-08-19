import { useUser } from "./UseContexts";
import Session from "../Pages/Session";
import Management from "../Pages/Management";
import { Navigate } from "react-router-dom";

export default function RoutesPriv() {
     const { Data } = useUser();

     const Rutas = [];

     let session = Data.uid ? <Navigate to="/" /> : <Session />
     let management = Data.admin ? <Management /> : <Navigate to="/" />

     Rutas.push({ Direccion: "/session", Elemento: session });
     Rutas.push({ Direccion: "/management", Elemento: management });

     return Rutas;
}
