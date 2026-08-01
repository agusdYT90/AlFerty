import { db } from "../FireBase";
import { doc, setDoc, getDoc, updateDoc, getDocs, collection } from "firebase/firestore";

export const guardarUsuario = async (user) => {
     try {
          const ref = doc(db, "usuarios", user.uid);
          const snap = await getDoc(ref);

          if (!snap.exists()) {
               await setDoc(ref, {
                    uid: user.uid,
                    email: user.email,
                    username: user.displayName || user.email.split('@')[0] || "",
                    imagen: user.photoURL || "",
                    admin: false,
                    creado: new Date()
               });
          }
     }
     catch (err) {
          console.error("Error al guardar usuario:", err);
     }
};

export const obtenerUsuario = async (uid) => {
     try {
          const ref = doc(db, "usuarios", uid);
          const snap = await getDoc(ref);
          return snap.exists() ? snap.data() : {};
     }
     catch (err) {
          console.error("Error al obtener usuario:", err);
          return {};
     }
};

export const obtenerTodosUsuarios = async () => {
     try {
          const ref = collection(db, "usuarios");
          const snap = await getDocs(ref);

          return snap.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
     } catch (error) {
          console.error("Error al obtener usuarios:", error);
          return [];
     }
};

export const actualizarUsuario = async (uid, data) => {
     try {
          const ref = doc(db, "usuarios", uid);
          await updateDoc(ref, data);
     }
     catch (err) {
          console.error("Error al actualizar usuario:", err);
     }
};

