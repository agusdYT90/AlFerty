import { useUser } from "./UseContexts";

export default function RoutesNav() {
     const { Data } = useUser();

     const Rutas = [
          { Direccion: "/", Class: "Link", Texto: "Inicio" },
          { Direccion: "/shop", Class: "Link", Texto: "Tienda" },
     ];

     if (!Data.uid) {

          Rutas.push({ Direccion: "/session", Class: "Link", Texto: "Iniciar Sesion" });

     } else {

          if (Data.admin) {
               Rutas.push({ Direccion: "/management", Class: "Link", Texto: "Gestion" });
          }

          Rutas.push({ Direccion: "/account", Class: (Data.imagen === "") ? "Link" : "" , Texto: (Data.imagen === "") ? Data.username : <img src={Data.imagen} alt="Account" className="img-perfil" /> });
     }

     return Rutas;
}
