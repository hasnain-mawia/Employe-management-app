import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from './toasts';

function Header() {
  const [isToken , setIsToken] = useState();
  const navigate = useNavigate();
  useEffect(()=>{
    setIsToken(localStorage.getItem('token'));
  },[navigate])

  const TokenCheck = () =>{
    if(!isToken){
      handleError('Please Login')
    }
  }
  const Tokenhere = () =>{
    if(isToken){
      handleError('Please Logout First')
    }
  }
  const logout = () =>{
    localStorage.removeItem('token');
    handleSuccess('Logout Successfully')
    navigate('/login');
  }

  return isToken && (
    <div>
      <div className='bg-white text-black rounded-full mx-10 flex justify-between p-4 items-center'>
       <ul className='flex text-[17px] text-center space-x-4 font-semibold'>
         <li onClick={TokenCheck}><Link to={'/'}>Home</Link> </li>
         <li onClick={TokenCheck}><Link to={'/taskAdd'}>Task Add</Link> </li>
         <li onClick={TokenCheck}><Link to={'/todaylist'}>Today List</Link> </li>
          <li onClick={Tokenhere}><Link to={'/login'}>Login</Link> </li>
          <li onClick={Tokenhere}><Link to={'/register'}>Sign up</Link> </li>
          </ul>
          {isToken &&
           <button onClick={logout} className='bg-[red] rounded-lg text-white p-2'>Log Out</button>
          }
          </div>
    </div>
  )
}

export default Header
