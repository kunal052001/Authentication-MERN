import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ Correct import

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ Use inside the component

  function handleLogin(e) {
    e.preventDefault();

    axios.post("http://localhost:5000/login", { email, password })
      .then((result) => {
        console.log(result);
        alert(result.data.message);
      })
      .catch((err) => {
        console.error("Login error:", err.response?.data || err.message);
        alert(err.response?.data?.message || "Something went wrong");
      });

    setEmail("");
    setPassword("");
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />

        <label>Password</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Log In</button>
        <button type="button" onClick={() => navigate("/register")}>Register</button> {/* ✅ Corrected */}
      </form>
    </div>
  );
}

export default Login;
