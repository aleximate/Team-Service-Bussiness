import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { createProducts } from "../Api/Products";
import { createConsumers } from "../Api/Consumers";
import { createTypes, getAllTypes } from "../Api/TypeProducts";
import "./Create.css";

export const Create = () => {
  const { tipo } = useParams();
  const history = useNavigate();
  const [options, setOptions] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const fetchDataByType = {
    producto: createProducts,
    persona: createConsumers,
    tipos: createTypes,
  };

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

  const [formData, setFormData] = useState({onSale:""});

  useEffect(() => {
    getAllTypes()
      .then((response) => {
        const data = response.data;
        setOptions(data);
      })
      .catch((error) => {
        console.error("Error al obtener opciones desde la API:", error);
      });
  }, []);

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
      const fetchDataFunction = fetchDataByType[tipo];
      if (!fetchDataFunction) {
        console.error("Tipo de entidad no válido:", tipo);
        return;
      }

      // Crea un objeto FormData para enviar datos, incluyendo la imagen si está presente
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      // Agrega la imagen al FormData si el tipo es "producto"
      if (tipo === "producto") {
        formDataToSend.append("image", formData.image);
      }

      const response = await fetchDataFunction(formDataToSend);
      history(`/lista/${tipo}`);
    } catch (error) {
      console.error("Error al crear el elemento:", error.message);
    }
  };

  return (
    <div>
      <Link to="/menu" className="custom-button">
        REGRESAR
      </Link>
      <h1>
        Crear Nuevo{" "}
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
            ) : field === "image" && tipo === "producto" ? (
              <div>
                <label>Imagen: </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange} // Agregamos el controlador de cambio para la imagen
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
