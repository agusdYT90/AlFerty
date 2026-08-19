import { Link } from "react-router-dom";
import logo from "../../assets/Imgs/AlFertronic.jpg";
import letralogo from "../../assets/Imgs/AlFerty.jpg";
import Nav from "./Nav";
import "../../Styles/Main/Header.css";

function Header({ Cambiar, Mostrar}) {

     return (
          <header className="header">
               <div className="header-container">

                    <Link to={"/"} className="logo">
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