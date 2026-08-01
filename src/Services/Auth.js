import { auth, db } from "./FireBase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, deleteUser, signOut, EmailAuthProvider, reauthenticateWithCredential, reauthenticateWithPopup, sendEmailVerification, sendPasswordResetEmail, updateEmail } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { guardarUsuario } from "./DB/User";

const googleProvider = new GoogleAuthProvider();

export const registrar = async (email, password) => {
     const cred = await createUserWithEmailAndPassword(auth, email, password);
     await guardarUsuario(cred.user);
     return true;
};

export const iniciarSesion = async (email, password) => {
     await signInWithEmailAndPassword(auth, email, password);
     return true;
};

export const iniciarConGoogle = async () => {
     const cred = await signInWithPopup(auth, googleProvider);
     await guardarUsuario(cred.user);
     return true;
};

export const reAutenticar = async (user, password = null) => {
     try {
          const proveedor = user.providerData[0]?.providerId;

          if (proveedor === 'google.com') {
               const googleProvider = new GoogleAuthProvider()
               return await reauthenticateWithPopup(user, googleProvider)
          }

          if (proveedor === 'password' && password) {
               const credential = EmailAuthProvider.credential(user.email, password)
               return await reauthenticateWithCredential(user, credential)
          }

          console.alert('No se puede reautenticar: proveedor desconocido o falta contraseña')
     }
     catch (err) {
          console.alert("Error al Re-Autenticar:", err);
     }
};

export const SesionConProveedor = async (user) => {
     try {
          const proveedor = user.providerData[0]?.providerId;

          if (proveedor === 'google.com') {
               return true
          }

          if (proveedor === 'password') {
               return false
          }

          console.alert('Proveedor desconocido')
     }
     catch (err) {
          console.alert("Error al conocer el proveedor:", err);
     }
};

export const VerificarGmail = async (user) => {
     await sendEmailVerification(user);
}

export const RestablecerCon = async (email) => {
     await sendPasswordResetEmail(auth, email);
}

export const ActualizarEmail = async (user, email) => {
     await updateEmail(user, email);
}

export const cerrarSesion = () => {
     signOut(auth);
     return true;
};

export const eliminarCuenta = async (user) => {
     try {
          if (user) {
               await deleteDoc(doc(db, "usuarios", user.uid));
               await deleteDoc(doc(db, "carritos", user.uid));
               await deleteUser(user);
               return true;
          }
     }
     catch (err) {
          console.alert("Error al eliminar cuenta:", err);
     }
};
