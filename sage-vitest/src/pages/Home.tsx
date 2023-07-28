import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <nav>
            <ul>
              <h1>Bienvenido al Cubo Negro</h1>
                <li>
                  <p>Si deseas continuar dale click al siguiente botón</p>
                    <NavLink to = 'CuboNegro'>Cubo Negro</NavLink>
                </li>
            </ul>
        </nav>
        <hr/>
        <Outlet/>
    </div>
  )
}

export default Home