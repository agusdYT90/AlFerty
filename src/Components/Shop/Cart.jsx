import { useCart, useProduct, useUser } from "../../Hooks/UseContexts";
import Repetidor from "../../Utils/Repetir";
import Loading from "../../Utils/Loading";
import "../../Styles/Shop/Card.css";

function Cart() {

     const { Carrito, Total, Agregar, Eliminar, EliminarTotal, Vaciar } = useCart();
     const { Data } = useUser();
     const { CargandoP } = useProduct();

     return (
          <Loading Texto={""} Duracion={1000} Condicion={CargandoP} completo={false}>

               <div className="carrito">

                    <div className="card-carrito">
                         <h1>Carrito</h1>

                         <ul className="carrito-container">
                              {Carrito.length == 0 && <h2>No hay productos en el carrito</h2>}

                              {Carrito.map((x) => (

                                   <li className="lista" key={x.id}>

                                        <div className="img-cointainer">
                                             {(x.imagen === "") ? <p>Sin Imagen</p> : <img className="img" src={x.imagen} alt={x.nombre} />}
                                        </div>

                                        <div className="info">
                                             <h2>{x.nombre}</h2>
                                             <p>${x.precio}</p>
                                             <p>Cantidad: {x.cantidad}</p>
                                             <Repetidor onClick={() => Agregar(Data.uid, x)} delayInicial={600} delayMinimo={60} aceleracion={0.6}>Agregar</Repetidor>
                                             <Repetidor onClick={() => Eliminar(Data.uid, x.id)} delayInicial={600} delayMinimo={60} aceleracion={0.6}>Eliminar</Repetidor>
                                             <button type="button" onClick={() => EliminarTotal(Data.uid, x.id)}>EliminarTotal</button>
                                        </div>
                                   </li>
                              ))}
                         </ul>

                         {Carrito.length > 0 &&
                              <div className="total">
                                   <h2>Total: ${Total}</h2>
                                   <button type="button" onClick={() => Vaciar(Data.uid)}>Comprar</button>
                                   <button type="button" onClick={() => Vaciar(Data.uid)}>Vaciar Carrito</button>
                              </div>
                         }

                    </div>

               </div>
          </Loading>
     );
}

export default Cart;