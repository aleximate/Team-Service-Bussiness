import "./Contact.css";
import laptop from "../img/laptop_contacto.jpg";


export const Contact = () => {
  return (
    <div className="contact-contact">
      <div className="contact-contact-1">
        <div className="left-section">
          <h1>Pongase en contacto</h1>
          <p>Visite una de nuestras agencias o ponganse en contacto con nosotros hoy mismo.</p>
          <h2>Oficina Central:</h2>
          <h3>Dirección: 123 Calle Ejemplo, Ciudad</h3>
          <h3>Email: ejemplo@email.com</h3>
          <h3>Teléfono: (123) 456-7890</h3>
          <h3>24:00h</h3>
        </div>
        <div className="right-section">
          <img src={laptop}></img>
        </div>
      </div>
    </div>
  ); 
};
