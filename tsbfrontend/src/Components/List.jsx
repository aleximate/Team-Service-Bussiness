import { useEffect, useState } from "react";
import { deleteProduct, getAllProducts } from "../Api/Products";
import { deleteConsumer, getAllConsumers } from "../Api/Consumers";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteType, getAllTypes } from "../Api/TypeProducts";

export const List = () => {
  const { tipo } = useParams();
  const [data, setData] = useState([]);
  const history = useNavigate();
  const [selectedItemId, setSelectedItemId] = useState(null);

  const fetchDataByType = {
    producto: getAllProducts,
    persona: getAllConsumers,
    tipos: getAllTypes,
  };

  const fetchDeleteByType = {
    producto: deleteProduct,
    persona: deleteConsumer,
    tipos: deleteType,
  };

  const columnHeaders = {
    producto: ["ID", "Name", "Price", "On sale", "Type Product", "Acciones"],
    persona: [
      "ID",
      "Name",
      "Lastname",
      "Email",
      "Birthdate",
      "DNI",
      "Acciones",
    ],
    tipos: ["ID", "Name", "Acciones"],
  };
  const handleEdit = (itemId) => {
    setSelectedItemId(itemId);
    history.push(`/update/${tipo}`);
  };

  const customFields = {
    producto: ["id", "name", "price", "onSale", "typeProduct", "actions"], // Asegúrate de que "actions" esté aquí
    persona: ["id", "name", "lastName", "email", "birthDate", "dni", "actions"], // Asegúrate de que "actions" esté aquí
    tipos: ["id", "name", "actions"], // Asegúrate de que "actions" esté aquí
  };
  const handleDelete = async (itemId) => {
    try {
      const deleteFunction = fetchDeleteByType[tipo];
      if (deleteFunction) {
        await deleteFunction(itemId);
        // Actualiza la lista después de eliminar el elemento
        setData((prevData) => prevData.filter((item) => item.id !== itemId));
      } else {
        console.error(
          "No se encontró una función de eliminación para el tipo:",
          tipo
        );
      }
    } catch (error) {
      console.error("Error al eliminar el elemento:", error);
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const fetchDataFunction = fetchDataByType[tipo];
        if (fetchDataFunction) {
          const response = await fetchDataFunction();
          setData(response.data);
        } else {
          console.error("Tipo de lista no válido:", tipo);
        }
      } catch (error) {
        console.error("Error al cargar la lista:", error);
      }
    }

    fetchData();
  }, [tipo]);

  return (
    <div>
      <Link to={`/menu`}>REGRESAR</Link>
      <Link to={`/create/${tipo}`}>Crear Nuevo</Link>
      <h1>
        Lista de{" "}
        {tipo === "producto"
          ? "Productos"
          : tipo === "persona"
          ? "Personas"
          : "Tipos"}
      </h1>
      <table>
        <thead>
          <tr>
            {columnHeaders[tipo].map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {customFields[tipo].map((field) => (
                <td key={field}>
                  {field === "onSale" ? (
                    item[field] ? (
                      "En oferta"
                    ) : (
                      "No está en oferta"
                    )
                  ) : field === "typeProduct" ? (
                    item.typeProduct.name
                  ) : field === "actions" ? (
                    <>
                      <button onClick={() => handleEdit(item.id)}>Editar</button>
                      <button onClick={() => handleDelete(item.id)}>
                        Eliminar
                      </button>
                    </>
                  ) : (
                    item[field]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
