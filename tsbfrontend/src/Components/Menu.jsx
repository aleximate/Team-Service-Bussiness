import { Link } from 'react-router-dom';


import "./Menu.css";

export const Menu = () => {
  return (
    <div>
      <h1>REGISTROS DE LA BASE DE DATOS</h1> 
      <ul>
        <li>
          <Link to="/lista/producto" className="menu-link">
            <div className="menu-button">
              <img src="/img/logo-productos.png" alt="Logo Productos" />
              <span>Productos</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/lista/persona" className="menu-link">
            <div className="menu-button">
              <img src="/img/logo-personas.png" alt="Logo Personas" />
              <span>Personas</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/lista/tipos" className="menu-link">
            <div className="menu-button">
              <img src="/img/logo-tipos.png" alt="Logo Tipos de Productos" />
              <span>Tipos de Productos</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};


