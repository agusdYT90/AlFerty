import { useState } from "react";
import { registrar, iniciarConGoogle } from "../../Services/Auth";
import { useNavigate } from "react-router-dom";

export default function FormRegistro() {
     const navigate = useNavigate();
     const [form, setForm] = useState({ email: "", password: "" });

     const handleChange = e => {
          const { name, value } = e.target;
          setForm(prev => ({ ...prev, [name]: value }));
     };

     const handleSubmit = async e => {
          e.preventDefault();
          await registrar(form.email, form.password);
          navigate("/");
     };

     return (
          <>
               <form onSubmit={handleSubmit}>
                    <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                    <input name="password" placeholder="Contraseña" type="password" value={form.password} onChange={handleChange} required />
                    <button type="submit">Registrarse</button>
               </form>
               
               <button onClick={() => iniciarConGoogle()}>Iniciar con Google</button>
          </>
     );
}
