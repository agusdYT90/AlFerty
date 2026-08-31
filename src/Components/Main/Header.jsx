import { Link } from "react-router-dom";
import logo from "../../Assets/Imgs/Logo/AlFerty-Logo-Letras.webp";
import Nav from "./Nav";
import "../../Styles/Main/Header.css";

function Header({ Cambiar, Mostrar }) {

     return (
          <header className="header">
               <div className="header-container">

                    <Link to="/" className="logo">
                         <img src={logo} alt="AlFerty" className="limg" />
                    </Link>

                    <Nav />

                    <div type="button" className={`menu ${Mostrar ? "true" : "false"}`} onClick={() => Cambiar()}>
                         <span className="linea"></span>
                         <span className="linea"></span>
                         <span className="linea"></span>
                    </div>
               </div>
          </header>
     );
}

export default Header;