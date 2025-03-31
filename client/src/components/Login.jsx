import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Login() {
    const navigate = useNavigate();
    const { loginUser } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleLogin(e) {
        e.preventDefault();
        setError("");
        
        const result = await loginUser(email, password);
        if (result.success) {
            navigate("/");
        } else {
            setError(result.message);
        }

        setEmail("");
        setPassword("");
    }

    return (
        <div className="auth-container">
            <h2>Login</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleLogin} className="auth-form">
                <label>Email</label>
                <input 
                    type="email" 
                    name="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter email" 
                    required
                />
                <label>Password</label>
                <input 
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                />
                <button type="submit">LOG IN</button>
                <button type="button" onClick={() => navigate("/register")}>
                    Don't have an account? Register
                </button>
            </form>
        </div>
    );
}

export default Login;