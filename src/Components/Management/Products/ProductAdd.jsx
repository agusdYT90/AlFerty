import { useState, useEffect } from "react";

const ProductAdd = ({ producto, cerrar, guardar }) => {
     const [Existe, setExiste] = useState(false);
     const [form, setForm] = useState({
          id: "",
          nombre: "",
          precio: "",
          cantidad: 0,
          imagen: "",
          descripcion: "",
          categoria: "",
          creado: new Date()
     });

     useEffect(() => {
          if (producto) {
               const existeProducto = producto.some(
                    (x) => x.nombre.toLowerCase() === form.nombre.toLowerCase()
               );
               if (existeProducto) {
                    setExiste(true);
               }
               else {
                    setExiste(false);
               }

          }
     }, [producto, form.nombre]);

     const handleChange = (x) => {
          const { name, value } = x.target;
          setForm((prev) => ({ ...prev, [name]: value }));
     };

     const Guardar = (e) => {
          e.preventDefault();
          if (Existe) {
               cerrar();
          }

          guardar({ ...producto, ...form });
          cerrar();
     };

     const Cerrar = () => {
          cerrar();
     };

     if (!producto) return null;

     return (
          <div className="modal-overlay">
               <form onSubmit={Guardar} className="modal-content">
                    <h2>Crear Producto</h2>
                    <label>
                         Nombre: {Existe && (<span>Ya existe</span>)}
                         <input type="text" placeholder="Nombre" name="nombre" value={form.nombre} onChange={handleChange} required />
                    </label>
                    <label>
                         Precio:
                         <input type="number" placeholder="Precio" name="precio" min="0" value={form.precio} onChange={handleChange} required />
                    </label>
                    <label>
                         Imagen:
                         <input type="text" placeholder="URL Imagen" name="imagen" value={form.imagen} onChange={handleChange} />
                    </label>
                    <label>
                         Descripción:
                         <textarea placeholder="Descripcion" name="descripcion" value={form.descripcion} onChange={handleChange} />
                    </label>
                    <label>
                         Categoria:
                         <input type="text" placeholder="Categoria" name="categoria" value={form.categoria} onChange={handleChange} />
                    </label>
                    <div className="modal-buttons">
                         <button type="submit">Guardar</button>
                         <button type="button" onClick={Cerrar}>Cancelar</button>
                    </div>
               </form>
          </div>
     );
};

export default ProductAdd;