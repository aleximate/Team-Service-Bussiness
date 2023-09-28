import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Create } from "./Components/Create";
import { List } from "./Components/List";
import { Menu } from "./Components/Menu";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/menu" element={<Menu/>}/>
        <Route path="/create/:tipo" element={<Create/>}/>,
        <Route path="/lista/:tipo" element={<List/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
