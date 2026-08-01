import { db } from "../FireBase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

const productosRef = collection(db, "productos");

export const crearProducto = async (data) => {
     try {
          const snap = await getDocs(productosRef);
          const exists = snap.docs.some(doc => doc.data().nombre === data.nombre);

          if (!exists) {
               await addDoc(productosRef, {
                    nombre: data.nombre,
                    precio: data.precio,
                    cantidad: 0,
                    imagen: data.imagen || "",
                    descripcion: data.descripcion || "Vacio",
                    categoria: data.categoria || "General",
                    creado: new Date(),
               });
          }
     }
     catch (err) {
          console.error("Error al crear producto:", err);
     }
};

export const obtenerProductos = async () => {
     try {
          const snap = await getDocs(productosRef);
          return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
     }
     catch (err) {
          console.error("Error al obtener productos:", err);
          return [];
     }
};

export const actualizarProducto = async (id, data) => {
     try {
          const ref = doc(db, "productos", id);
          await updateDoc(ref, data);
     }
     catch (err) {
          console.error("Error al actualizar producto:", err);
     }
};

export const eliminarProducto = async (id) => {
     try {
          const ref = doc(db, "productos", id);
          await deleteDoc(ref);
     }
     catch (err) {
          console.error("Error al eliminar producto:", err);
     }
};
