import './App.css'
import Registro from './componentes/Registro'
import logo from './assets/min_desarrollo_social.png'

function App() {

  return (
    <>
      <div className='encabezado'>
        <img src={logo} className='logo_ministerio' alt='min_desarrollo_social'/>
      </div>
      <div className='contenedor-formulario'>
        <Registro/>
      </div>
    </>
  )
}

export default App
