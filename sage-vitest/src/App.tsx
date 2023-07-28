import React from 'react'
//importar react-router
import { Route, Routes } from 'react-router-dom'
import JuanJose from './components/JuanJose'


//Pagina Home
const Home = () => <h1>Bienvenido</h1>
//Pagina Cubo Negro
const CuboNegro = () => <h1>Cubo Negro aqui</h1>

const App = () => {
  return (
    <div className='App'>
      <Routes>
      <Route path='/' element = {<Home />} />
      <Route path='/CuboNegro' element = {<CuboNegro />} />
      </Routes>
    </div>
  )
}

export default App