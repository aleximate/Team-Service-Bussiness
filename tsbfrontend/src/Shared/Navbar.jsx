import { Link } from "react-router-dom";
import "./Shared.css"
import logo from ".././assets/logo.png"
export const Navbar=()=>{
  const Links = [
    { path: "/", name: "Inicio" },
    { path: "/Tienda", name: "Tienda" },
    { path: "/Contacto", name: "Contacto" },
    { path: "/Nosotros", name: "Nosotros" },
    { path: "/Login", name:"Ingresar"}
  ];
  return (
    <header className="navbar-header">
      <nav className="navbar-header-1">
        <Link to="/">
          <img className="navbar-logo" src={logo} />
        </Link>
        <ul className="navbar-link">
          {Links.map((item, index) => (
            <li key={index}>
              <Link to={item.path} className="navbar-link-1">{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}