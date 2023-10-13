import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react"; // Importa useState y useEffect
import "./Shared.css";
import logo from ".././assets/logo.png";

export const Navbar = () => {
  const Links = [
    { path: "/", name: "Inicio" },
    { path: "/Tienda", name: "Tienda" },
    { path: "/Contacto", name: "Contacto" },
    { path: "/Nosotros", name: "Nosotros" },
    { path: "/Login", name: "Ingresar" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeMenu = () => {
      setMenuOpen(false);
    };

    if (menuOpen) {
      window.addEventListener("click", closeMenu);
    } else {
      window.removeEventListener("click", closeMenu);
    }

    return () => {
      window.removeEventListener("click", closeMenu);
    };
  }, [menuOpen]);

  return (
    <header className="navbar-header">
      <nav className="navbar-header-1">
        <Link to="/">
          <img className="navbar-logo" src={logo} alt="Logo" />
        </Link>
        <div
          className={`menu-icon ${menuOpen ? "open" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <ul className={`navbar-link ${menuOpen ? "open" : ""}`}>
          {Links.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="navbar-link-1"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
