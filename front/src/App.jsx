import './App.css'
import RoutesManager from './componentes/Rutas'
import { BrowserRouter } from "react-router-dom";
import Nav from "./componentes/Nav"

function App() {
  return (
    <BrowserRouter>
      <Nav/>
      <RoutesManager/>
    </BrowserRouter>
  )
}

export default App
