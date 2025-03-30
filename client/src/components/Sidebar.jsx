import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Importing external styles
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";

const Sidebar = () => {
  //  const navigate = useNavigate();
//   function handleLogout() {
//     axios.post("http://localhost:5000/logout")
//         .then((res) => {
//             console.log("You are logged out", res);
//             navigate("/login"); // Call navigate as a function
//         })
//         .catch((err) => console.error("Error", err));
// }
  return (
    <nav className="sidebar">
      <ul className="menu">
        <li>
         <Link to="/product" className="menu-item">Add Item</Link>
        </li>
        <li>
          <Link to="/Home" className="menu-item">Home</Link>
        </li>
        <li>
          <Link to="/store" className="menu-item">Store</Link>
        </li>
        <li>
          <Link to="/notes" className="menu-item">Notes</Link>
        </li>
        {/* <li>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </li> */}
      </ul>
    </nav>
  );
};

export default Sidebar;
