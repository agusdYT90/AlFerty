
const normalizar = (texto) =>
     texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const Search = (items, buscar) => {
     if (!buscar?.trim()) return items;

     const textoBuscar = normalizar(buscar);

     return items.filter((x) =>
          normalizar(x.nombre || x.username).includes(textoBuscar)
     );
};

export default Search;