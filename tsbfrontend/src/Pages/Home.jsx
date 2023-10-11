import { useEffect, useState } from "react";
import { getAllProducts, getProductOnSale } from "../Api/Products";
import { Banner } from "../Shared/Banner";
import { Types } from "../Shared/Types";
import { Link } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((response) => {
        const filteredProducts = response.data.map((product) => ({
          id:product.id,
          image: product.image,
          name: product.name,
          onSale: product.onSale,
          price: product.price,
          typeName: product.typeProduct.name,
        }));
        setNews(filteredProducts.slice(0, 8));
      })
      .catch((error) => {
        console.error("Error al obtener los productos nuevos", error);
      });

    getProductOnSale()
      .then((response) => {
        const filteredProduct = response.data.map((product) => ({
          id: product.id,
          image: product.image,
          name: product.name,
          onSale: product.onSale,
          price: product.price,
          typeName: product.typeProduct.name,
        }));
        setProducts(filteredProduct.slice(0, 8)); // Mostrar solo los 8 primeros productos en oferta
      })
      .catch((error) => {
        console.error("Error al obtener los productos en oferta", error);
      });
  }, []);

  return (
    <>
      <Banner />
      <div className="home-container">
        <div className="home-container-1">
          <Types />
          <h1 className="home-main-text">En Oferta</h1>
          <p className="home-second-text">
            Los productos en oferta que solo encontrarás en LaptopExpress
          </p>
          <div className="home-container-onSale">
            {products.map((product, index) => (
              <Link to={`/Producto-Detallado/${product.id}`} key={index}>
                <section className="home-section" key={index}>
                  <img
                    src={`data:image/jpeg;base64,${product.image}`}
                    className="home-img"
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
          <h1 className="home-main-text">Novedades</h1>
          <p className="home-second-text">Descubre lo nuevo de LaptopExpress</p>
          <div className="home-container-onSale">
            {news.map((product, index) => (
              <Link to={`/Producto-Detallado/${product.id}`} key={index}>
                <section className="home-section" key={index}>
                  <img
                    src={`data:image/jpeg;base64,${product.image}`}
                    className="home-img"
                    alt="Producto"
                  />
                  <p>{product.name}</p>
                  <p>${product.price}</p>
                  <p>{product.typeName}</p>
                </section>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
