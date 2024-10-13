import React, { useEffect, useState } from 'react'
import { Route, Routes,useNavigate } from 'react-router-dom'
import Header from './components/header'
import 'react-toastify/dist/ReactToastify.css';
import Home from './screens/Home';
import TaskAdd from './screens/taskadd';
import TodayList from './screens/todayList';
import Login from './screens/login';
import Register from './screens/Register';
import NotFound from './screens/notFound';
import { ToastContainer } from 'react-toastify';

function App() {
  const navigate = useNavigate()
  const [isAuthentication , setIsAuthentication] = useState();
   
    useEffect(() =>{
    setIsAuthentication(localStorage.getItem('token'));
    const {pathname} = window.location
      if(isAuthentication){
        if(pathname === '/' || pathname === '/login' || pathname === '/register'){
            navigate('/');  
          }
        }else{
          if(pathname === '/'){
            navigate('/login')
          }
        }
    },[window.location.pathname, isAuthentication]);


  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/taskAdd' element={<TaskAdd/>}/>
        <Route path='/todaylist' element={<TodayList/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
      <ToastContainer/>
    </div>
  )
}

export default App
