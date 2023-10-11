import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../Api/Products";
import Swal from "sweetalert2";

export const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();

  const handleClick = () => {
    Swal.fire({
      title: "¿Estas seguro que deseas comprar este producto?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Gracias por tu compra", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Compra cancelada", "", "info");
      }
    });
  };

  useEffect(() => {
    // Llama a la función getProductById para obtener los detalles del producto por ID
    getProductById(id)
      .then((response) => {
        if (!response.data && !response.data[0])
          return new Error("No devolvio datos o no existe el producto");
        setProduct(response.data[0]);
      })
      .catch((error) => {
        console.error("Error al obtener los detalles del producto", error);
      });
  }, [id]);

  return (
    <div className="details-container">
      <div className="details-container-1">
        {product && (
          <section className="details-section">
            <img
              className="details-img"
              src={`data:image/jpeg;base64,${product.image}`}
            />
            <div className="details-section-1">
              <p>Nombre: {product.name}</p>
              <p>Precio: ${product.price}</p>
              <p>Tipo de Producto: {product.typeProduct.name}</p>
              <button onClick={handleClick}>COMPRAR</button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
