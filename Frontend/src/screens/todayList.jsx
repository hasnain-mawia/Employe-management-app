import { useEffect, useState } from 'react';
import axios from 'axios';
import {BASE_URL} from '../config';
import { Link } from 'react-router-dom';
import Loader from '../components/loader';
import { handleSuccess, handleWarn } from '../components/toasts';


function TaskAdd() {
  const [values, setValues] = useState('');
  const [TodoArray, setTodoData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [updateValue, setupdateValue] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();
  const [CurrentValue, setCurrentValue] = useState('');


  useEffect(() => {
    axios.get(`${BASE_URL}todo`)
      .then((res) => {
        setTodoData(res.data.data);
      }).catch((err) => {
        console.log('Error Occurs', err);
      })
  }, [refresh])
  const CreateTodo = () =>{
    const objtoSend= {
      todo : values,
    }
    axios.post(`${BASE_URL}todo/add`, objtoSend)
    .then((res)=>{
      console.log("Created...", res)
      if(res.data.status){
        setRefresh(!refresh);
        handleSuccess('Added Successfully')
        console.log(true);
      }else{
        console.log(false);
        alert('Required Fields Are Missing')
      }
    }).catch((err)=>{
      console.log(err)
    })
    setValues('');
  }

const DeleteTodo = (id) =>{
  axios.delete(`${BASE_URL}todo/delete/${id}`)
  .then((res)=>{
    setRefresh(!refresh);
    handleWarn('Deleted Successfully')
    console.log(res); 
  }).catch((err)=>{
    console.log(err);
  })
}
const EditTodo =(data) =>{
  setCurrentIndex(data._id)
  setCurrentValue(data);
  setupdateValue(true);
}

const updateTodo = () =>{
  const objtoUpdate = {
      todo : CurrentValue,
      id : currentIndex,
  }
  axios.put(`${BASE_URL}todo/update`, objtoUpdate)
  .then((res)=>{
    setRefresh(!refresh);
    handleSuccess('Updated Successfully')
    console.log(res);
    setupdateValue(false); 
  }).catch((err)=>{
    console.log(err);
  })
}


  return (
    <div className='bg-[#14626e] h-[94vh] flex justify-center items-center'>
      <div className='mx-auto w-[400px] p-3 bg-white text-center font-semibold rounded-xl my-auto'>
      <h2 className='mx-auto my-5 text-[23px] bg-[#d1d1d1] rounded-xl'>Today Listing</h2>
        <ul className='space-y-2'>
         {!updateValue ? 
          <div className='grid grid-cols-[70%_Auto] space-x-2'>
          <input onChange={(e)=> setValues(e.target.value)} className='p-2 border-[1px] border-black rounded' type="text" 
          value={values}/>
            <button onClick={CreateTodo} className='text-[13px] bg-[green] text-white p-1 rounded'>ADD</button>
          </div> :
          <div className='grid grid-cols-[70%_Auto] space-x-2'>
          <input onChange={(e)=> setCurrentValue(e.target.value)} className='p-2 border-[1px] border-black rounded' type="text" 
          value={CurrentValue.todo}/>
            <button onClick={updateTodo} className='text-[13px] bg-[green] text-white p-1 rounded'>Update</button>
          </div> }
          {TodoArray.length == 0 ? <Loader className={'text-[32px] animate-spin mx-auto my-4 text-[#2177be]'} /> : TodoArray.map((item, i)=>{
            return (
            <div key={i} className='bg-[#e0e0e0] text-[16px] flex flex-row items-center justify-between pl-5'><li>{item.todo}</li>
          <div className='space-x-3'>
          <small className='bg-black px-1 text-white'>{item.create_at.slice(0,10)}</small>
            <button onClick={()=> EditTodo(item)} className='text-[14px] bg-[#008000] text-white p-2 rounded'>Edit</button>
            <button onClick={()=> DeleteTodo(item._id)} className='text-[14px] p-2 bg-[#ff0000] text-white rounded'>Delete</button></div>
          </div>)
          }) 
          }
        </ul>
      </div>
    </div>
  );
}

export default TaskAdd;
