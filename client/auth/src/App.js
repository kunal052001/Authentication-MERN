import React from 'react'
import Register from '../components/Register'
import Login from '../components/Login'

import {Route,Routes,BrowserRouter} from "react-router-dom"
import Logout from '../components/Logout'

function App() {

   
  return (
    <div>
      <BrowserRouter> 
      <Routes>
          <Route path="/Register" element={<Register/>}></Route>
          <Route path="/Login" element={<Login/>}></Route>
          <Route path="/logout" element={<Logout/>}></Route>
      </Routes>
      </BrowserRouter>

      
    </div>
  )
}

export default App