import './App.css'
import logo from './assets/min_desarrollo_social.png'
import RoutesManager from './componentes/Rutas'
import { BrowserRouter, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Link to="/" className='encabezado'>
        <img src={logo} className='logo_ministerio' alt='min_desarrollo_social'/>
      </Link>
      <RoutesManager/>
    </BrowserRouter>
  )
}

export default App
