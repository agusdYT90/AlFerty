/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from "react";

const Pages = ({ items = [], ItemsPorPagina = 8 }) => {

     const [PaginaActual, setPaginaActual] = useState(1);

     const TotalPaginas = Math.max(1, Math.ceil(items.length / ItemsPorPagina));

     useEffect(() => {

          if (PaginaActual > TotalPaginas) {
               setPaginaActual(1);
          }

     }, [items, TotalPaginas]);

     const ItemsPaginados = useMemo(() => {
          const inicio = (PaginaActual - 1) * ItemsPorPagina;
          const fin = inicio + ItemsPorPagina;

          return items.slice(inicio, fin);

     }, [items, PaginaActual, ItemsPorPagina]);

     const CambiarPagina = (nuevaPagina) => {

          if (nuevaPagina >= 1 && nuevaPagina <= TotalPaginas) {
               setPaginaActual(nuevaPagina);
          }

     };

     return { PaginaActual, TotalPaginas, ItemsPaginados, CambiarPagina };
};

export default Pages;
