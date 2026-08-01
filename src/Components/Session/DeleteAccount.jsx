import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reAutenticar, eliminarCuenta, SesionConProveedor } from "../../Services/Auth.js"
import { useAuth } from "../../Hooks/UseContexts.jsx";

export default function DeleteAccount() {
     const { Usuario } = useAuth();
     const navigate = useNavigate();
     const [password, setPassword] = useState("");
     const [Prov, setProv] = useState(false);

     const Eliminar = async (e) => {
          e.preventDefault();
          await reAutenticar(Usuario, password);
          const listo = await eliminarCuenta(Usuario);
          if (listo) {
               navigate("/");
          }
     };

     useEffect(() => {
          const detectarProveedor = async () => {
               const Google = await SesionConProveedor(Usuario);
               setProv(Google);
          };

          if (Usuario) {
               detectarProveedor();
          }

     }, [Usuario]);

     return (
          <>
               {Prov ? (
                    <button onClick={async () => {
                         await reAutenticar(Usuario);
                         await eliminarCuenta(Usuario);
                    }}>Eliminar cuenta con Google</button>
               ) :
               (
                    <form onSubmit={Eliminar}>
                         <input
                              type="password"
                              placeholder="Confirmá tu contraseña"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                         />
                         <button type="submit">Eliminar cuenta</button>
                    </form>
               )}
          </>
     );
};
