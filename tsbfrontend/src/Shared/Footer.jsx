import logo from "../assets/logo.png";
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

export const Footer = () => {
  return (
    <footer className="footer-footer">
      <div className="footer-footer-1">
        <section className="grid-container">
          <div className="grid-item">
            <img src={logo} className="footer-logo" />
            <h2>Contáctanos</h2>
            <div className="container-contact">
              <h3>Direccion:</h3>
              <p>562 Av. Samuel Alcazar, Rimac Lima</p>
            </div>
            <div className="container-contact">
              <h3>Telefono:</h3>
              <p>+51 949165118</p>
            </div>
            <div className="container-contact">
              <h3>Horario:</h3>
              <p>24 hs Lunes-Domingo</p>
            </div>
          </div>
          <div className="grid-item-2">
            <h3>Servicio al cliente</h3>
            <p>Terminos y Condiciones</p>
            <p>Orden de Servicio</p>
            <p>Libro de Reclamaciones</p>
            <p>Bases de Promociones</p>
          </div>
          <div className="grid-item-2">
            <h3>Nuestros Productos</h3>
            <p>Marcas</p>
            <p>Novedades</p>
            <p>Ofertas</p>
            <p>Promociones</p>
          </div>
          <div className="grid-item-2">
            <h3>Laptop Express</h3>
            <p>Registrate</p>
            <p>Como Comprar</p>
            <p>Boletas Electronicas</p>
            <p>Pago Online</p>
          </div>
        </section>
      </div>
      <h2 className="derechos-container">
        2023 Todos los derechos reservados LaptopExpress
      </h2>
    </footer>
  );
};
