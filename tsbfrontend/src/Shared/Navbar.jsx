import { Link } from "react-router-dom";
import "./Shared.css"
export const Navbar=()=>{
  const Links = [
    { path: "/", name: "Inicio" },
    { path: "/Tienda", name: "Tienda" },
    { path: "/Contacto", name: "Contacto" },
    { path: "/Nosotros", name: "Nosotros" }
  ];
  return (
    <header className="navbar-header">
      <nav className="navbar-header-1">
        <Link to="/" className="navbar-logo">
          <img className="navbar-img" src=""/>
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