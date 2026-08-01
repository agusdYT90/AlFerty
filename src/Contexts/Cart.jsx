/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { obtenerCarritoDB, guardarCarritoDB } from "../Services/DB/Cart";
import { useProduct, useUser } from "../Hooks/UseContexts";
import { CarritoContext } from "../Contexts/Context";

export const CartProvider = ({ children }) => {
     const { Data } = useUser();
     const { Productos } = useProduct();
     const [Carrito, setCarrito] = useState([]);
     const [Total, setTotal] = useState(0);
     const [CargandoC, setCargando] = useState(true);
     const debounceTimeout = useRef(null);
     const prevCarrito = useRef([]);

     useEffect(() => {
          const cargar = async () => {
               if (Data?.uid) {
                    const carritoDB = await obtenerCarritoDB(Data.uid);

                    const carritoFiltrado = carritoDB
                         .filter(item => Productos.some(prod => prod.id === item.id))
                         .sort((a, b) =>
                              a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
                         );

                    setCarrito(carritoFiltrado);
               } else {
                    setCarrito([]);
               }
               setCargando(false);
          };

          if (Productos.length > 0) {
               cargar();
          }
     }, [Data, Productos]);

     useEffect(() => {
          if (!Data?.uid || CargandoC) return;

          if (JSON.stringify(prevCarrito.current) === JSON.stringify(Carrito)) return;

          if (debounceTimeout.current) {
               clearTimeout(debounceTimeout.current);
          }

          debounceTimeout.current = setTimeout(() => {
               guardarCarritoDB(Data.uid, Carrito);
               prevCarrito.current = Carrito;
          }, 2000);

          return () => clearTimeout(debounceTimeout.current);
     }, [Carrito]);

     useEffect(() => {
          const total = Carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
          setTotal(total);
     }, [Carrito]);

     const Agregar = (uid, producto) => {
          if (!uid) return;

          setCarrito((prev) => {
               const existe = prev.find((x) => x.id === producto.id);
               if (existe) {
                    return prev.map((x) =>
                         x.id === producto.id ? { ...x, cantidad: x.cantidad + 1 } : x
                    );
               }
               return [...prev, { ...producto, cantidad: 1 }];
          });
     };

     const Eliminar = (uid, id) => {
          if (!uid) return;

          setCarrito((prev) => {
               const item = prev.find((x) => x.id === id);
               if (!item) return prev;

               if (item.cantidad > 1) {
                    return prev.map((x) =>
                         x.id === id ? { ...x, cantidad: x.cantidad - 1 } : x
                    );
               }
               return prev.filter((x) => x.id !== id);
          });
     };

     const EliminarTotal = (uid, id) => {
          if (!uid) return;
          setCarrito((prev) => prev.filter((x) => x.id !== id));
     };

     const Vaciar = (uid) => {
          if (!uid) return;
          setCarrito([]);
     };

     return (
          <CarritoContext.Provider value={{ Carrito, Total, Agregar, Eliminar, Vaciar, EliminarTotal }}>
               {children}
          </CarritoContext.Provider>
     );
};
