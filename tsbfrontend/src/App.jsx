import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import { Create } from "./Components/Create";
import { List } from "./Components/List";
import { Menu } from "./Components/Menu";
import { Update } from "./Components/Update";
import { Navbar } from "./Shared/Navbar";
import { Home } from "./Pages/Home";
import { Footer } from "./Shared/Footer";
import { Contact } from "./Pages/Contact";
import { About } from "./Pages/About";
import { Storage } from "./Pages/Storage";

function Pages() {
  return (
    <>
      <Navbar />
      <Outlet/>
      <Footer/>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Pages/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/Nosotros" element={<About/>} />
          <Route path="/Tienda" element={<Storage/>} />
          <Route path="/Contacto" element={<Contact/>} />
        </Route>
        <Route path="/menu" element={<Menu />} />
        <Route path="/create/:tipo" element={<Create />} />
        <Route path="/lista/:tipo" element={<List />} />
        <Route path="/actualizar/:tipo/:itemId" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
