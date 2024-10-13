import axios from 'axios'
import React, { useEffect, useState } from 'react';
import {BASE_URL} from '../config';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Loader from '../components/loader'
import { handleSuccess, handleWarn } from '../components/toasts';
import UpdateData from '../components/UpdateData';
import { IoSearchCircleSharp } from "react-icons/io5";




function Home() {
    const [refresh, setRefresh] = useState(false); 
    // const [employeData, setemployeData] = useState({
        //     'employes' : [],
        //     'pagination' : {
            //         "totalEmployes": 0,
            //         "currentpage": 1,
            //         "totalpages": 1,
            //         "pageSize": 5
            //     }
            // })
    const [employeData, setemployeData] = useState([])
    const [Modal, setModal] = useState(false); 
    const [updateEmploy, setUpatedEmploy] = useState({});

    const fetchEmployes = async(search="", page = 1, limit= 5) =>{
        const url = `${BASE_URL}Employes/?search=${search}&pages=${page}&limit=${limit}`
        try{
           const {data} = await axios.get(url);
           const AllData = await data
           setemployeData(AllData.data.Employes)
        }catch(err){
            console.log(err)
        }
    }
    console.log(employeData)

    useEffect(()=>{
        fetchEmployes();
    },[refresh, Modal])

    const DeleteTask = async(id) =>{
       await axios.delete(`${BASE_URL}Employes/delete/${id}`)
        .then((res)=>{
          setRefresh(!refresh);
          handleSuccess('Deleted Successfully')
          console.log(res); 
        }).catch((err)=>{
          console.log(err);
        })
      }
  
      const editTask = (data) =>{
        setUpatedEmploy(data)
        setModal(true)
      }

      const handleSearch = (e) =>{
        const search = e.target.value
        fetchEmployes(search);
      }

  return Modal ? <UpdateData updateEmploy={updateEmploy} setModal={setModal}/> : (
    <div className='bg-[#14626e] h-[94vh] flex justify-center items-center'>
        <div className='bg-white p-2 rounded-3xl w-[80%] shadow-2xl px-3 relative'>
      <h2 className='text-[29px] text-center my-5 font-bold'>Task Mangement App</h2>
        
        <div className='flex items-center bg-gray-300 space-x-2 max-w-[300px] px-2 rounded-md absolute top-8 right-10'>
            <input onChange={handleSearch} className='p-2 w-full bg-transparent outline-none' type="text" />
            <IoSearchCircleSharp className='text-[40px]'/>
        </div>
        <div className='grid grid-cols-7 font-semibold text-[18px] items-center'>
                <div className='grid grid-cols-[25%_Auto]'><span>#</span> 
                <div>Name</div>
                </div>
                <div>Email</div>
                <div>Phone</div>
                <div>Department</div>
                <div>Profile Image</div>
                <div>Salary</div>
                <div>Actions</div>
            </div>
    
        {employeData.length == 0 ? <Loader className={'text-[32px] animate-spin mx-auto my-4 text-[#2177be]'} /> : employeData.map((item, i)=>{ 
          return(
            <div className='grid grid-cols-7 items-center hover:bg-[#dfdfdf] rounded-2xl'>
             <div className='grid grid-cols-[25%_Auto] items-center'><span className='font-bold'>{`${i+1} )`}</span> 
                <div>{item.name}</div>
                </div>
             <div>{item.email}</div>      
             <div>{item.phone}</div>      
             <div>{item.department}</div>      
             <div><img className='w-[80px]' src={item.profileImage} alt={item.name}/></div>      
             <div>{item.salary}</div>      
            <td className='flex space-x-3'>
            <button onClick={()=> editTask(item)} className='p-2 bg-[#0c3e08] rounded-md'> <FaEdit className='text-white'/></button> 
            <button onClick={()=> DeleteTask(item._id)} className='p-2 bg-[red] rounded-md'><MdDelete className='text-white'/></button></td>
            </div>
                )
            })
        }         
</div>
    </div>
  )
}

export default Home
