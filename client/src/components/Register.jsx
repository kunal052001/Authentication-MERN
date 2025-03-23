import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [state,setState]=useState({name:"",
    email:"",
    password:""})

  function handlechange(e){
       const {name,value}=e.target;
       setState({...state,[name]:value})
  }
  function handleregister(e){
      e.preventDefault()
     const  {name,email,password}=state;
     axios.post("http://localhost:5000/Register",{name:name,email:email,password:password})
      .then((result)=>console.log("user registerd succefully",result))
      .catch((err)=>console.error("please try again",err))
      setState({name:"",email:"",password:""})
      navigate("/login")
  }
  return (
    
    <div>
      <h1>Please enter user Details</h1>
      <form onSubmit={handleregister} >
        <label>Name</label><input name='name' value={state.name} onChange={handlechange} type='text'></input>
        <label>Email</label><input name='email' value={state.email} onChange={handlechange} type='text'></input>
        <label>Password</label><input name='password' value={state.password} onChange={handlechange} type='password'></input>
        <button type='submit'>create user</button>
      </form>
    </div>

  )
}

export default Register