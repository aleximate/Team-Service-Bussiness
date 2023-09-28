import { Link } from "react-router-dom";

export const Menu = () => {


  return (
    <div>
      <ul>
        <li>
          <Link to="/lista/producto">Productos</Link>
        </li>
        <li>
          <Link to="/lista/persona">Personas</Link>
        </li>
        <li>
          <Link to="/lista/tipos">Tipos de Productos </Link>
        </li>
      </ul>
      
    </div>
  );
};
