import React, { useState } from "react";
import "./Product.css"; 

function Product({ addTodo }) {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product.trim()) return;
    addTodo({ product, quantity, price });
    setProduct("");
    setQuantity("");
    setPrice("");
  };

  return (
    <div className="product-container">
      <form className="product-form" onSubmit={handleSubmit}>
        <h2>Add Product</h2>
        <label>Product Name</label>
        <input
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="Enter product name"
        />

        <label>Product Quantity</label>
        <input
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter quantity"
        />

        <label>Product Price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default Product;
