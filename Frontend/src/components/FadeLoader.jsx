import React from 'react'
import { ImSpinner8 } from 'react-icons/im'

function FadeLoader() {
  return (
    <div className='w-full h-screen bg-[black] bg-opacity-80 flex justify-center items-center absolute top-0 right-0'>
       <ImSpinner8 className="text-[#ffffff] text-[60px] animate-spin"/>
    </div>
  )
}

export default FadeLoader