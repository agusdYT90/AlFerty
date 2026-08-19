import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Components/Main/Header.jsx";
import Footer from "../Components/Main/Footer.jsx";
import Sidebar from "../Components/Main/Sidebar.jsx";

function LayoutMain() {
     const [mostrar, setMostrar] = useState(false);
     const location = useLocation();

     const cambiar = () => setMostrar(prev => !prev);

     useEffect(() => {
          const handleResize = () => {
               if (window.innerWidth > 768 && mostrar) {
                    setMostrar(false);
               }
          };
          window.addEventListener("resize", handleResize);
          return () => window.removeEventListener("resize", handleResize);
     }, [mostrar]);

     useEffect(() => {
          setMostrar(false);
     }, [location]);

     return (
          <>
               <Header Cambiar={cambiar} Mostrar={mostrar} />
               <Sidebar Cambiar={cambiar} Mostrar={mostrar} />
               <Outlet />
               <Footer />
          </>
     );
}

export default LayoutMain;

