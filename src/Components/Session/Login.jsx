import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { iniciarSesion, iniciarConGoogle, RestablecerCon } from "../../Services/Auth.js";

export default function FormLogin() {
     const navigate = useNavigate();
     const [form, setForm] = useState({ email: "", password: "" });

     const handleChange = e => {
          const { name, value } = e.target;
          setForm(prev => ({ ...prev, [name]: value }));
     };

     const handleSubmit = async e => {
          e.preventDefault();
          const listo = await iniciarSesion(form.email, form.password);
          if (listo) {
               navigate("/");
          }
     };

     const Google = async () => {
          const listo = await iniciarConGoogle();
          if (listo) {
               navigate("/");
          }
     }

     return (
          <>
               <form onSubmit={handleSubmit}>
                    <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                    <input name="password" placeholder="Contraseña" type="password" value={form.password} onChange={handleChange} required />
                    <button type="submit">Iniciar sesión</button>
               </form>
          </>
     );
}
