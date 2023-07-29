import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import '../components/styles/Home.css'

const Home = () => {
  return (
    <div>
        <nav className='navHome'>
            <ul className='ulHome'>
              <h1 className='BienvenidoTitle'>Bienvenido al Cubo Negro</h1>
                <li>
                  <p className='pHome'>Si deseas continuar dale click al siguiente botón</p>
                    <NavLink to = 'CuboNegro'>
                      <div className='divButton'>
                      <button type='button' className='CuboNegroButton'>CuboNegro</button>
                      </div>
                    </NavLink>
                </li>
            </ul>
        </nav>
        <hr/>
        <Outlet/>
    </div>
  )
}

export default Home