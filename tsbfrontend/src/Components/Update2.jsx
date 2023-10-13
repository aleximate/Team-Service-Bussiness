import { useState, useEffect } from "react";
import { updateProduct, getProductById } from "../Api/Products";
import { useParams, useNavigate } from "react-router-dom";
import { getAllTypes } from "../Api/TypeProducts"

export const Update2 = () => {
  const { itemId } = useParams();
  const history = useNavigate();
  const [formData, setFormData] = useState({});
  const [productData, setProductData] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [types, setTypes] = useState([]);

  const columnHeaders = {
    producto: ["Nombre", "Precio", "Imagen", "Estado", "Tipo de Producto"],
  };

  const allFields = {
    producto: ["name", "price", "image", "onSale", "typeProduct"],
  };

  const tipo = "producto"; // O puedes obtenerlo dinámicamente

  const onSaleOptions = {
    true: "En oferta",
    false: "En stock",
  };

  useEffect(() => {
    if (itemId) {
      getProductById(itemId)
        .then((response) => {
          setProductData(response.data[0]);
          setFormData(response.data[0]);
          setImageUrl(`data:image/jpeg;base64,${response.data[0].image}`);
        })
        .catch((error) => {
          console.error("Error al obtener los datos del producto:", error);
        });
    }

    getAllTypes()
      .then((response) => {
        setTypes(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los tipos de productos:", error);
      });
  }, [itemId]);

  const handleFieldChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageData = e.target.result;
        setFormData({ ...formData, [name]: imageData });
        setImageUrl(imageData);
      };

      reader.readAsDataURL(file);
    } else if (name === "typeProduct") {
      // Convierte el valor en un número si es necesario
      setFormData({ ...formData, [name]: parseInt(value, 10) });
    } else {
      const newValue = name === "onSale" ? value === "true" : value;
      setFormData({ ...formData, [name]: newValue });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const onSaleValue = formData.onSale === "true";
      const dataToSend = { ...formData, onSale: onSaleValue };
      const response = await updateProduct(itemId, dataToSend);
      console.log("Producto actualizado:", response);
      history("/lista/producto");
    } catch (error) {
      console.error("Error al actualizar el producto:", error.message);
    }
  };

  return (
    <div>
      <h2>Editar Productos</h2>
      <form onSubmit={handleSubmit}>
        {columnHeaders[tipo]
          ? columnHeaders[tipo].map((header, index) => (
              <div key={index}>
                {header === "Imagen" ? (
                  <div>
                    <label>{header}:</label>
                    <input
                      type="file"
                      name={allFields[tipo][index]}
                      accept="image/*"
                      onChange={handleFieldChange}
                    />
                    {imageUrl && (
                      <div>
                        <label className="nombre-subtitulo">
                          Imagen Previa:
                        </label>
                        <img src={imageUrl} alt="Vista previa de la imagen" />
                      </div>
                    )}
                  </div>
                ) : header === "Estado" ? (
                  <div>
                    <label>{header}:</label>
                    <select
                      name={allFields[tipo][index]}
                      value={
                        formData[allFields[tipo][index]] ? "true" : "false"
                      }
                      onChange={handleFieldChange}
                    >
                      {Object.keys(onSaleOptions).map((optionValue) => (
                        <option key={optionValue} value={optionValue}>
                          {onSaleOptions[optionValue]}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : header === "Tipo de Producto" ? (
                  <div>
                    <label>{header}:</label>
                    <select
                      name={allFields[tipo][index]}
                      value={formData[allFields[tipo][index]]}
                      onChange={handleFieldChange}
                    >
                      {types.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label>{header}:</label>
                    <input
                      type="text"
                      name={allFields[tipo][index]}
                      value={formData[allFields[tipo][index]] || ""}
                      onChange={handleFieldChange}
                    />
                  </div>
                )}
              </div>
            ))
          : null}
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};