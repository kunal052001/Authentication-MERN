import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Store.css';

function Store({ products: initialProducts }) {
  const [products, setProducts] = useState(initialProducts || []);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    quantity: ""
  });

  useEffect(() => {
    setProducts(initialProducts || []);
  }, [initialProducts]);

  const handleEdit = (product) => {
    setEditingId(product._id);
    setEditForm({
      name: product.name,
      price: product.price,
      quantity: product.quantity
    });
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/updateproduct/${id}`, editForm);
      const updatedProducts = products.map(product => 
        product._id === id ? response.data : product
      );
      setProducts(updatedProducts);
      setEditingId(null);
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteproduct/${id}`);
      const filteredProducts = products.filter(product => product._id !== id);
      setProducts(filteredProducts);
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="store-container">
      <h1>Store Inventory</h1>
      <div className="product-grid">
        {products.length === 0 ? (
          <p className="no-products">No products available</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="product-card">
              {editingId === product._id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                    placeholder="Product Name"
                  />
                  <input
                    type="number"
                    name="price"
                    value={editForm.price}
                    onChange={handleInputChange}
                    placeholder="Price"
                  />
                  <input
                    type="number"
                    name="quantity"
                    value={editForm.quantity}
                    onChange={handleInputChange}
                    placeholder="Quantity"
                  />
                  <div className="edit-buttons">
                    <button onClick={() => handleUpdate(product._id)} className="save-btn">Save</button>
                    <button onClick={() => setEditingId(null)} className="cancel-btn">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="product-info">
                    <h3>{product.name}</h3> 
                    <div className="product-actions">
                    <button onClick={() => handleEdit(product)} className="update-btn">Edit</button>
                    <button onClick={() => handleDelete(product._id)} className="delete-btn">Delete</button>
                  </div>
                   
                  </div>
                  <p>Price: ${product.price}</p>
                  <p>Quantity: {product.quantity}</p>

                  <button>BUY STOCK</button>
                  <button>SELL STOCK</button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Store;