import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../components/toasts';

function Login() {
    const navigate = useNavigate();
    const [errors , setErrors] = useState({});
    const [showpassword, setshowpassword] = useState(false);
    const [Validate , setvalidtes] = useState('')
    const [values, setvalues] = useState({
       email:"", 
       password:"", 
       cpassword:"", 
    })
    const submitdata = async(e) =>{
        e.preventDefault()
        const validationErrors = {};
         if(!values.email.trim()){
        validationErrors.email = "Email Must Required"
        }else if(!values.email.match(/^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/)){
        validationErrors.email = "Email Is Not Valid"
        }
        if(!values.password.trim()){
        validationErrors.password = "Password Must Required"
        }else if(values.password.length < 8){
        validationErrors.password = "Password must be atleast 8 Characters"   
        }
        setErrors(validationErrors)
        if(Object.keys(validationErrors).length === 0){
            const userObj = {
                email : values.email,
                password : values.password,
            }
            try{
                const response = await axios.post('http://localhost:3008/user/login', userObj)
                // console.log(response)
                if(response.data.status === false){
                  return handleError('Email & Password Not Valid')}  
                else if(response.data.status === true){
                  return handleSuccess(`${response.data.user.fullname} Login Successfully`), navigate('/'), localStorage.setItem('token', response.data.jwtToken), setTimeout(()=>{navigate('/')},1000); 
                }else{
                 return handleError('Email & Password Not Valid ')  
                }          
            }
            catch(err){
               console.log("catch", err) 
            }
        setvalues({
            email:"",
            password:"",
        })
    }
    }

  return (
    <div className='bg-gradient-to-r from-cyan-600 to-gray-500 h-screen'>
        <div className='flex justify-center items-center h-screen'>
      <div className='w-[400px] bg-white shadow-2xl rounded-2xl px-3 py-10'>
           <h2 className='text-[30px] font-semibold text-center dark:text-[black]'>Login</h2> 
           <form onSubmit={submitdata} className='flex flex-col gap-5 dark:text-[black]' action="">
            <div>
            <label htmlFor="">Email</label>
            <input onChange={(e)=> setvalues({...values,email:e.target.value})} value={values.email} type="text" name='email' placeholder='Enter your Email' className={`border-[1px] border-[#3786F4] focus:outline-none ${errors.email && 'border-[1px] border-[red]' } bg-[#ffffff] p-2 rounded-md w-full`}/>
            {errors.email && <span className='text-[14px] text-[red]'>{errors.email}</span>}
            </div>
            <div>
            <label htmlFor="">Password</label>
            <input onChange={(e)=> setvalues({...values,password:e.target.value})} value={values.password} type={`${!showpassword ? 'password': 'text'}`} name='password' placeholder='•••••••••••••••' className={`${errors.password && 'border-[1px] border-[red]' } bg-[#ffffff] p-2 rounded-md w-full border-[1px] border-[#3786F4]`}/>
            {errors.password && <span className='text-[14px] text-[red]'>{errors.password}</span>}
            </div>
            <div className='flex items-center w-full gap-2 text-[16px]'>
            <input defaultChecked={showpassword} onChange={()=> {setshowpassword((prev)=> !prev)}} type="checkbox" id="number" name="number" value="number"/>
             <label htmlFor="number">Show Password</label>
        </div> 
            <p className='flex justify-center gap-2'>Create an Account<Link to={'/register'} className='text-[#3588F2]'>Register</Link></p>
            <button className='bg-gradient-to-l from-cyan-500 to-blue-500 text-white p-2 rounded-xl text-[18px]'>Login</button>
           </form>
      </div>
        </div>
    </div>
  )
}

export default Login