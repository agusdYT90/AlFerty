/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "../Styles/App/Loading.css";

const Loading = ({ children, Condicion, completo, Texto, Duracion = 500 }) => {
     const [mostrarContenido, setMostrarContenido] = useState(false);

     useEffect(() => {
          let timer;

          if (Condicion) {
               setMostrarContenido(false);
          } else {
               timer = setTimeout(() => {
                    setMostrarContenido(true);
               }, Duracion);
          }

          return () => clearTimeout(timer);
     }, [Condicion]);

     if (!mostrarContenido) {
          return (
               <div className={`loading-container ${completo ? "Completo" : "Linea"}`}>
                    <div className="loading-spinner" />
                    {Texto && <span className="loading-Texto">{Texto}</span>}
               </div>
          );
     }

     return children;
};

export default Loading;

