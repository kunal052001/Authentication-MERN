import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(e) {
        e.preventDefault();
        
        axios.post("http://localhost:5000/login", { email, password })
        .then((res) => {
            console.log("Login successful", res.data);
            navigate("/"); 
        })
        .catch((err) => {
            console.log("Login error", err.response?.data || err.message);
        });

        setEmail("");
        setPassword("");
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <label>Username</label>
                <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                <label>Password</label>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">LOG IN</button>
                <button type="button" onClick={() => navigate("/register")}>Register</button>
            </form>
        </div>
    );
}

export default Login;