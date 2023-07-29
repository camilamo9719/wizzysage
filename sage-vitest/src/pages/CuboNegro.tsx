import React from 'react'
import JuanJose from '../components/JuanJose/JuanJose'

const CuboNegro = () => {

  return (
    <div>
      <h1>Aqui está el cubo negro</h1>
      <p>Dale click para aumentar o disminuir el número de lados</p>

      <section>
        {/**Se pone como parámetro el número de 3 lados */}
        <JuanJose startPoints={3} />
      </section>
    </div>
  )

}

export default CuboNegro


