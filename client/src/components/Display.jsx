import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Display() {
    const [disp,setDisp]=useState([])
    useEffect(()=>{
        axios.get("http://localhost:5000")
        .then((res)=>{console.log(res),setDisp(res.data)})
        .catch((err)=>console.log(err))
    },[])
    function handledelete(id){
        axios.delete(`http://localhost:5000/delete/${id}`)
        .then((res)=>{console.log(res);
            setDisp(disp.filter(item => item._id !== id));})
        .catch((err)=>{console.log(err)})
       
        
    }
  return (
    <div><div>KUNAL</div>{disp.map((val)=>(
        <li key={val._id}>{val.task}<span><button onClick={()=>handledelete(val._id)}>delete</button></span></li>
    ))}</div>
  )
}
