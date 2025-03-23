import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Correct import

function Register() {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate(); // ✅ Use inside the component

  function handleChange(e) {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  function handleRegister(e) {
    e.preventDefault();
    const { name, email, password } = state;

    axios.post("http://localhost:5000/register", { name, email, password })
      .then((result) => {
        console.log("User registered successfully", result);
        alert("Registration successful! Redirecting to login...");
        navigate("/login"); // ✅ Redirect after success
      })
      .catch((err) => {
        console.error("Please try again", err);
        alert("Registration failed. Try again!");
      });

    setState({ name: "", email: "", password: "" });
  }

  return (
    <div>
      <h1>Please enter user details</h1>
      <form onSubmit={handleRegister}>
        <label>Name</label>
        <input name="name" value={state.name} onChange={handleChange} type="text" />

        <label>Email</label>
        <input name="email" value={state.email} onChange={handleChange} type="email" />

        <label>Password</label>
        <input name="password" value={state.password} onChange={handleChange} type="password" />

        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default Register;
