import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createProducts } from "../Api/Products";
import { createConsumers } from "../Api/Consumers";
import { createTypes, getAllTypes } from "../Api/TypeProducts";

export const Create = () => {
  const { tipo } = useParams();
  const history = useNavigate();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const fetchDataByType = {
    producto: createProducts,
    persona: createConsumers,
    tipos: createTypes,
  };

  const allFields = {
    producto: ["name", "price", "onSale", "typeProduct"],
    persona: ["name", "lastName", "email", "birthDate", "dni"],
    tipos: ["name"],
  };

  const [formData, setFormData] = useState({});

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
  }, []);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSaleValue = formData.onSale === "true";

const handleTypeProductChange = (event) => {
  const selectedValue = event.target.value;
  setSelectedOption(selectedValue); // Actualiza la opción seleccionada en el estado

  // Agrega el ID del typeProduct al objeto formData
  setFormData({ ...formData, typeProduct: selectedValue });
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchDataFunction = fetchDataByType[tipo];
      if (!fetchDataFunction) {
        console.error("Tipo de entidad no válido:", tipo);
        return;
      }

      // Incluye "typeProductIds" en los datos que se envían en la solicitud POST solo si el tipo es "producto"
      const dataToSend =
        tipo === "producto" ? { ...formData, onSale: onSaleValue } : formData;
      const response = await fetchDataFunction(dataToSend);
      console.log(response);
      history(`/lista/${tipo}`);

      /*if (response.ok) {
        // Redirige a la página de lista después de crear el elemento
        history(`/lista/${tipo}`);
      } else {
        // Maneja errores si la solicitud no fue exitosa
        console.error("Error al crear el elemento:", response.statusText);
        // También puedes mostrar detalles adicionales del error si están disponibles en la respuesta.
        console.error("Detalles del error:", response.data); // Esto dependerá de la estructura de tu API
      }*/
    } catch (error) {
      console.error("Error al crear el elemento:", error.message);
    }
  };

  return (
    <div>
      <h1>
        Crear Nuevo{" "}
        {tipo === "producto"
          ? "Producto"
          : tipo === "persona"
          ? "Persona"
          : "Tipo"}
      </h1>
      <form onSubmit={handleSubmit}>
        {allFields[tipo].map((field) => (
          <div key={field}>
            {field === "typeProduct" && tipo === "producto" ? (
              // Campo de selección múltiple para "typeProduct" solo si el tipo es "producto"
              <div>
                <label>Tipo de producto:</label>
                <select
                  name="typeProduct" // Nombre del campo
                  onChange={handleTypeProductChange} // Usamos handleTypeProductChange aquí
                  value={selectedOption}
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
              </div>
            ) : field === "onSale" ? (
              // Campo de selección para "onSale" (En oferta / En stock)
              <div>
                <label>{field}: </label>
                <select
                  name={field}
                  value={formData[field]} // Valor predeterminado "En stock" (false)
                  onChange={handleFieldChange}
                >
                  <option value="" disabled>
                    Seleccionar
                  </option>
                  <option value="true">En oferta</option>
                  <option value="false">En stock</option>
                </select>
              </div>
            ) : (
              // Otros campos de texto
              <div>
                <label>{field}: </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleFieldChange}
                  required
                />
              </div>
            )}
          </div>
        ))}
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};
