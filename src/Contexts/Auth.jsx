import { useEffect, useState } from "react";
import { auth } from "../Services/FireBase";
import { onAuthStateChanged } from "firebase/auth";
import { SesionContext } from "../Contexts/Context";

export const AuthProvider = ({ children }) => {
     const [Usuario, setUsuario] = useState(null);
     const [CargandoA, setCargando] = useState(true);

     useEffect(() => {
          const unsub = onAuthStateChanged(auth, user => {
               setCargando(true);
               setUsuario(user);
               setTimeout(() => setCargando(false), 500);
          })
          return () => unsub();
     }, []);

     return (
          <>
               <SesionContext.Provider value={{ Usuario, CargandoA }}>
                    {children}
               </SesionContext.Provider>
          </>
     );
};
