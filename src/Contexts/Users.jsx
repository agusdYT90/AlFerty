/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { obtenerTodosUsuarios } from "../Services/DB/User";
import { TUsuariosContext } from "../Contexts/Context";
import { useUser } from "../Hooks/UseContexts";

export const UsersProvider = ({ children }) => {
     const [TUsuarios, setTUsuarios] = useState([]);
     const [CargandoTU, setCargandoTU] = useState(true);
     const { Data } = useUser();

     const cargarUsuarios = async () => {
          if (Data.admin) {
               setCargandoTU(true);
               const data = await obtenerTodosUsuarios();

               const ordenados = data.sort((a, b) =>
                    a.username.localeCompare(b.username, 'es', { sensitivity: 'base' })
               );

               setTUsuarios(ordenados);
               setCargandoTU(false);
          };
     }

     useEffect(() => {
          cargarUsuarios();
     }, []);

     return (
          <TUsuariosContext.Provider value={{ TUsuarios, CargandoTU, cargarUsuarios }}>
               {children}
          </TUsuariosContext.Provider>
     );
};
