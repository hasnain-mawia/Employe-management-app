import React from 'react'

function NotFound() {
  return (
    <div className='bg-gray-100 mx-auto h-screen flex justify-center items-center'>
      <div className='bg-[#1c1c1c] w-[500px] h-[500px] rounded-xl text-white flex flex-col justify-center items-center'>
      <h2 className='text-center text-[120px] font-bold'>404</h2> 
       <h2 className='text-center text-[50px]'>Page Not Found</h2>
      </div>
    </div>
  )
}

export default NotFound
