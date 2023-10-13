import { useState } from "react";
import { getAllConsumers } from "../Api/Consumers";
import "./Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const handleClick = async () => {
    try {
      const response = await getAllConsumers();
      const consumers = response.data;

      const user = consumers.find(
        (consumer) => consumer.email === email && consumer.password === password
      );

      if (user) {
        window.location.href = "/menu";
      } else {
        alert("Error");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-container-1">
        <form className="login-form">
          <h1>Ingresar como trabajador</h1>
          <label>Email</label>
          <input
            type="text"
            placeholder="Ingrese su Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            placeholder="Ingrese su contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="container-button-login">
            <button onClick={handleClick}>INGRESAR</button>
          </div>
        </form>
      </div>
    </div>
  );
};
