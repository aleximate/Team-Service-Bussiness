import "./About.css";
import producto from "../img/producto.jpg";

export const About=()=>{
    return(
    <div className="contenedor-about">
      <section id="about-head" className="section-p1">
        <div className="contenedor-imagen-about">
          <img src={producto}></img>
        </div> 
        <div className="container-info-about">
          <h2>¿Quiénes somos?</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat, enim. Voluptas ipsum, labore corporis
            dolores dolorem sit harum sapiente eaque officia consequuntur fuga eveniet in!
          </p>
          <abbr title="">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat, enim. Voluptas ipsum, labore corporis.</abbr>
          <br />
          <br />
          <marquee bgcolor="#ccc" loop="-1" scrollamount="5" width="100%">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat, enim. Voluptas ipsum, labore corporis.
          </marquee>
        </div>
      </section>
      <section id="newsletter" className="section-m1">
        <div className="container-about-register">
          <div className="newstext">
            <h4>Suscríbete al boletín de novedades</h4>
            <p>
              Recibe actualizaciones por correo electrónico sobre nuestra última tienda y <span>ofertas especiales.</span>
            </p>
          </div>
          <div className="form">
            <input type="text" placeholder="Tu Email" />
            <button className="normal">Regístrate</button>
          </div>
        </div>
      </section>
    </div>
    )
}