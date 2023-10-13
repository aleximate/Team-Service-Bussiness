import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTypeById } from "../Api/TypeProducts";
import { getConsumerById } from "../Api/Consumers";
import { updateConsumer } from "../Api/Consumers";
import { updateType } from "../Api/TypeProducts";

export const Update = () => {
  const { tipo, itemId } = useParams();
  const history = useNavigate();
  const [formData, setFormData] = useState({});
  const [elementData, setElementData] = useState({});

const columnHeaders = {
  tipos: ["Nombre"],
  trabajador: [
    "Nombre",
    "Apellido",
    "Email",
    "Fecha de Nacimiento",
    "DNI",
    "Contraseña",
  ],
};

const allFields = {
  tipos: ["name"],
  trabajador: ["name", "lastName", "email", "birthDate", "dni", "password"],
};

  useEffect(() => {
    const fetchDataByType = {
      tipos: getTypeById,
      trabajador: getConsumerById,
    };

    if (itemId) {
      const fetchDataFunction = fetchDataByType[tipo];
      if (fetchDataFunction) {
        fetchDataFunction(itemId)
          .then((response) => {
            setElementData(response.data);
            setFormData(response.data);
          })
          .catch((error) => {
            console.error("Error al obtener los datos del elemento:", error);
          });
      } else {
        console.error("Tipo de entidad no válido:", tipo);
      }
    }
  }, [tipo, itemId]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateFunctionByType = {
        tipos: updateType,
        trabajador: updateConsumer,
      };
      if (!updateFunctionByType[tipo]) {
        console.error("Tipo de entidad no válido:", tipo);
        return;
      }

      const response = await updateFunctionByType[tipo](itemId, formData);
      console.log("Elemento actualizado:", response);
      history(`/lista/${tipo}`);
    } catch (error) {
      console.error("Error al actualizar el elemento:", error.message);
    }
  };

  return (
    <div>
      <h2>Editar {tipo === "tipos" ? "Tipos" : "Trabajador"}</h2>
      <form onSubmit={handleSubmit}>
        {columnHeaders[tipo]
          ? columnHeaders[tipo].map((header, index) => (
              <div key={index}>
                <label>{header}:</label>
                <input
                  type="text"
                  name={allFields[tipo][index]}
                  value={formData[allFields[tipo][index]] || ""}
                  onChange={handleFieldChange}
                />
              </div>
            ))
          : null}
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};