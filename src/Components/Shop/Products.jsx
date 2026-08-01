import { useState } from "react";
import { useCart, useProduct, useUser } from "../../Hooks/UseContexts";
import Repetidor from "../../Utils/Repetir";
import Loading from "../../Utils/Loading";
import Search from "../../Utils/Search";
import Pages from "../../Utils/Pages";
import "../../Styles/Shop/Products.css";

function Products() {
     const { Carrito, Agregar, Eliminar, EliminarTotal } = useCart();
     const { Productos, CargandoP } = useProduct();
     const { Data } = useUser();
     const [Buscar, setBuscar] = useState("");
     const ProductosFiltrados = Search(Productos, Buscar);
     const { PaginaActual, TotalPaginas, ItemsPaginados, CambiarPagina } = Pages({ items: ProductosFiltrados, ItemsPorPagina: 3 });

     return (
          <>
               <Loading Texto={""} Duracion={1000} Condicion={CargandoP} completo={false}>
                    <div className="productos">
                         <h1>Productos</h1>
                         <input type="text" placeholder="Buscar producto..." value={Buscar} onChange={(e) => setBuscar(e.target.value)} className="input-busqueda" />

                         <ul className="lista">

                              {ItemsPaginados.length === 0 && <p>No se encontraron productos</p>}

                              {ItemsPaginados.map((x) => (
                                   <li className="productos-container" key={x.id}>
                                        <div className="img-container">
                                             {(x.imagen === "") ? <p>Sin Imagen</p> : <img className="img" src={x.imagen} alt={x.nombre} />}
                                        </div>
                                        <div className="info">
                                             <h2>{x.nombre}</h2>
                                             <p>${x.precio}</p>
                                             <p>Cantidad: {Carrito.find(p => p.id === x.id)?.cantidad || 0}</p>
                                             <div className="productos-button">
                                                  <Repetidor onClick={() => Agregar(Data.uid, x)} delayInicial={600} delayMinimo={60} aceleracion={0.6}>Agregar</Repetidor>
                                                  <Repetidor onClick={() => Eliminar(Data.uid, x.id)} delayInicial={600} delayMinimo={60} aceleracion={0.6}>Eliminar</Repetidor>
                                                  <button type="button" onClick={() => EliminarTotal(Data.uid, x.id)}>EliminarTotal</button>
                                             </div>
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

export default Products;