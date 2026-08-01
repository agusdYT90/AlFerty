import { useState, useMemo } from "react";
import { useUser, useUsers } from "../../../Hooks/UseContexts";
import { actualizarUsuario } from "../../../Services/DB/User";
import Loading from "../../../Utils/Loading";
import Search from "../../../Utils/Search";
import Pages from "../../../Utils/Pages";
import "../../../Styles/App/Loading.css"
import "../../../Styles/Management/Users/UserCrud.css";

function UserCrud() {
     const { TUsuarios, CargandoTU, cargarUsuarios } = useUsers();
     const { Data } = useUser();

     const [actualizandoAdminId, setActualizandoAdminId] = useState(null);

     const [Buscar, setBuscar] = useState("");
     const UsuariosFiltrados = useMemo(() => Search(TUsuarios, Buscar), [TUsuarios, Buscar]);
     const { PaginaActual, TotalPaginas, ItemsPaginados, CambiarPagina } = Pages({ items: UsuariosFiltrados, ItemsPorPagina: 24 });

     return (
          <>
               <Loading Texto={""} Duracion={1000} Condicion={CargandoTU} completo={false}>
                    <div className="usuarios">
                         <h1>Usuarios</h1>
                         <input name="Usuario" type="text" placeholder="Buscar usuario..." value={Buscar} onChange={(e) => setBuscar(e.target.value)} className="input-busqueda" />

                         <ul className="lista">

                              {ItemsPaginados.length === 0 && <p>No se encontraron usuarios</p>}

                              {ItemsPaginados.filter((x) => x.uid !== Data.uid).map((x) => (
                                   <li className="usuarios-container" key={x.id}>
                                        <div className="info">
                                             {(x.imagen === "") ? <p>Sin Imagen</p> : <img src={x.imagen} alt="Account" className="img-per" />}
                                             <h2>{x.username}</h2>
                                             <h3>{x.email}</h3>
                                             <p>{x.creado.toDate().toLocaleDateString()}</p>
                                             <p className="usuarios-button">Es admin:
                                                  <input type="checkbox" checked={x.admin} disabled={actualizandoAdminId === x.id} onChange={async (e) => {
                                                       const nuevoValor = e.target.checked;
                                                       setActualizandoAdminId(x.id);

                                                       try {
                                                            await actualizarUsuario(x.id, { admin: nuevoValor });
                                                            await cargarUsuarios();
                                                       } catch (error) {
                                                            console.error("Error al actualizar rol admin:", error);
                                                       } finally {
                                                            setActualizandoAdminId(null);
                                                       }
                                                  }}
                                                  />
                                             </p>
                                        </div>
                                   </li>
                              ))}
                         </ul>
                    </div>

                    {TotalPaginas > 1 && (
                         <div className="paginador">
                              {PaginaActual > 1 && (
                                   <button onClick={() => CambiarPagina(PaginaActual - 1)}>
                                        ◀ Anterior
                                   </button>
                              )}

                              {Array.from({ length: TotalPaginas }, (_, index) => (
                                   <button key={index + 1} onClick={() => CambiarPagina(index + 1)} disabled={PaginaActual === index + 1}>
                                        {index + 1}
                                   </button>
                              ))}

                              {PaginaActual < TotalPaginas && (
                                   <button onClick={() => CambiarPagina(PaginaActual + 1)}>
                                        Siguiente ▶
                                   </button>
                              )}
                         </div>
                    )}
               </Loading>
          </>
     );
}

export default UserCrud;