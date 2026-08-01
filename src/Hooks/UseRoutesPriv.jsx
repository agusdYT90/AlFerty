import { useUser } from "./UseContexts";
import Session from "../Pages/Session";
import Management from "../Pages/Management";
import Account from "../Pages/Account";
import { Navigate } from "react-router-dom";

export default function RoutesPriv() {
     const { Data } = useUser();

     const Rutas = [];

     let session = Data.uid ? <Navigate to="/account" /> : <Session />
     let management = Data.admin ? <Management /> : <Navigate to="/" />
     let account = Data.uid ? <Account /> : <Navigate to="/session" />

     Rutas.push({ Direccion: "/session", Elemento: session });
     Rutas.push({ Direccion: "/management", Elemento: management });
     Rutas.push({ Direccion: "/account", Elemento: account });

     return Rutas;
}
