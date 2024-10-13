import React from 'react'
import { ImSpinner8 } from "react-icons/im";



function Loader({className}) {
  return (
    <div className='mx-auto'>
        <ImSpinner8 className={className}/>

        {/* <img className='w-[100px] mx-auto' src={require('../images/load.gif')} alt="loader"/> */}

    </div>
  )
}

export default Loader
