import { useEffect, useState } from "react";
import { getAllProducts } from "../Api/Products";
import { getAllConsumers } from "../Api/Consumers";
import { Link, useParams } from "react-router-dom";
import { getAllTypes } from "../Api/TypeProducts";
import { Create } from "./Create";

export const List = () => {
  const { tipo } = useParams();
  const [data, setData] = useState([]);

  const fetchDataByType = {
    producto: getAllProducts,
    persona: getAllConsumers,
    tipos: getAllTypes,
  };

  const columnHeaders = {
    producto: ["ID", "Name", "Price", "On sale", "Type Product"],
    persona: ["ID", "Name", "Lastname", "Email", "Birthdate", "DNI"],
    tipos: ["ID", "Name"],
  };

  const customFields = {
    producto: ["id", "name", "price", "onSale", "typeProduct"],
    persona: ["id", "name", "lastName", "email", "birthDate", "dni"],
    tipos: ["id", "name"],
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
                  {field === "onSale"
                    ? item[field]
                      ? "En oferta"
                      : "No está en oferta"
                    : field === "typeProduct"
                    ? item.typeProduct.name // Aquí se muestra el nombre de typeProduct
                    : item[field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};
