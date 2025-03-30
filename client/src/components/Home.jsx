import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css"; // Ensure you have a Home.css file for styling

const Home = () => {
  const navigate = useNavigate();

  const handleAddProduct = () => navigate("/product");
  const handleViewProducts = () => navigate("/store");

  return (
    <div className="home-container">
      <h1>Welcome to Inventory Management System</h1>

      <button className="btn" onClick={handleAddProduct}>
        ADD Product
      </button>

      <button className="btn" onClick={handleViewProducts}>
        View Products
      </button>

      <ul className="features-list">
        <li>- Add product</li>
        <li>- Remove product</li>
        <li>- Update product</li>
        <li>- Update Store</li>
        <li>- Stock Update</li>
      </ul>

     

      <p className="benefits-text">
        <strong>Benefits of Inventory Management:</strong>
        <br />
        - Improved Efficiency: Streamlines inventory handling processes.
        <br />
        - Cost Savings: Avoids overstocking or understocking.
        <br />
        - Accurate Forecasting: Provides data-driven insights.
        <br />
        - Enhanced Customer Satisfaction: Ensures product availability.
        <br />
        - Reduced Wastage: Tracks inventory levels.
        <br />
        - Better Cash Flow Management: Maintains optimal stock.
        <br />
        - Data Analytics & Reporting: Offers insights into sales trends.
      </p>
    </div>
  );
};

export default Home;
