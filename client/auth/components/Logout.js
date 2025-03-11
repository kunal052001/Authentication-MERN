import axios from 'axios'
import React from 'react'

function Logout() {

   
    function handleclick(){
          
           axios.post("http://localhost:5000/Logout")
           
    }
  return (
    <div><button onclick={handleclick}>Logout</button></div>
  )
}

export default Logout