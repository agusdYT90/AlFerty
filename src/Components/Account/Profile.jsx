import { useAuth, useUser } from "../../Hooks/UseContexts";
import { ActualizarEmail, cerrarSesion, RestablecerCon } from "../../Services/Auth";
import { actualizarUsuario } from "../../Services/DB/User";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteAccount from "../Session/DeleteAccount";
import "../../Styles/Account/Profile.css";

function Profile() {
     const { Data, cargarUsuario } = useUser();
     const navigate = useNavigate();
     const { Usuario } = useAuth();

     const [editandoNombre, setEditandoNombre] = useState(false);
     const [nuevoNombre, setNuevoNombre] = useState(Data.username);
     const [guardandoNombre, setGuardandoNombre] = useState(false);

     const [editandoImagen, setEditandoImagen] = useState(false);
     const [nuevaImagen, setNuevaImagen] = useState(Data.imagen);
     const [guardandoImagen, setGuardandoImagen] = useState(false);

     const proveedor = Usuario?.providerData?.[0]?.providerId;

     const guardarNombre = async () => {
          setGuardandoNombre(true);
          try {
               let nombreFinal = nuevoNombre.trim();

               if (!nombreFinal || nombreFinal.length < 5) {
                    const parteEmail = Data.email.split("@")[0];
                    nombreFinal = parteEmail;
                    setNuevoNombre(nombreFinal);
               }

               await actualizarUsuario(Data.uid, { username: nombreFinal });
               await cargarUsuario();
               setEditandoNombre(false);
          } catch (err) {
               console.error("Error al actualizar nombre:", err);
               cancelar();
          } finally {
               setGuardandoNombre(false);
          }
     };

     const guardarImagen = async () => {
          setGuardandoImagen(true);
          try {
               await actualizarUsuario(Data.uid, { imagen: nuevaImagen });
               await cargarUsuario();
               setEditandoImagen(false);
          } catch (err) {
               console.error("Error al actualizar imagen:", err);
               cancelar();
          } finally {
               setGuardandoImagen(false);
          }
     };

     const cancelar = async () => {
          setEditandoNombre(false);
          setEditandoImagen(false);
          setNuevaImagen(Data.imagen);
          setNuevoNombre(Data.username);
     }

     return (
          <div className="profile">
               <h1>Perfil de: {Data.username}</h1>

               <div className="profile-username">
                    <p><strong>Nombre:</strong></p>
                    {editandoNombre ? (
                         <>
                              <input type="text" value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)} />
                              <button onClick={() => guardarNombre()} disabled={guardandoNombre}>
                                   {guardandoNombre ? "Guardando..." : "Guardar"}
                              </button>
                              <button onClick={() => cancelar()}>Cancelar</button>
                         </>
                    ) : (
                         <>
                              <p>{Data.username}</p>
                              <button onClick={() => setEditandoNombre(true)}>Editar</button>
                         </>
                    )}
               </div>

               <div className="profile-email">
                    <p><strong>Correo:</strong> {Data.email}</p>
                    <button onClick={() => ActualizarEmail(Usuario, Data.email)}>Cambiar Email</button>
               </div>

               <div className="profile-password">
                    <button onClick={() => RestablecerCon(Data.email)}>Cambiar contraseña</button>
               </div>

               <div className="profile-image">
                    <p><strong>Imagen de perfil:</strong></p>
                    {editandoImagen ? (
                         <>
                              <input
                                   type="text"
                                   value={nuevaImagen}
                                   onChange={(e) => setNuevaImagen(e.target.value)}
                                   placeholder="URL de la nueva imagen"
                              />
                              <button onClick={guardarImagen} disabled={guardandoImagen}>
                                   {guardandoImagen ? "Guardando..." : "Guardar"}
                              </button>
                              <button onClick={cancelar}>Cancelar</button>
                         </>
                    ) : (
                         <>
                              {Data.imagen === "" ? (
                                   <p>Sin Imagen</p>
                              ) : (
                                   <img src={Data.imagen} alt="Profile" className="img-per" />
                              )}

                              {proveedor !== "google.com" ? (
                                   <button onClick={() => setEditandoImagen(true)}>Editar Imagen</button>
                              ) : (
                                   <p className="profile-warning">Imagen provista por Google, no editable</p>
                              )}
                         </>
                    )}
               </div>

               <div className="profile-close">
                    <button onClick={() => { const listo = cerrarSesion(); if (listo) { navigate("/"); } }} type="button">
                         Cerrar Sesión
                    </button>
               </div>

               <div className="profile-reauth">
                    <DeleteAccount />
               </div>
          </div>
     );
}

export default Profile;
