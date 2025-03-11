import axios from 'axios';
import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
 

  function handleChange(e) {
    e.preventDefault(); 
    

    
    axios.post("http://localhost:5000/login", { username, pass }) 
      .then(response => {
        console.log('Login successful', response);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }

  return (
    <div>
      <form onSubmit={handleChange}> 
        <label>
          <input 
            type='text' 
            placeholder='Email' 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </label>
        <label>
          <input 
            type='password'  
            placeholder='Password' 
            onChange={(e) => setPass(e.target.value)} 
          />
        </label>
        <div>
          <button type='submit'>Sign IN</button>
          <button type='button'>Register</button> 
        </div>
      </form>
    </div>
  );
}

export default Login;
