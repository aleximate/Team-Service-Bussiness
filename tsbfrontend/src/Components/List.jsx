import { useEffect, useState } from "react";
import { deleteProduct, getAllProducts } from "../Api/Products";
import { deleteConsumer, getAllConsumers } from "../Api/Consumers";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteType, getAllTypes } from "../Api/TypeProducts";
import Swal from "sweetalert2";
import "./List.css";
 
export const List = () => {
  const { tipo } = useParams();
  const [data, setData] = useState([]);
  const history = useNavigate();
  const [selectedItemId, setSelectedItemId] = useState(null);

  const fetchDataByType = {
    producto: getAllProducts,
    trabajador: getAllConsumers,
    tipos: getAllTypes,
  };

  const fetchDeleteByType = {
    producto: deleteProduct,
    trabajador: deleteConsumer,
    tipos: deleteType,
  };

  const columnHeaders = {
    producto: [
      "ID",
      "Nombre",
      "Precio",
      "Estado",
      "Tipo de Producto",
      "Imagen",
      "Acciones",
    ],
    trabajador: [
      "ID",
      "Nombre",
      "Apellido",
      "Email",
      "Fecha de nacimiento",
      "DNI",
      "Acciones",
    ],
    tipos: ["ID", "Nombre", "Acciones"],
  };
  const handleEdit = (itemId) => {
    setSelectedItemId(itemId);
    if (tipo === "producto") {
      history(`/actualizar/${itemId}`);
    } else {
      history(`/actualizar/${tipo}/${itemId}`);
    }
  };

  const customFields = {
    producto: [
      "id",
      "name",
      "price",
      "onSale",
      "typeProduct",
      "image",
      "actions",
    ],
    trabajador: [
      "id",
      "name",
      "lastName",
      "email",
      "birthDate",
      "dni",
      "actions",
    ],
    tipos: ["id", "name", "actions"],
  };

  const isImageColumnVisible = tipo === "producto";

  const handleDelete = async (itemId) => {
    try {
      const deleteFunction = fetchDeleteByType[tipo];
      if (deleteFunction) {
        const result = await Swal.fire({
          title: "¿Estas seguro de eliminar?",
          text: "No podras recuperar los datos",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, eliminar",
        });

        if (result.isConfirmed) {
          // Ejecuta la función de eliminación si el usuario confirma
          await deleteFunction(itemId);
          // Actualiza la lista después de eliminar el elemento
          setData((prevData) => prevData.filter((item) => item.id !== itemId));

          // Muestra un mensaje de éxito
          Swal.fire(
            "Eliminado",
            "Tu item ha sido eliminado",
            "Satisfactoriamente"
          );
        }
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
    <div className="contenedor">
      <h1 className="titulo">
        Lista de{" "}
        {tipo === "producto"
          ? "Productos"
          : tipo === "trabajador"
          ? "Trabajador"
          : "Tipos"}
      </h1>
      <div className="contenedor-boton">
        <Link to={`/menu`} className="boton-personalizado enlace-atras">
          REGRESAR
        </Link>
        <Link
          to={`/create/${tipo}`}
          className="boton-personalizado enlace-crear"
        >
          Crear Nuevo
        </Link>
      </div>
      <table className="tabla">
        <thead>
          <tr>
            {columnHeaders[tipo].map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className={selectedItemId === item.id ? "fila-seleccionada" : ""}
            >
              {customFields[tipo].map((field) => (
                <td key={field}>
                  {field === "image" && isImageColumnVisible ? (
                    <img
                      className="list-img"
                      src={`data:image/jpeg;base64,${item.image}`}
                      alt="Imagen del producto"
                    />
                  ) : field === "onSale" ? (
                    item[field] ? (
                      "En oferta"
                    ) : (
                      "No está en oferta"
                    )
                  ) : field === "typeProduct" ? (
                    item.typeProduct.name
                  ) : field === "actions" ? (
                    <>
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="boton-personalizado boton-actualizar"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="boton-personalizado boton-eliminar"
                      >
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
