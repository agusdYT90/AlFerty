/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { obtenerUsuario } from "../Services/DB/User";
import { useAuth } from "../Hooks/UseContexts";
import { UsuarioContext } from "../Contexts/Context";

export const UserProvider = ({ children }) => {
     const { Usuario } = useAuth();
     const [Data, setData] = useState({});
     const [CargandoU, setCargando] = useState(true);

     let intentos = 0;

     const cargarUsuario = async () => {
          setCargando(true);

          if (!Usuario?.uid) {
               setData({});
               setCargando(false);
               return;
          }

          const data = await obtenerUsuario(Usuario.uid);

          if (!data?.uid && intentos < 5) {
               intentos++;
               setTimeout(cargarUsuario, 500);
               return;
          }

          setData(data);
          setCargando(false);
     };

     useEffect(() => {
          cargarUsuario();
     }, [Usuario]);

     return (
          <UsuarioContext.Provider value={{ Data, CargandoU, cargarUsuario }}>
               {children}
          </UsuarioContext.Provider>
     );
};

