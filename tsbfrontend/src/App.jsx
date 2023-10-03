import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Create } from "./Components/Create";
import { List } from "./Components/List";
import { Menu } from "./Components/Menu";
import { Update } from "./Components/Update";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/menu" element={<Menu/>}/>
        <Route path="/create/:tipo" element={<Create/>}/>,
        <Route path="/lista/:tipo" element={<List/>}/>
        <Route path="/actualizar/:tipo/:itemId" element={<Update/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
