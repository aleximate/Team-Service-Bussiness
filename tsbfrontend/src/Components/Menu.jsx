import { useState, useEffect } from "react";
import { getAllTypes } from "../Api/TypeProducts";
import { Link } from "react-router-dom";

export const Menu = () => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(""); // Valor único seleccionado

  useEffect(() => {
    // Llama al método getAllTypes para obtener las opciones desde tu API
    getAllTypes()
      .then((response) => {
        // Extrae los datos de la respuesta de la API
        const data = response.data;
        // Actualiza el estado con las opciones obtenidas de la API
        setOptions(data);
      })
      .catch((error) => {
        console.error("Error al obtener opciones desde la API:", error);
      });
  }, []); // El segundo argumento vacío significa que este efecto se ejecutará solo una vez

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };

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
      <label>Selecciona un tipo de producto:</label>
      <select
        onChange={handleSelectChange}
        value={selectedOption} // Prop value para seleccionar una opción única
      >
        <option value="" disabled>
          Selecciona el tipo de producto
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <p>Tipo seleccionado: {selectedOption}</p>
    </div>
  );
};
