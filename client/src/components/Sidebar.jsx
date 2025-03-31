import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import AuthContext from '../context/AuthContext';

const Sidebar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        const result = await logoutUser();
        if (result.success) {
            navigate('/login');
        }
    };

    if (!user) return null;

    return (
        <nav className="sidebar">
            <div className="user-info">
                <p>Welcome, {user.name}</p>
                <p>{user.email}</p>
            </div>
            <ul className="menu">
                <li>
                    <Link to="/product" className="menu-item">Add Item</Link>
                </li>
                <li>
                    <Link to="/" className="menu-item">Home</Link>
                </li>
                <li>
                    <Link to="/store" className="menu-item">Store</Link>
                </li>
                <li>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;