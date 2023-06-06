import './App.css'
import logo from './assets/min_desarrollo_social.png'
import RoutesManager from './componentes/Rutas'
import { BrowserRouter } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <div className='encabezado'>
        <img src={logo} className='logo_ministerio' alt='min_desarrollo_social'/>
      </div>
      <RoutesManager/>
    </BrowserRouter>
  )
}

export default App
