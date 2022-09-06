import Home from "./pages/home/Home";
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import CList from "./components/functions/CList";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import Cl_edit from "./components/modalforms/Cl_edit";
import Tm_edit from "./components/modalforms/Tm_edit"

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
      <div className="home">
      <Sidebar />
      <div className="homeContainer container">
        <Navbar />
        
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path='/List/:id' element={<CList/>} />
            <Route path='/Cl_Edit/:id' element={<Cl_edit/>} />
            <Route path='/Tm_edit/:id' element={<Tm_edit/>} />
          </Route>
        </Routes>
        
      </div>
    </div>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
