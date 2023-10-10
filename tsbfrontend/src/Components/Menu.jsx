import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop } from "@fortawesome/free-solid-svg-icons";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import "./Menu.css";

export const Menu = () => {
  return (
    <div className="menu-container">
      <h1 className="menu-title">REGISTROS DE LA BASE DE DATOS</h1>
      <ul className="menu-list">
        <li className="menu-item">
          <Link to="/lista/producto" className="menu-link">
            <div className="menu-button menu-product">
              <FontAwesomeIcon icon={faShop} className="icon menu-icon" />
              <span className="menu-text">Productos</span>
            </div>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/lista/persona" className="menu-link">
            <div className="menu-button menu-person">
              <FontAwesomeIcon icon={faPerson} className="icon menu-icon" />
              <span className="menu-text">Personas</span>
            </div>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/lista/tipos" className="menu-link">
            <div className="menu-button menu-tipos">
              <FontAwesomeIcon icon={faFilter} className="icon menu-icon" />
              <span className="menu-text">Tipos de Productos</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};
