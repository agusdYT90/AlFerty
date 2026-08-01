import { useContext } from "react";
import { SesionContext, UsuarioContext, ProductoContext, CarritoContext, TUsuariosContext } from "../Contexts/Context.jsx";

export const useAuth = () => useContext(SesionContext);
export const useUser = () => useContext(UsuarioContext);
export const useProduct = () => useContext(ProductoContext);
export const useCart = () => useContext(CarritoContext);
export const useUsers = () => useContext(TUsuariosContext)