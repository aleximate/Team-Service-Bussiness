import { useEffect, useState } from "react";
import { getAllProducts } from "../Api/Products";
import { Link } from "react-router-dom";
import "./Storage.css";

export const Storage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Llamar a la función getAllProducts para obtener los datos
    getAllProducts()
      .then((response) => {
        // Mapear los datos para obtener solo los campos deseados
        const filteredProducts = response.data.map((product) => ({
          id:product.id,
          image: product.image,
          name: product.name,
          onSale: product.onSale,
          price: product.price,
          typeName: product.typeProduct.name,
        }));

        // Establecer los datos filtrados en el estado
        setProducts(filteredProducts);
      })
      .catch((error) => {
        console.error("Error al obtener los productos", error);
      });
  }, []);

  return (
    <div className="storage-container">
      <div className="storage-container-1">
        {products.map((product, index) => (
          <Link to={`/Producto-Detallado/${product.id}`} key={index}>
            <section className="storage-section">
              <img
                src={`data:image/jpeg;base64,${product.image}`}
                className="storage-img"
                alt="Producto"
              />
              {product.onSale ? <p className="on-sale">EN OFERTA</p> : null}
              <p>{product.name}</p>
              <p>${product.price}</p>
              <p>{product.typeName}</p>
            </section>
          </Link>
        ))}
      </div>
    </div>
  );
}