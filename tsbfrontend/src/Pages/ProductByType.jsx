import { useEffect, useState } from "react";
import { getProductByType } from "../Api/Products";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./ProductByType.css";
export const ProductByType = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [typeProductName, setTypeProductName] = useState(""); // Nuevo estado para el nombre del tipo de producto

    useEffect(() => {
        // Llamar a la función getProductByType con el ID
        getProductByType(id)
            .then((response) => {
                // Actualizar el estado con los productos obtenidos
                setProducts(response.data);

                // También actualiza el nombre del tipo de producto
                setTypeProductName(response.data[0].typeProduct.name);
            })
            .catch((error) => {
                console.error("Error al obtener productos:", error);
            });
    }, [id]);

    return (
        <div className="productByType-container">
            <div className="productByType-container-1">
                <h2>{typeProductName}</h2>
                <div className="productByType-container-2">
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <Link to={`/Producto-Detallado/${product.id}`} key={index}>
                                <section className="productByType-section">
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
                        ))
                        
                    ) : (
                    <div className="no-products-container">
                        <img
                            src={logo}
                            alt="No existen productos"
                            className="no-products-image"
                        />
                        <p>No existen productos</p>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
}
