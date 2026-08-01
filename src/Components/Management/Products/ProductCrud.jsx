import { useState, useMemo } from "react";
import { useProduct } from "../../../Hooks/UseContexts";
import { actualizarProducto, eliminarProducto, crearProducto } from "../../../Services/DB/Products";
import ProductUpdate from "./ProductUpdate";
import Loading from "../../../Utils/Loading";
import Search from "../../../Utils/Search";
import Pages from "../../../Utils/Pages";
import ProductAdd from "./ProductAdd";
import ProductRemove from "./ProductRemove";
//import "../../../Styles/Management/Products/";

function ProductCrud() {
     const { Productos, CargandoP, cargarProductos } = useProduct();
     const [productoSeleccionado, setProductoSeleccionado] = useState(null);
     const [Opcion, setOpcion] = useState(false);

     const [CrearP, setCrearP] = useState(false);
     const [EliminarP, setEliminarP] = useState(false);
     const [ActualizarP, setActualizarP] = useState(false);
     const [AvisosP, setAvisosP] = useState({ aviso: false, texto: "" });

     const [Buscar, setBuscar] = useState("");
     const ProductosFiltrados = useMemo(() => Search(Productos, Buscar), [Productos, Buscar]);
     const { PaginaActual, TotalPaginas, ItemsPaginados, CambiarPagina } = Pages({ items: ProductosFiltrados, ItemsPorPagina: 2 });

     const Actualizar = (x) => {
          if (!Opcion) {
               setProductoSeleccionado(x);
               setActualizarP(true);
               setOpcion(true);
          }
     }

     const Elimnar = (x) => {
          if (!Opcion) {
               setProductoSeleccionado(x);
               setEliminarP(true);
               setOpcion(true);
          }
     }

     const Crear = () => {
          if (!Opcion) {
               setCrearP(true);
               setOpcion(true);
          }
     }

     const Cerrar = () => {
          setProductoSeleccionado(null);
          setCrearP(false);
          setActualizarP(false);
          setEliminarP(false);
          setAvisosP({ aviso: false, texto: "" });
          setOpcion(false);
     }

     const Guardar = async (texto) => {
          await cargarProductos();
          setAvisosP({ aviso: true, texto });
     };

     const Avisos = () => (
          <div className="aviso-container">
               <div className="aviso">
                    <h2>Producto {AvisosP.texto} ✅</h2>
                    <button onClick={Cerrar}>Cerrar</button>
               </div>
          </div>
     );


     return (
          <>
               <Loading Texto={""} Duracion={1000} Condicion={CargandoP} completo={false}>
                    <div className="productos">
                         <h1>Productos</h1>
                         <input name="Producto" type="text" placeholder="Buscar producto..." value={Buscar} onChange={(e) => setBuscar(e.target.value)} className="input-busqueda" />

                         <div>
                              <button type="button" onClick={() => Crear()}>Crear</button>
                         </div>

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
                                        </div>
                                        <button onClick={() => Actualizar(x)}>
                                             Editar
                                        </button>
                                        <button onClick={() => Elimnar(x)}>
                                             Eliminar
                                        </button>
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

                    {CrearP && (
                         <ProductAdd producto={Productos} cerrar={() => Cerrar()} guardar={async (ProductoCreado) => {
                              await crearProducto(ProductoCreado);
                              Guardar("Creado");
                         }}
                         />
                    )}

                    {ActualizarP && (
                         <ProductUpdate producto={productoSeleccionado} cerrar={() => Cerrar()} guardar={async (productoActualizado) => {
                              await actualizarProducto(productoActualizado.id, productoActualizado);
                              Guardar("Actualizado");
                         }}
                         />
                    )}

                    {EliminarP && (
                         <ProductRemove producto={productoSeleccionado} cerrar={() => Cerrar()} guardar={async (productoEliminado) => {
                              await eliminarProducto(productoEliminado.id);
                              Guardar("Eliminado");
                         }}
                         />
                    )}

                    {AvisosP.aviso && (Avisos())}
               </Loading>
          </>
     );
}

export default ProductCrud;