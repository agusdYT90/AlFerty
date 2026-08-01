/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

const ProductUpdate = ({ producto, cerrar, guardar }) => {
     const [form, setForm] = useState({
          id: "",
          nombre: "",
          precio: 0,
          cantidad: 0,
          imagen: "",
          descripcion: "",
          categoria: "",
          creado: new Date()
     });

     const ValoresIniciales = {
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: 0,
          imagen: producto.imagen,
          descripcion: producto.descripcion,
          categoria: producto.categoria,
          creado: new Date()
     }

     useEffect(() => {
          if (producto) {
               setForm(ValoresIniciales);
          }
     }, [producto]);

     const handleChange = (x) => {
          const { name, value } = x.target;
          setForm((prev) => ({ ...prev, [name]: value }));
     };

     const Guardar = (e) => {
          e.preventDefault();
          guardar({ ...producto, ...form });
          cerrar();
     };

     const Cerrar = () => {
          setForm(ValoresIniciales);
          cerrar();
     };

     if (!producto) return null;

     return (
          <div className="modal-overlay">
               <form onSubmit={Guardar} className="modal-content">
                    <h2>Editar Producto</h2>
                    <label>
                         Nombre:
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

export default ProductUpdate;
