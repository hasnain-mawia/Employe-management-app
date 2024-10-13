import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../components/toasts';
import {BASE_URL} from '../config';
import FadeLoader from '../components/FadeLoader';

function Upload() {
    const navigate = useNavigate();
    const [errors , setErrors] = useState({});
    const [isLoader, setIsloader] = useState(false);
    
    const [values, setvalues] = useState({
      name:"",
      email:"",
      phone:"",
      department:"",
      profileImage:null,
      salary:"", 
    });

    const submitdata = async(e) =>{
        e.preventDefault()
        const validationErrors = {};
         if(!values.name.trim()){
        validationErrors.name = "Name Must Required"
        } 
         if(!values.email.trim()){
        validationErrors.email = "Email Must Required"
        }else if(!values.email.match(/^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/)){
        validationErrors.email = "Email Is Not Valid"
        }
        if(!values.phone.trim()){
        validationErrors.phone = "Contact No. Must Required"
        }else if(values.phone.length < 11){
          validationErrors.phone = "Please Enter Valid Contact No." }
        if(!values.department.trim()){
          validationErrors.department = "Department Must Required"
        }
        if(!values.profileImage){
          validationErrors.profileImage = "Image Required"
        }
        if(!values.salary.trim()){
          validationErrors.salary = "Salary Must Required"
        }
      
        setErrors(validationErrors)
        if(Object.keys(validationErrors).length === 0){
            setIsloader(true);
            const formData = new FormData()
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('phone', values.phone);
            formData.append('department', values.department);
            formData.append('profileImage', values.profileImage);
            formData.append('salary', values.salary);

            try{
              const response = await axios.post(`${BASE_URL}Employes/create`, formData)  
              setIsloader(false);
                 if(response.data.status === true){
                  return handleSuccess(`Task Uploaded Successfully`), navigate('/'); 
                }else{
                 return handleError('Please Insert All Fields')  
                }          
            }
            catch(err){
               console.log("catch", err) 
            }
        setvalues({
          name:"",
          email:"",
          phone:"",
          department:"",
          profileImage:null,
          salary:"", 
        })
    }
    }
  return isLoader ? <FadeLoader/> :  (
    <div className='bg-gradient-to-r from-cyan-600 to-gray-500 h-screen'>
        <div className='flex justify-center items-center h-screen'>
      <div className='w-[700px] bg-white shadow-2xl rounded-2xl px-3 py-10'>
           <h2 className='text-[30px] font-semibold text-center dark:text-[black]'>Add Task </h2> 
           <form onSubmit={submitdata} className='grid grid-cols-1 sm:grid-cols-2 gap-5 dark:text-[black] text-[14px]' action="">
            <div>
            <label htmlFor="">Name</label>
            <input onChange={(e)=> setvalues({...values,name:e.target.value})} value={values.name} type="text" name='name' placeholder='Enter your Name' className={`border-[1px] border-[#3786F4] focus:outline-none ${errors.name && 'border-[1px] border-[red]' } bg-[#ffffff] p-2 rounded-md w-full`}/>
            {errors.name && <span className='text-[14px] text-[red]'>{errors.name}</span>}
            </div>
            <div>
            <label htmlFor="">Email</label>
            <input onChange={(e)=> setvalues({...values,email:e.target.value})} value={values.email} type="text" name='email' placeholder='Enter your Email' className={`border-[1px] border-[#3786F4] focus:outline-none ${errors.email && 'border-[1px] border-[red]' } bg-[#ffffff] p-2 rounded-md w-full`}/>
            {errors.email && <span className='text-[14px] text-[red]'>{errors.email}</span>}
            </div>
            <div>
            <label htmlFor="">Phone</label>
            <input onChange={(e)=> setvalues({...values,phone:e.target.value})} value={values.phone} type="number" name='phone' placeholder='+00000000000' className={`${errors.phone && 'border-[1px] border-[red]' } bg-[#ffffff] p-2 rounded-md w-full border-[1px] border-[#3786F4]`}/>
            {errors.phone && <span className='text-[14px] text-[red]'>{errors.phone}</span>}
            </div>
            <div>
            <label htmlFor="">Department</label>
            <input onChange={(e)=> setvalues({...values,department:e.target.value})} value={values.department} type="text" name='department' placeholder='Enter Department' className={`${errors.department && 'border-[1px] border-[red]' } bg-[#ffffff] p-2 rounded-md w-full border-[1px] border-[#3786F4]`}/>
            {errors.department && <span className='text-[14px] text-[red]'>{errors.department}</span>}
            </div>
            <div>
            <label htmlFor="">Profile Image</label>
            <input onChange={(e)=> setvalues({...values,profileImage:e.target.files[0]})} name='profileImage' type="file" className={`${errors.profileImage && 'border-[1px] border-[red]' } bg-[#ffffff] p-2 rounded-md w-full border-[1px] border-[#3786F4]`}/>
            {errors.profileImage && <span className='text-[14px] text-[red]'>{errors.profileImage}</span>}
            </div>
            <div>
            <label htmlFor="">Salary</label>
            <input onChange={(e)=> setvalues({...values,salary:e.target.value})} value={values.salary} type="salary" name='image' placeholder='Enter Department' className={`${errors.salary && 'border-[1px] border-[red]' } bg-[#ffffff] p-2 rounded-md w-full border-[1px] border-[#3786F4]`}/>
            {errors.salary && <span className='text-[14px] text-[red]'>{errors.salary}</span>}
            </div>
            <button className='bg-gradient-to-l from-cyan-500 to-blue-500 text-white p-2 rounded-xl text-[18px]'>Upload</button>
           </form>
      </div>
        </div>
    </div>
  )
}

export default Upload