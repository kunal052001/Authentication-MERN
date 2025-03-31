import React, { useState } from "react";
import "./Product.css"; 

function Product({ Addproduct }) {
    const [product, setProduct] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        Addproduct(product, price, quantity);
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
                    required
                />

                <label>Product Quantity</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter quantity"
                    min="1"
                    required
                />

                <label>Product Price</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter price"
                    min="0"
                    step="0.01"
                    required
                />

                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}

export default Product;