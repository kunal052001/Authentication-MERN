import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    function handleLogout() {
        axios.post("http://localhost:5000/logout")
            .then((res) => {
                console.log("You are logged out", res);
                navigate("/login"); // Call navigate as a function
            })
            .catch((err) => console.error("Error", err));
    }

    return (
        <div>
            Home
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;