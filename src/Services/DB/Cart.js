import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../FireBase";

const getCartRef = (uid) => doc(db, "carritos", uid);

export const obtenerCarritoDB = async (uid) => {
     try {
          const ref = getCartRef(uid);
          const snap = await getDoc(ref);
          return snap.exists() ? [...(snap.data().items)] : [];
     } catch (err) {
          console.error("Error al obtener carrito:", err);
          return [];
     }
};

export const guardarCarritoDB = async (uid, carrito) => {
     try {
          const ref = getCartRef(uid);
          await setDoc(ref, { items: carrito });
     } catch (err) {
          console.error("Error al guardar carrito:", err);
     }
};
