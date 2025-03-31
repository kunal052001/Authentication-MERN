import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Register.css';

function Register() {
    const navigate = useNavigate();
    const { registerUser } = useContext(AuthContext);
    const [state, setState] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    async function handleRegister(e) {
        e.preventDefault();
        setError("");
        
        const result = await registerUser(state.name, state.email, state.password);
        if (result.success) {
            navigate("/login");
        } else {
            setError(result.message);
        }

        setState({ name: "", email: "", password: "" });
    }

    return (
        <div className="auth-container">
            <h2>Register</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleRegister} className="auth-form">
                <label>Name</label>
                <input 
                    name='name' 
                    value={state.name} 
                    onChange={handleChange} 
                    type='text' 
                    required
                />
                <label>Email</label>
                <input 
                    name='email' 
                    value={state.email} 
                    onChange={handleChange} 
                    type='email' 
                    required
                />
                <label>Password</label>
                <input 
                    name='password' 
                    value={state.password} 
                    onChange={handleChange} 
                    type='password' 
                    required
                />
                <button type='submit'>Create Account</button>
                <button type="button" onClick={() => navigate("/login")}>
                    Already have an account? Login
                </button>
            </form>
        </div>
    );
}

export default Register;