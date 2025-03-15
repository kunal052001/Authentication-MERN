import React, { useState,useEffect } from 'react'
import Create from './components/Create'
import Display from './components/Display'
import axios from 'axios'

function App() {
  const [task,setTask]=useState([])
  useEffect(()=>{
    fetchtodo()
  },[])
  function fetchtodo(){
   
      axios.get("http://localhost:5000")
      .then((res)=>{console.log(res),setTask(res.data)})
      .catch((err)=>console.log(err))
   
  }
  function createtodo(state){
    axios.post("http://localhost:5000/", { task:state })
    .then((result) => {
        console.log("data sent", result);
        fetchtodo()
    })
    .catch((err) => {
        console.log("error", err);
    });
        
  }
  function deletetodo(id){
    axios.delete(`http://localhost:5000/delete/${id}`)
    .then(()=>{
        setTask((task)=>task.filter(item => item._id !== id));})
    .catch((err)=>{console.log(err)})
   
  }
  function updatetodo(id, updatedTask) {
    axios.put(`http://localhost:5000/update/${id}`, { task: updatedTask })
        .then(() => fetchtodo())
        .catch((err) => console.log(err));
}
  
  return (
    <>
      <Create createtodo={createtodo}/>
      <Display tasks={task} deletetodo={deletetodo} updatetodo={updatetodo}/>
    </>
  )
}

export default App