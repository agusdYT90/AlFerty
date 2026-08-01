import { useEffect, useState } from "react";
import { obtenerProductos } from "../Services/DB/Products";
import { ProductoContext } from "../Contexts/Context";

export const ProductProvider = ({ children }) => {
     const [Productos, setProductos] = useState([]);
     const [CargandoP, setCargandoP] = useState(true);

     const cargarProductos = async () => {
          setCargandoP(true);
          const data = await obtenerProductos();

          const ordenados = data.sort((a, b) =>
               a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
          );

          setProductos(ordenados);
          setCargandoP(false);
     };

     useEffect(() => {
          cargarProductos();
     }, []);

     return (
          <ProductoContext.Provider value={{ Productos, CargandoP, cargarProductos }}>
               {children}
          </ProductoContext.Provider>
     );
};
