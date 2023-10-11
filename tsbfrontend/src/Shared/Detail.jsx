import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../Api/Products"; // Asegúrate de importar getProductById desde tu API

export const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    // Llama a la función getProductById para obtener los detalles del producto por ID
    getProductById(id)
      .then((response) => {
        // Establece los detalles del producto en el estado
        setProduct(response.data);
        console.log(response)
      })
      .catch((error) => {
        console.error("Error al obtener los detalles del producto", error);
      });
  }, [id]);

  return (
    <div>
      <h1>Detalles del Producto</h1>
      {product && (
        <div>
          <p>ID del Producto: {product.id}</p>
          <p>Nombre: {product.name}</p>
          <p>Precio: ${product.price}</p>
          {/* Mostrar otros detalles del producto aquí */}
        </div>
      )}
    </div>
  );
};
