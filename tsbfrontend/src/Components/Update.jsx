import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../Api/Products";
import { getAllTypes, getTypeById } from "../Api/TypeProducts";
import { getConsumerById } from "../Api/Consumers";
import { updateConsumer } from "../Api/Consumers";
import { updateProduct } from "../Api/Products";
import { updateType } from "../Api/TypeProducts";

export const Update = () => {
  const { tipo, itemId } = useParams();
  const history = useNavigate();
  const [options, setOptions] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [formData, setFormData] = useState({});
  const [elementData, setElementData] = useState({});

  const columnHeaders = {
    producto: ["Nombre", "Precio"],
    persona: ["Nombre", "Apellido", "Email", "Fecha de Nacimiento", "DNI"],
    tipos: ["Nombre"],
  };

  const allFields = {
    producto: ["name", "price", "onSale", "typeProduct", "image"],
    persona: ["name", "lastName", "email", "birthDate", "dni"],
    tipos: ["name"],
  };

  const updateDataByType = {
    producto: updateProduct,
    persona: updateConsumer,
    tipos: updateType,
  };

  useEffect(() => {
    const fetchDataByType = {
      producto: getProductById,
      persona: getConsumerById,
      tipos: getTypeById,
    };
    // Obtener las opciones necesarias para el formulario (si las hay)
    if (tipo === "producto") {
      // Obtener los tipos de producto para el formulario de actualización de productos
      getAllTypes()
        .then((response) => {
          setOptions(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener los tipos de producto:", error);
        });
    }

    // Obtener los datos existentes del elemento que se va a actualizar
    if (itemId) {
      const fetchDataFunction = fetchDataByType[tipo];
      if (fetchDataFunction) {
        fetchDataFunction(itemId)
          .then((response) => {
            setElementData(response.data);

            // Establecer los valores iniciales del formulario con los datos existentes
            setFormData(response.data);
            console.log(response);
          })
          .catch((error) => {
            console.error("Error al obtener los datos del elemento:", error);
          });
      } else {
        console.error("Tipo de entidad no válido:", tipo);
      }
    }
  }, [tipo, itemId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("El archivo seleccionado no es una imagen.");
        return;
      }

      const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
      if (file.size > MAX_IMAGE_SIZE) {
        alert("La imagen es demasiado grande. Debe ser menor de 5 MB.");
        return;
      }

      // Crear una URL temporal para la imagen
      const imageUrl = URL.createObjectURL(file);

      // Guarda el archivo en el estado formData y la URL en el estado imageUrl
      setFormData({ ...formData, image: file });
      setImageUrl(imageUrl);
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTypeProductChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    setFormData({ ...formData, typeProduct: selectedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateFunction = updateDataByType[tipo];
      if (!updateFunction) {
        console.error("Tipo de entidad no válido:", tipo);
        return;
      }

      // Llama a la función de actualización con los datos del formulario
      const response = await updateFunction(itemId, formData);

      console.log("Elemento actualizado:", response);
      // Realiza alguna acción adicional, como redirigir al usuario
      history(`/lista/${tipo}`);
    } catch (error) {
      console.error("Error al actualizar el elemento:", error.message);
    }
  };

  return (
    <div>
      <Link to={`/lista/${tipo}`} className="custom-button">
        REGRESAR
      </Link>
      <h1>
        Actualizar{" "}
        {tipo === "producto"
          ? "Producto"
          : tipo === "persona"
          ? "Persona"
          : "Tipo"}
      </h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {allFields[tipo].map((field, index) => (
          <div key={field}>
            {field === "typeProduct" && tipo === "producto" ? (
              // Campo de selección múltiple para "typeProduct" solo si el tipo es "producto"
              <div>
                <label>Tipo de producto:</label>
                <select
                  name="typeProduct" // Nombre del campo
                  onChange={handleTypeProductChange} // Corregido aquí
                  value={formData.typeProduct}
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
            ) : field === "image" && tipo === "producto" ? (
              <div>
                <label>Imagen: </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imageUrl && (
                  <div>
                    <label>Imagen Previa: </label>
                    <img src={imageUrl} alt="Vista previa de la imagen" />
                  </div>
                )}
              </div>
            ) : field === "onSale" ? (
              // Campo de selección para "onSale" (En oferta / En stock)
              <div>
                <label>Estado: </label>
                <select
                  name="onSale"
                  value={formData.onSale}
                  onChange={handleFieldChange}
                >
                  <option value="" disabled>
                    Selecciona el estado
                  </option>
                  <option value="true">En oferta</option>
                  <option value="false">En stock</option>
                </select>
              </div>
            ) : (
              // Otros campos de texto
              <div>
                <label>{columnHeaders[tipo][index]}: </label>
                <input
                  type="text"
                  name={allFields[tipo][index]}
                  value={formData[allFields[tipo][index]] || ""}
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
