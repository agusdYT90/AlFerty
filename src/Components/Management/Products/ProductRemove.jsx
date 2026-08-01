
const ProductRemove = ({ producto, cerrar, guardar }) => {

     const Guardar = (e) => {
          e.preventDefault();
          guardar(producto);
          cerrar();
     };

     const Cerrar = () => {
          cerrar();
     };

     if (!producto) return null;

     return (
          <div className="modal-overlay">
               <form onSubmit={Guardar} className="modal-content">
                    <h2>Eliminar Producto</h2>
                    <h3>Estas seguro de elimnar el producto: {producto.nombre}</h3>
                    <div className="modal-buttons">
                         <button type="submit">Aceptar</button>
                         <button type="button" onClick={Cerrar}>Cancelar</button>
                    </div>
               </form>
          </div>
     );
};

export default ProductRemove;