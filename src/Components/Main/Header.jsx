import logo from "../../assets/Imgs/Logo (Signo).webp";
import letralogo from "../../assets/Imgs/Logo (Letras).webp";
import { Link } from "react-router-dom";
import { UpScroll } from "../../Hooks/UseScroll";
import Nav from "./Nav";
import "../../Styles/Main/Header.css";

function Header({ Cambiar, Mostrar}) {

     return (
          <header className="header">
               <div className="header-container">

                    <Link to={"/"} className="logo" onClick={UpScroll}>
                         <img src={logo} alt="AgusCom-Logo" className="l1" />
                         <img src={letralogo} alt="AgusCom-Logo" className="l2" />
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