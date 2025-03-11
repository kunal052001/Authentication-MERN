import axios from 'axios'
import React, { useState } from 'react'

function Register({userdata}) {
    const [data,setData]=useState([])
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")

    function submitdata(e)
    {  e.prevetdefault()
       setData(
        {name:name,email:email,password:password}
       )

              axios.post("http://localhost:5000/Register", { data })
              .finally((res)=>console.log("data send ",res))
              .catch((err)=>console.error(err))
    }

  return (
    <div>
        <form onSubmit={submitdata} >
            <label> <input type='text' placeholder='Name' value='name' onChange={(e)=>setName(e.target.value)}></input></label>
            <label> <input type='text' placeholder='email' value='email' onChange={(e)=>setEmail(e.target.value)} ></input></label>
            <label> <input type='text' placeholder='passowrd'value='password'onChange={(e)=>setPassword(e.target.value)}></input></label>
            <button type='submit' >Register</button>
        </form>
    </div>
  )
}

export default Register