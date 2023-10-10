import logo from "../assets/logo.png"
export const Footer = () => {
  return (
    <footer className="footer-footer">
      <div className="footer-footer-1">
        <section className="grid-container">
          <div className="grid-item">
            <img src={logo} className="footer-logo" />
            <h3>Direccion:</h3>
            <p>562 Av. Samuel Alcazar, Rimac Lima</p>
            <h3>Telefono:</h3>
            <p>+51 949165118</p>
            <h3>Horario:</h3>
            <p>24 hs Lunes-Domingo</p>
          </div>
          <div className="grid-item">
            <h3>Servicio al cliente</h3>
            <p>Terminos y Condiciones</p>
            <p>Orden de Servicio</p>
            <p>Libro de Reclamaciones</p>
            <p>Bases de Promociones</p>
          </div>
          <div className="grid-item">
            <h3>Nuestros Productos</h3>
            <p>Marcas</p>
            <p>Novedades</p>
            <p>Ofertas</p>
            <p>Promociones</p>
          </div>
          <div className="grid-item">
            <h3>Laptop Express</h3>
            <p>Registrate</p>
            <p>Como Comprar</p>
            <p>Boletas Electronicas</p>
            <p>Pago Online</p>
          </div>
        </section>
      </div>
      <h2>2023 Todos los derechos reservados LaptopExpress</h2>
    </footer>
  );
};
