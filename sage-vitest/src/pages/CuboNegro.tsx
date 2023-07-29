import React from 'react'
import JuanJose from '../components/JuanJose/JuanJose'
import '../components/styles/CuboNegro.css'

const CuboNegro = () => {

  return (
    <div className='divCuboNegro'>
      <h1 className='h1CuboNegro'>Aqui está el cubo negro</h1>
      <p className='pCuboNegro'>Dale click para aumentar o disminuir el número de lados</p>

      <section className='sectionCuboNegro'>
        {/**Se pone como parámetro el número de 3 lados */}

        <JuanJose startPoints={3} />
      </section>
    </div>
  )

}

export default CuboNegro


