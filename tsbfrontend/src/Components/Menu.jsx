import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop } from "@fortawesome/free-solid-svg-icons";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import "./Menu.css";

export const Menu = () => {
  return (
    <div>
      <h1>REGISTROS DE LA BASE DE DATOS</h1>
      <ul>
        <li>
          <Link to="/lista/producto" className="menu-link">
            <div className="menu-button">
              <FontAwesomeIcon icon={faShop} className="icon" />
              <span>Productos</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/lista/persona" className="menu-link">
            <div className="menu-button">
              <FontAwesomeIcon icon={faPerson} className="icon" />
              <span>Personas</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/lista/tipos" className="menu-link">
            <div className="menu-button">
              <FontAwesomeIcon icon={faFilter} className="icon" />
              <span>Tipos de Productos</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};
